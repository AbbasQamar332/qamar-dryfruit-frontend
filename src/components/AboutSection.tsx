import aboutBg from "@/assets/about-bg.jpg";
import { Leaf, Mountain, Heart, Loader2 } from "lucide-react";
import { useAbout } from "@/hooks/useData";

const defaultFeatures = [
  { icon: Leaf, title: "100% Natural", desc: "All products sourced directly from nature, free of chemicals and preservatives." },
  { icon: Mountain, title: "From Gilgit Baltistan", desc: "Premium quality products from the pristine mountains of northern Pakistan." },
  { icon: Heart, title: "Health First", desc: "Every product is selected for its nutritional value and health benefits." },
];

export default function AboutSection() {
  const { data: about, isLoading } = useAbout();

  if (isLoading) {
    return (
      <section id="about" className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              Nature&apos;s Finest, Delivered to You
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {about?.bio || "Zeshan Dry Fruit is committed to bringing you the highest quality natural products from the beautiful valleys of Gilgit Baltistan. Our range includes premium dry fruits, pure organic honey, handcrafted jams, aromatic thyme tea, and a variety of herbal teas — all sourced directly from local farmers who follow traditional, chemical-free practices."}
            </p>
            <div className="space-y-4">
              {defaultFeatures.map((f) => (
                <div key={f.title} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src={about?.profile_image_url || aboutBg}
              alt="Gilgit Baltistan landscape"
              loading="lazy"
              width={1200}
              height={600}
              className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
            />
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-xl px-6 py-4 shadow-lg">
              <p className="font-display text-2xl font-bold">{about?.years_experience || 10}+</p>
              <p className="text-sm opacity-90">Years of Quality</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

