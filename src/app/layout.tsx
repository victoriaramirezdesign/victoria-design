import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Julius_Sans_One } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsappFloat } from "@/components/whatsapp-float";
import { themeInitScript } from "@/components/ui/theme-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

// Aproximacion libre a EngraversGothic BT (comercial, requiere licencia
// webfont). Se usa solo en el logotipo. TODO(marca): si compran la licencia
// web de EngraversGothic BT, reemplazar por next/font/local con el .woff2.
const julius = Julius_Sans_One({
  variable: "--font-julius",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Estudio de diseño y desarrollo web en Perú`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "diseño web Perú",
    "desarrollo web",
    "landing page",
    "identidad de marca",
    "tienda online Perú",
    "estudio de diseño",
  ],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Diseño y desarrollo web`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${julius.variable} dark h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-fg"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsappFloat />
      </body>
    </html>
  );
}
