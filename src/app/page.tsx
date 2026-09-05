import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Packages } from "@/components/sections/packages";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Studio } from "@/components/sections/studio";
import { Instagram } from "@/components/sections/instagram";
import { Newsletter } from "@/components/sections/newsletter";
import { ContactCta } from "@/components/sections/contact-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedWork />
      <Packages />
      <Process />
      <Testimonials />
      <Studio />
      <Instagram />
      <Newsletter />
      <ContactCta />
    </>
  );
}
