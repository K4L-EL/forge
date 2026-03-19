import { MarketingLayout } from "@/components/templates/marketing-layout";
import { Hero } from "@/components/organisms/hero";
import { SocialProof } from "@/components/organisms/social-proof";
import { HowItWorks } from "@/components/organisms/how-it-works";
import { ProductHighlights } from "@/components/organisms/product-highlights";
import { StatsSection } from "@/components/organisms/stats-section";
import { TestimonialsSection } from "@/components/organisms/testimonials-section";
import { FaqSection } from "@/components/organisms/faq-section";
import { CtaSection } from "@/components/organisms/cta-section";

export default function HomePage() {
  return (
    <MarketingLayout>
      <Hero />
      <SocialProof />
      <HowItWorks />
      <ProductHighlights />
      <StatsSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </MarketingLayout>
  );
}
