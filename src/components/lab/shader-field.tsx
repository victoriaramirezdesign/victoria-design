"use client";

import { useEffect, useRef } from "react";

/**
 * Objeto 3D raymarcheado en WebGL crudo (sin librerias externas).
 * Un toro retorcido con superficie iridiscente que gira, respira y
 * reacciona al puntero.
 *
 * Es defensivo a proposito: si el navegador no da contexto WebGL o algo
 * falla al compilar, el canvas se queda transparente y detras se ve el
 * degradado CSS. Nunca rompe la pagina.
 */

const VERT = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;
uniform float uFade;

mat2 rot(float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

float map(vec3 p) {
  vec3 q = p;
  q.xz *= rot(uTime * 0.20);
  q.xy *= rot(uTime * 0.13 + uMouse.x * 0.55);
  q.yz *= rot(-uMouse.y * 0.45);
  q.xz *= rot(q.y * (0.85 + 0.40 * sin(uTime * 0.35)));
  float d = sdTorus(q, vec2(1.15, 0.36));
  d -= 0.042 * sin(8.0 * q.x + uTime * 1.7) * sin(8.0 * q.z + uTime * 1.2);
  return d;
}

vec3 calcNormal(vec3 p) {
  vec2 e = vec2(0.0018, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)
  ));
}

vec3 pal(float t) {
  return 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.0, 0.28, 0.62)));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float aspect = uRes.x / uRes.y;

  // En pantallas anchas el objeto se corre a la derecha para dejarle
  // sitio al titular; en vertical se queda centrado.
  vec2 sv = uv;
  sv.x -= mix(0.0, 0.36, step(1.15, aspect));

  // Camara lejos + focal corta: el toro entra entero con aire alrededor.
  // Alto visible a la altura del objeto = z * 0.5 / focal ~= 2.2 unidades,
  // contra un radio exterior de ~1.5. Queda ocupando dos tercios.
  vec3 ro = vec3(0.0, 0.0, 7.0);
  vec3 rd = normalize(vec3(sv, -1.6));

  float t = 0.0;
  float glow = 0.0;
  float hit = 0.0;
  vec3 p = ro;

  for (int i = 0; i < 76; i++) {
    p = ro + rd * t;
    float d = map(p);
    glow += 0.013 / (0.055 + abs(d) * 8.5);
    if (d < 0.0018) { hit = 1.0; break; }
    if (t > 13.0) break;
    t += d * 0.62;
  }

  // Fondo: tinta profunda con un tinte que respira
  vec3 col = mix(
    vec3(0.014, 0.011, 0.036),
    vec3(0.045, 0.031, 0.090),
    clamp(uv.y * 0.6 + 0.55, 0.0, 1.0)
  );
  col += pal(uTime * 0.03 + 0.15) * 0.045 * (1.0 - clamp(length(uv) * 0.7, 0.0, 1.0));

  if (hit > 0.5) {
    vec3 n = calcNormal(p);
    vec3 v = -rd;
    float fres = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.6);

    vec3 l1 = normalize(vec3(0.80, 0.90, 0.60));
    vec3 l2 = normalize(vec3(-0.70, -0.30, 0.50));
    float dif  = clamp(dot(n, l1), 0.0, 1.0);
    float dif2 = clamp(dot(n, l2), 0.0, 1.0);

    vec3 irid = pal(fres * 0.9 + n.y * 0.18 + uTime * 0.05);
    irid = mix(irid, vec3(0.82, 0.30, 0.66), 0.35);

    vec3 surf = vec3(0.020, 0.014, 0.048);
    surf += irid * (0.25 + 0.75 * fres);
    surf += vec3(0.85, 0.30, 0.66) * dif * 0.38;
    surf += vec3(0.21, 0.30, 1.00) * dif2 * 0.30;

    float spec = pow(clamp(dot(reflect(-l1, n), v), 0.0, 1.0), 44.0);
    surf += vec3(1.0) * spec * 0.55;

    col = surf;
  }

  // Halo volumetrico acumulado a lo largo del rayo
  col += pal(uTime * 0.04 + 0.55) * glow * 0.075;
  col += vec3(0.82, 0.30, 0.66) * glow * 0.030;

  // Vineta
  col *= 1.0 - 0.34 * pow(clamp(length(uv * vec2(0.85, 1.0)), 0.0, 1.4), 2.2);

  // Tonemap filmico (ACES aproximado) para que no se queme el magenta
  col *= 1.22;
  col = (col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14);

  // Grano fino, mata el banding del degradado
  float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (g - 0.5) * 0.018;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0) * uFade, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function ShaderField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let raf = 0;
    let disposed = false;
    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;

    // Puntero suavizado: el objetivo salta, lo que dibujamos persigue.
    const target = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    let visible = true;
    let fade = 0;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    try {
      gl =
        (canvas.getContext("webgl", {
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }) as WebGLRenderingContext | null) ??
        (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

      if (!gl) return;

      const vs = compile(gl, gl.VERTEX_SHADER, VERT);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      if (!vs || !fs) return;

      program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      );
      const aPos = gl.getAttribLocation(program, "aPos");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const uRes = gl.getUniformLocation(program, "uRes");
      const uTime = gl.getUniformLocation(program, "uTime");
      const uMouse = gl.getUniformLocation(program, "uMouse");
      const uFade = gl.getUniformLocation(program, "uFade");

      const resize = () => {
        if (!gl) return;
        // Techo de DPR: el raymarching es caro, no vale la pena a 3x.
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
        const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
        if (canvas.width === w && canvas.height === h) return;
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      };

      const onPointer = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        target.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      };

      const start = performance.now();

      const frame = () => {
        if (disposed || !gl || !program) return;
        raf = requestAnimationFrame(frame);
        if (!visible || document.hidden) return;

        resize();

        const elapsed = performance.now() - start;
        eased.x += (target.x - eased.x) * 0.045;
        eased.y += (target.y - eased.y) * 0.045;
        // Fundido por tiempo, no por fotogramas: en una maquina lenta o en
        // una pestana a medio gas tambien termina de entrar.
        fade = Math.min(elapsed / 900, 1);

        const t = reduced ? 12 : elapsed / 1000;

        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, t);
        gl.uniform2f(uMouse, eased.x, eased.y);
        gl.uniform1f(uFade, reduced ? 1 : fade);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        // Sin movimiento: un fotograma y listo.
        if (reduced) cancelAnimationFrame(raf);
      };

      resize();
      raf = requestAnimationFrame(frame);

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) visible = entry.isIntersecting;
        },
        { threshold: 0 },
      );
      io.observe(canvas);

      window.addEventListener("pointermove", onPointer, { passive: true });

      return () => {
        disposed = true;
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener("pointermove", onPointer);
      };
    } catch {
      // Sin WebGL el degradado CSS de atras se ve igual de bien.
      cancelAnimationFrame(raf);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none block h-full w-full ${className}`}
    />
  );
}
