import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash, Loader2, GripVertical } from "lucide-react";
import { toast } from "sonner";
import {
  useGallery,
  useCreateGalleryItem,
  useUpdateGalleryItem,
  useDeleteGalleryItem,
} from "@/hooks/useData";
import { uploadImage } from "@/lib/api";

export default function GalleryAdmin() {
  const { data: gallery, isLoading } = useGallery();
  const createItem = useCreateGalleryItem();
  const updateItem = useUpdateGalleryItem();
  const deleteItem = useDeleteGalleryItem();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ caption: "", image_url: "", display_order: "0" });
  const [uploading, setUploading] = useState(false);

  const resetForm = () => {
    setForm({ caption: "", image_url: "", display_order: "0" });
    setEditingId(null);
  };

  const handleEdit = (item: any) => {
    setForm({
      caption: item.caption || "",
      image_url: item.image_url || "",
      display_order: String(item.display_order || 0),
    });
    setEditingId(item.id);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      display_order: Number(form.display_order),
    };
    try {
      if (editingId) {
        await updateItem.mutateAsync({ id: editingId, data: payload });
        toast.success("Gallery item updated");
      } else {
        await createItem.mutateAsync(payload);
        toast.success("Gallery item added");
      }
      setDialogOpen(false);
      resetForm();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteItem.mutateAsync(id);
      toast.success("Item deleted");
    } catch (err: any) {
      toast.error(err.message || "Delete failed");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, "images", `gallery/${Date.now()}-${file.name}`);
      setForm((prev) => ({ ...prev, image_url: url }));
      toast.success("Image uploaded");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Gallery</h2>
            <p className="text-muted-foreground">Manage gallery images</p>
          </div>
          <Dialog
            open={dialogOpen}
            onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) resetForm();
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Image
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit Image" : "Add Image"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="caption">Caption</Label>
                  <Input
                    id="caption"
                    value={form.caption}
                    onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={form.display_order}
                    onChange={(e) => setForm({ ...form, display_order: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image</Label>
                  <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} />
                  {uploading && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" /> Uploading...
                    </div>
                  )}
                  {form.image_url && (
                    <img src={form.image_url} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={createItem.isPending || updateItem.isPending}>
                  {createItem.isPending || updateItem.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  {editingId ? "Update" : "Add"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery?.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground py-12">
                No gallery images yet.
              </p>
            )}
            {gallery?.map((item: any) => (
              <div key={item.id} className="group relative bg-card rounded-xl border border-border overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.caption}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <p className="text-white text-sm font-medium px-2 text-center">{item.caption}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => handleEdit(item)}>
                      <Pencil className="h-3 w-3 mr-1" /> Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                      <Trash className="h-3 w-3 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
                <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded">
                  #{item.display_order}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

