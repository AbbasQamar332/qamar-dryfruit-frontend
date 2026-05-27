import { useProducts } from "@/hooks/useData";

export default function Footer() {
  const { data: products } = useProducts();

  // Extract unique categories from products
  const categories = products
    ? [...new Set(products.map((p: any) => p.category))].slice(0, 6)
    : ["Dry Fruits", "Natural Honey", "Organic Jams", "Herbal Teas"];

  return (
    <footer className="bg-accent py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold text-primary mb-3">
              Purity from <span className="text-secondary">Pure Place</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium natural products from Gilgit Baltistan. Pure, organic, and delivered fresh to your doorstep.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
            <div className="space-y-2">
              {["Home", "About", "Products", "Contact"].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Categories</h4>
            <div className="space-y-2">
              {categories.map((cat: string) => (
                <p key={cat} className="text-sm text-muted-foreground">{cat}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Zeshan Dry Fruit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

