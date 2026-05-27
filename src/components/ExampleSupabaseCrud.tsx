/**
 * Example React Component with Direct Supabase CRUD
 * 
 * This demonstrates how to use the updated api.ts layer
 * to perform Create, Read, Update, Delete operations
 * directly on Supabase without the Express backend.
 */

import { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function ExampleSupabaseCrud() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  // FETCH on page load
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err: any) {
      alert("Fetch error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // INSERT
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct({
        name: form.name,
        price: Number(form.price),
        description: form.description,
        category: "Dry Fruits",
        featured: false,
      });
      setForm({ name: "", price: "", description: "" });
      await fetchProducts(); // refresh list
    } catch (err: any) {
      alert("Create error: " + err.message);
    }
  };

  // UPDATE
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      await updateProduct(editingId, {
        name: form.name,
        price: Number(form.price),
        description: form.description,
      });
      setEditingId(null);
      setForm({ name: "", price: "", description: "" });
      await fetchProducts();
    } catch (err: any) {
      alert("Update error: " + err.message);
    }
  };

  // DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      await fetchProducts();
    } catch (err: any) {
      alert("Delete error: " + err.message);
    }
  };

  // IMAGE UPLOAD example
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file, "images", `products/${productId}`);
      await updateProduct(productId, { image_url: url });
      await fetchProducts();
      alert("Image uploaded and saved!");
    } catch (err: any) {
      alert("Upload error: " + err.message);
    }
  };

  const startEdit = (product: any) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: String(product.price),
      description: product.description,
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Example Supabase CRUD</h2>

      <form
        onSubmit={editingId ? handleUpdate : handleCreate}
        className="space-y-3 border p-4 rounded-lg"
      >
        <Input
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <Input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <Button type="submit">
          {editingId ? "Update Product" : "Create Product"}
        </Button>
        {editingId && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", price: "", description: "" });
            }}
          >
            Cancel
          </Button>
        )}
      </form>

      {loading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading...
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="border p-3 rounded-lg flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-muted-foreground">
                  Rs.{p.price} — {p.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  className="w-24 text-xs"
                  onChange={(e) => handleImageUpload(e, p.id)}
                />
                <Button size="sm" variant="ghost" onClick={() => startEdit(p)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <p className="text-muted-foreground">No products yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

