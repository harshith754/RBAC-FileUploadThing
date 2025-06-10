export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

import axios, { isAxiosError } from "axios";

export const uploadFile = async (
  file: File,
  updateProgress: (progress: number) => void
): Promise<{ success: boolean; url?: string; message: string }> => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        updateProgress(percentCompleted);
      },
    });

    return {
      success: true,
      url: response.data.url,
      message: response.data.message,
    };
  } catch (error) {
    let message = "Upload failed";
    if (isAxiosError(error) && error.response?.data?.message) {
      message = error.response.data.message;
    }
    return {
      success: false,
      message,
    };
  }
};
