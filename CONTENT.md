# Contenido que falta del cliente

Lo que hoy sigue en placeholder. A medida que me lo pases, lo reemplazo.

## 1. Datos del estudio (`src/lib/site.ts`) — ✅ completo
- [x] Correo: `gerencia@victoriadesign.pe`
- [x] WhatsApp: +51 984 167 763
- [x] Instagram, TikTok, Facebook, LinkedIn
- [ ] Ciudad / base del estudio (hoy dice solo "Peru")
- [ ] Link de Calendly/Cal.com para "Agendar llamada" (`site.bookingUrl`,
      hoy vacio = el boton no aparece)

## 2. El duo (`src/content/team.ts`)
- [x] Ana Victoria Ramirez Sanchez — diseno y direccion creativa
- [x] Azet Ramirez — desarrollo web
- [ ] Bio final de cada uno (2-3 lineas; hoy hay una generica)
- [ ] Foto de cada uno (cuadrada, min 800x800) -> `public/equipo/`

## 3. Portafolio (`src/content/projects.ts`) — 12 clientes reales cargados
Ya estan los nombres, anos y tipo de servicio. Por cada proyecto falta:
- [ ] **Rubro** (`sector`) — ej. "Odontologia", "Cafeteria"
- [ ] **Resumen** (`summary`) — 1-2 lineas de que se hizo
- [ ] **Imagenes** -> `public/trabajos/<slug>/` y referenciarlas en `cover`
- [ ] Resultados con numeros, si los hay (opcional pero potente)

Clientes cargados: Reyes Odontologia, GreenProd, No Hay 2, Santo Grano,
Balik, Casa Villalta, Geocon Consult, Fullnes, Thana, Nutriavo, La Red,
Aprendiendo Juntos.

## 4. Paquetes (`src/content/packages.ts`) — NUEVO
- [ ] Confirmar los 3 planes y que incluye cada uno
- [ ] **Precios** (`price`) — hoy los 3 dicen "Segun proyecto"

## 5. Testimonios (`src/content/testimonials.ts`) — NUEVO, vacio
- [ ] 3-5 testimonios de clientes (frase + nombre + cargo/empresa)
- [ ] Foto de cada uno (opcional)
> Mientras el array este vacio, la seccion no se muestra en la web.

## 6. Instagram (`src/content/instagram.ts`) — NUEVO, vacio
- [ ] 4-8 imagenes de posts destacados -> `public/instagram/` + link al post
> Vacio = se muestra solo un bloque invitando a seguirlos.

## 7. Notas / blog (`src/content/posts.ts`) — NUEVO, vacio
- [ ] Escribir las primeras 2-3 notas (titulo, resumen, cuerpo)
> Vacio = `/notas` muestra un estado "Pronto".

## 8. Newsletter
- [ ] Definir y preparar el lead magnet (hoy promete "5 errores de marca
      que frenan a un negocio nuevo" — hay que crear ese PDF)
- [ ] Decidir como se envia (hoy solo guarda el correo en Supabase)

## 9. Marca visual
- [ ] **Logo** (SVG o PNG con fondo transparente) — no lo encontre en el
      escritorio; hoy se usa el texto "VD" + wordmark
- [ ] Favicon
- [ ] Imagen para compartir en redes (OG, 1200x630)
- [x] Color de acento: magenta `#a92a86` claro / `#d24da8` oscuro
- [ ] **Tipografia**: la marca usa **EngraversGothic BT**, que es comercial
      (Bitstream) y no se puede incrustar en web sin licencia de webfont.
      Hoy el logotipo usa *Julius Sans One* como aproximacion libre.
      Si compran la licencia web y me pasan el `.woff2`, lo cambio.
- [ ] Video corto para el hero (10-15s, mp4 sin audio) -> `public/` y
      apuntarlo en `site.heroVideo`

## 10. Textos legales (footer, mas adelante)
- [ ] Politica de privacidad
- [ ] Terminos de servicio
