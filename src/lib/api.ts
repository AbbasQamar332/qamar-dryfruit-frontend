import axios from "axios";
import { supabase } from "@/integrations/supabase/client";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach auth token to every backend request
// - Uses Supabase session token if available
// - Falls back to "local-dev" token to avoid 401 errors
api.interceptors.request.use(async (config) => {
  try {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token || "local-dev";
    config.headers.Authorization = `Bearer ${token}`;
  } catch {
    config.headers.Authorization = `Bearer local-dev`;
  }
  return config;
});

// Helper: try Supabase, fall back to backend on any error
async function supabaseOrBackend<T>(
  supabaseFn: () => Promise<T>,
  backendFn: () => Promise<T>
): Promise<T> {
  try {
    return await supabaseFn();
  } catch {
    return await backendFn();
  }
}

// ===== PRODUCTS =====
export const getProducts = () =>
  supabaseOrBackend(
    async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    () => api.get("/products").then((r) => r.data)
  );

export const createProduct = (product: any) =>
  supabaseOrBackend(
    async () => {
      const { data, error } = await supabase
        .from("products")
        .insert(product)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    () => api.post("/products", product).then((r) => r.data)
  );

export const updateProduct = (id: string, product: any) =>
  supabaseOrBackend(
    async () => {
      const { data, error } = await supabase
        .from("products")
        .update(product)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    () => api.put(`/products/${id}`, product).then((r) => r.data)
  );

export const deleteProduct = (id: string) =>
  supabaseOrBackend(
    async () => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      return { success: true };
    },
    () => api.delete(`/products/${id}`).then((r) => r.data)
  );

// ===== ABOUT =====
export const getAbout = () =>
  supabaseOrBackend(
    async () => {
      const { data, error } = await supabase
        .from("about")
        .select("*")
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    () => api.get("/about").then((r) => r.data)
  );

export const updateAbout = (about: any) =>
  supabaseOrBackend(
    async () => {
      const { data: existing } = await supabase
        .from("about")
        .select("id")
        .maybeSingle();

      let result;
      if (existing?.id) {
        result = await supabase
          .from("about")
          .update(about)
          .eq("id", existing.id)
          .select()
          .single();
      } else {
        result = await supabase.from("about").insert(about).select().single();
      }
      if (result.error) throw result.error;
      return result.data;
    },
    () => api.put("/about", about).then((r) => r.data)
  );

// ===== BENEFITS =====
export const getBenefits = () =>
  supabaseOrBackend(
    async () => {
      const { data, error } = await supabase
        .from("benefits")
        .select("*")
        .order("created_at");
      if (error) throw error;
      return data || [];
    },
    () => api.get("/benefits").then((r) => r.data)
  );

export const createBenefit = (benefit: any) =>
  supabaseOrBackend(
    async () => {
      const { data, error } = await supabase
        .from("benefits")
        .insert(benefit)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    () => api.post("/benefits", benefit).then((r) => r.data)
  );

export const updateBenefit = (id: string, benefit: any) =>
  supabaseOrBackend(
    async () => {
      const { data, error } = await supabase
        .from("benefits")
        .update(benefit)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    () => api.put(`/benefits/${id}`, benefit).then((r) => r.data)
  );

export const deleteBenefit = (id: string) =>
  supabaseOrBackend(
    async () => {
      const { error } = await supabase.from("benefits").delete().eq("id", id);
      if (error) throw error;
      return { success: true };
    },
    () => api.delete(`/benefits/${id}`).then((r) => r.data)
  );

// ===== GALLERY =====
export const getGallery = () =>
  supabaseOrBackend(
    async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data || [];
    },
    () => api.get("/gallery").then((r) => r.data)
  );

export const createGalleryItem = (item: any) =>
  supabaseOrBackend(
    async () => {
      const { data, error } = await supabase
        .from("gallery")
        .insert(item)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    () => api.post("/gallery", item).then((r) => r.data)
  );

export const updateGalleryItem = (id: string, item: any) =>
  supabaseOrBackend(
    async () => {
      const { data, error } = await supabase
        .from("gallery")
        .update(item)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    () => api.put(`/gallery/${id}`, item).then((r) => r.data)
  );

export const deleteGalleryItem = (id: string) =>
  supabaseOrBackend(
    async () => {
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (error) throw error;
      return { success: true };
    },
    () => api.delete(`/gallery/${id}`).then((r) => r.data)
  );

// ===== MESSAGES =====
export const getMessages = () =>
  supabaseOrBackend(
    async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    () => api.get("/messages").then((r) => r.data)
  );

export const createMessage = (message: any) =>
  supabaseOrBackend(
    async () => {
      const { data, error } = await supabase
        .from("messages")
        .insert(message)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    () => api.post("/messages", message).then((r) => r.data)
  );

export const deleteMessage = (id: string) =>
  supabaseOrBackend(
    async () => {
      const { error } = await supabase.from("messages").delete().eq("id", id);
      if (error) throw error;
      return { success: true };
    },
    () => api.delete(`/messages/${id}`).then((r) => r.data)
  );

export const markMessageRead = (id: string) =>
  supabaseOrBackend(
    async () => {
      const { data, error } = await supabase
        .from("messages")
        .update({ is_read: true })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    () => api.patch(`/messages/${id}/read`).then((r) => r.data)
  );

// ===== SITE SETTINGS =====
export const getSettings = () =>
  supabaseOrBackend(
    async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    () => api.get("/settings").then((r) => r.data)
  );

export const updateSettings = (settings: any) =>
  supabaseOrBackend(
    async () => {
      const { data: existing } = await supabase
        .from("site_settings")
        .select("id")
        .maybeSingle();

      const payload = { ...settings, updated_at: new Date().toISOString() };

      let result;
      if (existing?.id) {
        result = await supabase
          .from("site_settings")
          .update(payload)
          .eq("id", existing.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from("site_settings")
          .insert(payload)
          .select()
          .single();
      }
      if (result.error) throw result.error;
      return result.data;
    },
    () => api.put("/settings", settings).then((r) => r.data)
  );

// ===== FILE UPLOAD (always uses backend for now) =====
export const uploadImage = async (file: File, bucket: string, path: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("bucket", bucket); // Pass metadata if backend expects it
  formData.append("path", path);

  // Notice the matching '/api/upload' prefix if your base URL doesn't include /api
  const { data } = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.url; 
};
