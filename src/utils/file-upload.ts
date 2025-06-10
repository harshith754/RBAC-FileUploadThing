
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



export const uploadFile = async (
    file: File,
    updateProgress: (progress: number) => void
  ): Promise<{ success: boolean; url: string; message: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setTimeout(() => {
            resolve({
              success: Math.random() > 0.2,
              url: `https://example.com/files/${file.name}`,
              message:
                Math.random() > 0.2
                  ? "Upload successful"
                  : "Server validation failed",
            });
          }, 500);
        }
        updateProgress(Math.min(progress, 100));
      }, 300);
    });
  };
