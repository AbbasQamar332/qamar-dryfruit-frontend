import { useProducts, useSettings } from "@/hooks/useData";
import { Facebook, Instagram, Youtube, Music2 } from "lucide-react";

function SocialIconLink({
  href,
  label,
  children,
}: {
  href?: string | null;
  label: string;
  children: React.ReactNode;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-muted-foreground hover:text-primary transition-colors"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const { data: products } = useProducts();
  const { data: settings } = useSettings();

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
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
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
          <div>
            <h4 className="font-semibold text-foreground mb-3">Connect With Us</h4>
            <div className="flex items-center gap-4">
              <SocialIconLink href={settings?.facebook_url} label="Facebook">
                <Facebook className="h-5 w-5" />
              </SocialIconLink>
              <SocialIconLink href={settings?.instagram_url} label="Instagram">
                <Instagram className="h-5 w-5" />
              </SocialIconLink>
              <SocialIconLink href={settings?.tiktok_url} label="TikTok">
                <Music2 className="h-5 w-5" />
              </SocialIconLink>
              <SocialIconLink href={settings?.youtube_url} label="YouTube">
                <Youtube className="h-5 w-5" />
              </SocialIconLink>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Phone:</span>{" "}
                {settings?.phone_numbers ? String(settings.phone_numbers).split(",").map((s: string) => s.trim()).filter(Boolean)[0] : ""}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Email:</span>{" "}
                {settings?.email_addresses ? String(settings.email_addresses).split(",").map((s: string) => s.trim()).filter(Boolean)[0] : ""}
              </p>
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

