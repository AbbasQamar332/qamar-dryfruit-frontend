import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAbout, useUpdateAbout } from "@/hooks/useData";
import { uploadImage } from "@/lib/api";

export default function AboutAdmin() {
  const { data: about, isLoading } = useAbout();
  const updateAbout = useUpdateAbout();

  const [form, setForm] = useState({
    company_name: "",
    bio: "",
    years_experience: "",
    profile_image_url: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (about) {
      setForm({
        company_name: about.company_name || "",
        bio: about.bio || "",
        years_experience: String(about.years_experience || 10),
        profile_image_url: about.profile_image_url || "",
      });
    }
  }, [about]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateAbout.mutateAsync({
        ...form,
        years_experience: Number(form.years_experience),
      });
      toast.success("About section updated");
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, "images", `about/${Date.now()}-${file.name}`);
      setForm((prev) => ({ ...prev, profile_image_url: url }));
      toast.success("Image uploaded");
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
          <h2 className="text-2xl font-bold tracking-tight">About Section</h2>
          <p className="text-muted-foreground">Update your company information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company_name">Company Name</Label>
            <Input
              id="company_name"
              required
              value={form.company_name}
              onChange={(e) => setForm({ ...form, company_name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio / Description</Label>
            <Textarea
              id="bio"
              required
              rows={5}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="years">Years of Experience</Label>
            <Input
              id="years"
              type="number"
              required
              value={form.years_experience}
              onChange={(e) => setForm({ ...form, years_experience: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Profile / About Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {uploading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Uploading...
              </div>
            )}
            {form.profile_image_url && (
              <img
                src={form.profile_image_url}
                alt="About"
                className="w-32 h-32 object-cover rounded-lg"
              />
            )}
          </div>

          <Button type="submit" disabled={updateAbout.isPending}>
            {updateAbout.isPending && (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            )}
            Save Changes
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}

