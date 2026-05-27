import {
  Heart,
  Brain,
  Shield,
  Zap,
  Apple,
  Droplets,
  Leaf,
  Mountain,
  Sun,
  Moon,
  Star,
  Flower2,
  Loader2,
} from "lucide-react";
import { useBenefits } from "@/hooks/useData";

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Brain,
  Shield,
  Zap,
  Apple,
  Droplets,
  Leaf,
  Mountain,
  Sun,
  Moon,
  Star,
  Flower: Flower2,
};

const defaultBenefits = [
  { icon_name: "Heart", title: "Heart Health", description: "Dry fruits like walnuts and almonds are rich in omega-3 fatty acids that support cardiovascular health." },
  { icon_name: "Brain", title: "Brain Function", description: "Regular consumption of dry fruits improves memory, focus, and cognitive function." },
  { icon_name: "Shield", title: "Immunity Boost", description: "Natural honey and herbal teas strengthen the immune system with natural antioxidants." },
  { icon_name: "Zap", title: "Energy & Vitality", description: "Dry fruits provide sustained energy, making them a perfect natural snack." },
  { icon_name: "Apple", title: "Rich in Nutrients", description: "Packed with vitamins, minerals, and essential fatty acids for overall well-being." },
  { icon_name: "Droplets", title: "Natural Healing", description: "Herbal teas and thyme have anti-inflammatory and healing properties used for centuries." },
];

export default function BenefitsSection() {
  const { data: benefits, isLoading } = useBenefits();
  const displayBenefits = benefits?.length ? benefits : defaultBenefits;

  if (isLoading) {
    return (
      <section id="benefits" className="py-20 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </section>
    );
  }

  return (
    <section id="benefits" className="py-20 bg-accent text-accent-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
            Health Benefits
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Discover the amazing health benefits of our natural products
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {displayBenefits.map((b: any) => {
            const IconComp = iconMap[b.icon_name] || Heart;
            return (
              <div key={b.id || b.title} className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <IconComp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

