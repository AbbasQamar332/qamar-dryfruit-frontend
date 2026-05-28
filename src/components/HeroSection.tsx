import heroBanner from "@/assets/hero-banner.jpg";
import { Button } from "@/components/ui/button";
import { ArrowDown, Loader2 } from "lucide-react";
import { useSettings } from "@/hooks/useData";

export default function HeroSection() {
  const { data: settings, isLoading } = useSettings();
  console.log(settings?.hero_banner_url);
  if (isLoading) {
    return (
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-muted">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </section>
    );
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={settings?.hero_banner_url || heroBanner}
          alt="Zeshan Dry Fruit products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <span className="inline-block px-4 py-1.5 rounded-full border border-gold-light/40 text-gold-light text-sm font-medium mb-6 backdrop-blur-sm">
          🌿 100% Natural & Organic
        </span>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 leading-tight">
          {settings?.hero_title || "Purity from"} <span className="text-gold-light">Pure Place</span>
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 font-light mb-2">
          {settings?.hero_subtitle || "Pure Natural Products"}
        </p>
        <p className="text-base md:text-lg text-gold-light/80 mb-8">
          {settings?.hero_tagline || "Healthy Natural Food from Gilgit Baltistan"}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-gold-dark text-primary-foreground font-semibold text-base px-8">
            <a href="#products">Shop Now</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-gold-light/40 text-primary-foreground hover:bg-gold-light/10 text-base px-8">
            <a href="#about">Learn More</a>
          </Button>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/60 animate-float">
        <ArrowDown className="h-6 w-6" />
      </a>
    </section>
  );
}

