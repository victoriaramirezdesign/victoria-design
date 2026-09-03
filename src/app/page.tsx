import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/marquee";
import { Services } from "@/components/sections/services";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Process } from "@/components/sections/process";
import { Studio } from "@/components/sections/studio";
import { ContactCta } from "@/components/sections/contact-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <FeaturedWork />
      <Process />
      <Studio />
      <ContactCta />
    </>
  );
}
