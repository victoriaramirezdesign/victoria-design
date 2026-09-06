import type { Metadata } from "next";
import "./vd3d.css";

import { Cursor } from "@/components/lab/cursor";
import { Intro } from "@/components/lab/intro";
import { Secuencia } from "@/components/lab/secuencia";
import { BarraLogos } from "@/components/lab/barra-logos";
import { NavLab } from "@/components/lab/nav-lab";
import {
  BadgeBorrador,
  Cifras,
  Cta,
  Hero,
  Manifiesto,
  Paquetes,
  Pie,
  Proceso,
  Proyectos,
  Servicios,
} from "./sections";

export const metadata: Metadata = {
  title: "Borrador 3D",
  description:
    "Concepto de sitio 3D para Victoria Design: de la hoja en blanco al sitio publicado, con la misma oferta de servicios.",
  // Es un borrador interno: no queremos que compita en buscadores con el
  // sitio real ni que se indexe a medio cocinar.
  robots: { index: false, follow: false },
  alternates: { canonical: "/3d" },
};

export default function Borrador3DPage() {
  return (
    <div className="vd3d">
      {/* Sin JS la cortina nunca se levantaria y taparia la pagina. */}
      <noscript>
        <style
          dangerouslySetInnerHTML={{ __html: ".v-intro{display:none!important}" }}
        />
      </noscript>

      <Intro />
      <Cursor />
      <span className="v-grain" aria-hidden />

      <NavLab />
      <Hero />
      <Secuencia />
      <Manifiesto />
      <Servicios />
      <BarraLogos />
      <Proceso />
      <Paquetes />
      <Proyectos />
      <Cifras />
      <Cta />
      <Pie />

      <BadgeBorrador />
    </div>
  );
}
