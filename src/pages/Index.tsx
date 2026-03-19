import HeroSection from "@/components/HeroSection";
import CollectionsSection from "@/components/CollectionsSection";
import ProductsSection from "@/components/ProductsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Spiritz | Premium Liquor Delivery in Lucknow",
    description: "Browse curated collections of premium beer, whisky, vodka, and rum. Fast and reliable delivery from licensed stores across Lucknow.",
  });

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <CollectionsSection />
      <ProductsSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
};

export default Index;
