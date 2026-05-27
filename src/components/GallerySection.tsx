import { Loader2 } from "lucide-react";
import { useGallery } from "@/hooks/useData";

import walnuts from "@/assets/walnuts.jpg";
import almonds from "@/assets/almonds.jpg";
import honey from "@/assets/honey.jpg";
import thymeTea from "@/assets/thyme-tea.jpg";
import herbalTea from "@/assets/herbal-tea.jpg";
import pistachios from "@/assets/pistachios.jpg";
import jam from "@/assets/jam.jpg";
import herbs from "@/assets/herbs.jpg";

const defaultImages = [
  { src: walnuts, caption: "Premium Walnuts" },
  { src: honey, caption: "Pure Mountain Honey" },
  { src: almonds, caption: "Organic Almonds" },
  { src: thymeTea, caption: "Thyme Tea" },
  { src: pistachios, caption: "Green Pistachios" },
  { src: herbalTea, caption: "Herbal Teas" },
  { src: jam, caption: "Organic Berry Jam" },
  { src: herbs, caption: "Natural Herbs" },
];

export default function GallerySection() {
  const { data: gallery, isLoading } = useGallery();
  const displayImages = gallery?.length
    ? gallery.map((g: any) => ({ src: g.image_url, caption: g.caption || "Gallery Image" }))
    : defaultImages;

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Gallery</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Our Beautiful Products
          </h2>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayImages.map((img: any, i: number) => (
              <div key={i} className="group relative overflow-hidden rounded-xl aspect-square">
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-end">
                  <p className="text-primary-foreground font-medium p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

