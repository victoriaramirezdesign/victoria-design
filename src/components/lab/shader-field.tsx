"use client";

import { useEffect, useRef } from "react";

/**
 * Fondo del hero en WebGL crudo (sin librerias externas): una mesa de
 * trabajo infinita en perspectiva que avanza hacia el horizonte, con la
 * reticula del artboard, el resplandor iridiscente de la marca y polvo
 * suspendido. Es atmosfera: el protagonista es la maqueta 3D de encima.
 *
 * Defensivo a proposito: si no hay contexto WebGL o algo falla al
 * compilar, el canvas queda transparente y detras se ve el degradado
 * CSS. Nunca rompe la pagina.
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

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec3 pal(float t) {
  return 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.0, 0.28, 0.62)));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  // Cielo: tinta profunda que aclara un poco hacia arriba
  vec3 col = mix(
    vec3(0.012, 0.010, 0.030),
    vec3(0.038, 0.026, 0.078),
    clamp(uv.y * 0.85 + 0.5, 0.0, 1.0)
  );

  // La linea del horizonte va por debajo del centro y respira con el mouse
  float horizon = -0.26 + uMouse.y * 0.016;

  // Resplandor de marca sobre el horizonte: magenta que vira a violeta
  float hd = abs(uv.y - horizon);
  vec3 brillo = mix(
    vec3(0.82, 0.30, 0.66),
    vec3(0.40, 0.30, 1.00),
    0.5 + 0.5 * sin(uTime * 0.22 + uv.x * 1.1)
  );
  col += brillo * exp(-hd * 11.0) * 0.22;
  col += brillo * exp(-hd * 2.6)  * 0.040;

  // Mesa de trabajo: plano en perspectiva bajo el horizonte
  if (uv.y < horizon) {
    float prof = horizon - uv.y;
    // Proyeccion: cerca del horizonte, muy lejos
    float z = 0.62 / max(prof, 1e-3);
    float x = uv.x * z;

    vec2 g = vec2(x + uMouse.x * 0.7, z - uTime * 0.85);

    // El grosor de linea crece con la cercania, hace de antialias barato
    vec2 f = abs(fract(g) - 0.5);
    float wx = 0.020 + prof * 0.40;
    float wz = 0.020 + prof * 0.95;
    float linea = max(
      1.0 - smoothstep(0.0, wx, f.x),
      1.0 - smoothstep(0.0, wz, f.y)
    );

    // Niebla: se disuelve al acercarse al horizonte y con la distancia
    float velo = smoothstep(0.0, 0.05, prof) * exp(-z * 0.13);

    col += pal(0.08 + z * 0.006 + uTime * 0.02) * linea * velo * 0.20;
    col += vec3(0.82, 0.30, 0.66) * linea * velo * 0.07;

    // Reflejo tenue del resplandor sobre la mesa
    col += brillo * exp(-prof * 8.0) * 0.045;
  }

  // Polvo suspendido sobre el horizonte
  vec2 sp = uv * 9.0;
  float h = hash21(floor(sp));
  if (uv.y > horizon && h > 0.975) {
    vec2 c = fract(sp) - 0.5;
    float parpadeo = 0.55 + 0.45 * sin(uTime * 1.3 + h * 40.0);
    col += vec3(0.90, 0.86, 1.00) *
           smoothstep(0.15, 0.0, length(c)) * parpadeo * 0.22;
  }

  // Vineta
  col *= 1.0 - 0.40 * pow(clamp(length(uv * vec2(0.80, 1.05)), 0.0, 1.4), 2.0);

  // Tonemap filmico (ACES aproximado) para que no se queme el magenta
  col *= 1.15;
  col = (col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14);

  // Grano fino, mata el banding del degradado
  float gr = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (gr - 0.5) * 0.020;

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

        const t = reduced ? 8 : elapsed / 1000;

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
