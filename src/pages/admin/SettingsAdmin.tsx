import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSettings, useUpdateSettings } from "@/hooks/useData";
import { uploadImage } from "@/lib/api";

export default function SettingsAdmin() {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();

  const [form, setForm] = useState({
    hero_title: "",
    hero_subtitle: "",
    hero_tagline: "",
    hero_banner_url: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (settings) {
      setForm({
        hero_title: settings.hero_title || "",
        hero_subtitle: settings.hero_subtitle || "",
        hero_tagline: settings.hero_tagline || "",
        hero_banner_url: settings.hero_banner_url || "",
      });
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSettings.mutateAsync(form);
      toast.success("Settings updated");
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, "images", `settings/${Date.now()}-${file.name}`);
      setForm((prev) => ({ ...prev, hero_banner_url: url }));
      toast.success("Banner uploaded");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
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
              onChange={(e) => setForm({ ...form, hero_title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
            <Input
              id="hero_subtitle"
              required
              value={form.hero_subtitle}
              onChange={(e) => setForm({ ...form, hero_subtitle: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero_tagline">Hero Tagline</Label>
            <Textarea
              id="hero_tagline"
              required
              rows={2}
              value={form.hero_tagline}
              onChange={(e) => setForm({ ...form, hero_tagline: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="banner">Hero Banner Image</Label>
            <Input id="banner" type="file" accept="image/*" onChange={handleImageUpload} />
            {uploading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Uploading...
              </div>
            )}
            {form.hero_banner_url && (
              <img
                src={form.hero_banner_url}
                alt="Banner preview"
                className="w-full h-40 object-cover rounded-lg"
              />
            )}
          </div>

          <Button type="submit" disabled={updateSettings.isPending}>
            {updateSettings.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Save Settings
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}

