# Contenido que falta del cliente

Lo que hoy sigue en placeholder. A medida que me lo pases, lo reemplazo.

## 1. Datos del estudio (`src/lib/site.ts`) — ✅ completo
- [x] Correo: `gerencia@victoriadesign.pe`
- [x] WhatsApp: +51 984 167 763
- [x] Instagram, TikTok, Facebook, LinkedIn
- [x] Ciudad / base del estudio: Nuevo Chimbote - Peru
- [ ] Link de Calendly/Cal.com para "Agendar llamada" (`site.bookingUrl`,
      hoy vacio = el boton no aparece)

## 2. El duo (`src/content/team.ts`)
- [x] Ana Victoria Ramirez Sanchez — diseno y direccion creativa
- [x] Azet Ramirez — desarrollo web
- [ ] Bio final de cada uno (2-3 lineas; hoy hay una generica)
- [ ] Foto de cada uno (cuadrada, min 800x800) -> `public/equipo/`

## 3. Portafolio (`src/content/projects.ts`) — 18 clientes, todos con logo
Los 18 logos estan procesados en `public/trabajos/<slug>/cover.png`
(PNG 1200x900, fondo de la paleta del sitio).

Falta por cada proyecto:
- [ ] **Rubro** (`sector`) — ej. "Odontologia", "Cafeteria"
- [ ] **Resumen** (`summary`) — 1-2 lineas de que se hizo
- [ ] Resultados con numeros, si los hay (opcional pero potente)
- [ ] Imagenes del trabajo en si (hoy solo esta el logo)

**De estos 6 solo llego el logo — falta ano y tipo de servicio**
(hoy figuran como "Identidad corporativa" sin ano, hay que confirmarlo):
Caraz Dulzura Helados, Carniprod, Ceprobio, FishGrox, Brand-in, ArizAle.

> Ojo: el archivo "GREENPROD LOGO 25 NOV.jpg" en realidad contiene el
> logo de **Carniprod**, no de GreenProd. Se uso como tal.

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
- [ ] **Logo de Victoria Design** (SVG o PNG con fondo transparente) — la
      carpeta "LOGOS DE PROYECTOS VD" trae los logos de los CLIENTES, pero
      no el del estudio. Hoy se usa el texto "VD" + wordmark.
- [ ] Favicon
- [ ] Imagen para compartir en redes (OG, 1200x630)
- [x] Color de acento: magenta `#a92a86` claro / `#d24da8` oscuro
- [x] **Tipografia**: la marca usa **EngraversGothic BT**, comercial
      (Bitstream), que no se puede incrustar en web sin licencia de
      webfont. Se busco la alternativa libre mas parecida y quedo
      **Julius Sans One** (caja alta, ancha y ligera, mismo aire
      "engraved"). Se aplica al logotipo y a todos los rotulos en
      versalitas. Si compran la licencia web de EngraversGothic BT y me
      pasan el `.woff2`, se cambia en `layout.tsx` por `next/font/local`.
- [ ] Video corto para el hero (10-15s, mp4 sin audio) -> `public/` y
      apuntarlo en `site.heroVideo`

## 10. Textos legales (footer, mas adelante)
- [ ] Politica de privacidad
- [ ] Terminos de servicio
