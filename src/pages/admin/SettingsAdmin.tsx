import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSettings, useUpdateSettings } from "@/hooks/useData";

export default function SettingsAdmin() {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();

  const [form, setForm] = useState({
    hero_title: "",
    hero_subtitle: "",
    hero_tagline: "",
    hero_banner_url: "",

    // Social
    facebook_url: "",
    instagram_url: "",
    tiktok_url: "",
    youtube_url: "",

    // Contact
    phone_numbers: "",
    email_addresses: "",
    whatsapp_number: "",
    physical_address: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (settings) {
      setForm({
        hero_title: settings.hero_title || "",
        hero_subtitle: settings.hero_subtitle || "",
        hero_tagline: settings.hero_tagline || "",
        hero_banner_url: settings.hero_banner_url || "",

        facebook_url: settings.facebook_url || "",
        instagram_url: settings.instagram_url || "",
        tiktok_url: settings.tiktok_url || "",
        youtube_url: settings.youtube_url || "",

        phone_numbers: settings.phone_numbers || "",
        email_addresses: settings.email_addresses || "",
        whatsapp_number: settings.whatsapp_number || "",
        physical_address: settings.physical_address || "",
      });
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSettings.mutateAsync(form);
      toast.success("Settings updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save settings");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // Explicitly package data matching your backend's parser expectations
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", "images");
    formData.append("path", `settings/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`);

    try {
      // Direct fetch call ensures headers and body align perfectly with your Express routing
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          // Explicit authorization pass matching your server auth bypass engine
          "Authorization": `Bearer ${localStorage.getItem("token") || "local-dev"}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Server upload rejection");
      }

      const result = await response.json();
      
      if (result.url) {
        setForm((prev) => ({ ...prev, hero_banner_url: result.url }));
        toast.success("Banner image staged successfully!");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Upload process failed");
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Site Settings</h2>
          <p className="text-muted-foreground">Configure hero section and global settings</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hero_title">Hero Title</Label>
            <Input
              id="hero_title"
              required
              value={form.hero_title}
              onChange={(e) => setForm((prev) => ({ ...prev, hero_title: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
            <Input
              id="hero_subtitle"
              required
              value={form.hero_subtitle}
              onChange={(e) => setForm((prev) => ({ ...prev, hero_subtitle: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero_tagline">Hero Tagline</Label>
            <Textarea
              id="hero_tagline"
              required
              rows={2}
              value={form.hero_tagline}
              onChange={(e) => setForm((prev) => ({ ...prev, hero_tagline: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="banner">Hero Banner Image</Label>
            <Input id="banner" type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />

            {uploading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" /> Uploading image asset...
              </div>
            )}

            {form.hero_banner_url && !uploading && (
              <div className="mt-2 space-y-1">
                <p className="text-xs text-muted-foreground">Staged Banner Preview:</p>
                <img
                  src={form.hero_banner_url}
                  alt="Banner preview"
                  className="w-full h-40 object-cover rounded-lg border border-border"
                />
              </div>
            )}
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div className="grid sm:grid-cols-2 gap-4 mt-3">
              <div className="space-y-2">
                <Label htmlFor="facebook_url">Facebook URL</Label>
                <Input id="facebook_url" value={form.facebook_url} onChange={(e) => setForm((p) => ({ ...p, facebook_url: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram_url">Instagram URL</Label>
                <Input id="instagram_url" value={form.instagram_url} onChange={(e) => setForm((p) => ({ ...p, instagram_url: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tiktok_url">TikTok URL</Label>
                <Input id="tiktok_url" value={form.tiktok_url} onChange={(e) => setForm((p) => ({ ...p, tiktok_url: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtube_url">YouTube URL</Label>
                <Input id="youtube_url" value={form.youtube_url} onChange={(e) => setForm((p) => ({ ...p, youtube_url: e.target.value }))} />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid sm:grid-cols-2 gap-4 mt-3">
              <div className="space-y-2">
                <Label htmlFor="phone_numbers">Phone Numbers</Label>
                <Input id="phone_numbers" placeholder="+92..., +92..." value={form.phone_numbers} onChange={(e) => setForm((p) => ({ ...p, phone_numbers: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email_addresses">Email Addresses</Label>
                <Input id="email_addresses" placeholder="a@x.com, b@y.com" value={form.email_addresses} onChange={(e) => setForm((p) => ({ ...p, email_addresses: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
                <Input id="whatsapp_number" placeholder="+92..." value={form.whatsapp_number} onChange={(e) => setForm((p) => ({ ...p, whatsapp_number: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="physical_address">Physical Address</Label>
                <Input id="physical_address" value={form.physical_address} onChange={(e) => setForm((p) => ({ ...p, physical_address: e.target.value }))} />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={updateSettings.isPending || uploading} className="w-full sm:w-auto">
            {updateSettings.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Save Settings
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}