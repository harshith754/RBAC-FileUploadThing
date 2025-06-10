// Types for file upload
export type UploadStatus = "uploading" | "completed" | "error" | "pending";

export interface UploadQueueItem {
  id: string;
  file: File;
  name: string;
  status: UploadStatus;
  progress: number;
  errors: string[];
  url?: string;
  message?: string;
}
