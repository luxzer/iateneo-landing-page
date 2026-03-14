import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { BackgroundStars } from "@/components/BackgroundStars";

export default function Home() {
  return (
    <>
      <BackgroundStars />
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <WhyUsSection />
          <HowItWorksSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}
