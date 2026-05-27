import { Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/useData";

export default function FeaturedProducts() {
  const { data: products, isLoading } = useProducts();
  const featured = products?.filter((p: any) => p.featured) ?? [];

  return (
    <section className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Best Sellers</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Featured Products
          </h2>
          <p className="text-muted-foreground mt-3">Our most popular and loved products</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {featured.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

