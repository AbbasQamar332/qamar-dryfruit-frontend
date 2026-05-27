import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAbout,
  updateAbout,
  getBenefits,
  createBenefit,
  updateBenefit,
  deleteBenefit,
  getGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getMessages,
  createMessage,
  deleteMessage,
  markMessageRead,
  getSettings,
  updateSettings,
} from "@/lib/api";

// ===== PRODUCTS =====
export const useProducts = () =>
  useQuery({ queryKey: ["products"], queryFn: getProducts });

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateProduct(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

// ===== ABOUT =====
export const useAbout = () =>
  useQuery({ queryKey: ["about"], queryFn: getAbout });

export const useUpdateAbout = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateAbout,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["about"] }),
  });
};

// ===== BENEFITS =====
export const useBenefits = () =>
  useQuery({ queryKey: ["benefits"], queryFn: getBenefits });

export const useCreateBenefit = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createBenefit,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["benefits"] }),
  });
};

export const useUpdateBenefit = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateBenefit(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["benefits"] }),
  });
};

export const useDeleteBenefit = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteBenefit,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["benefits"] }),
  });
};

// ===== GALLERY =====
export const useGallery = () =>
  useQuery({ queryKey: ["gallery"], queryFn: getGallery });

export const useCreateGalleryItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createGalleryItem,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery"] }),
  });
};

export const useUpdateGalleryItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateGalleryItem(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery"] }),
  });
};

export const useDeleteGalleryItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteGalleryItem,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery"] }),
  });
};

// ===== MESSAGES =====
export const useMessages = () =>
  useQuery({ queryKey: ["messages"], queryFn: getMessages });

export const useCreateMessage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createMessage,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages"] }),
  });
};

export const useDeleteMessage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages"] }),
  });
};

export const useMarkMessageRead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: markMessageRead,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages"] }),
  });
};

// ===== SITE SETTINGS =====
export const useSettings = () =>
  useQuery({ queryKey: ["settings"], queryFn: getSettings });

export const useUpdateSettings = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] }),
  });
};

