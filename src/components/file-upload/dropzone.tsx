// components/file-upload/dropzone.tsx
"use client";
import React from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Upload } from "lucide-react";
import { cn } from "@/utils/file-upload";

interface DropzoneProps {
  onDrop: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "application/json": [".json"],
      "text/csv": [".csv"],
    },
    maxSize: 1 * 1024 * 1024, // 1MB
    multiple: true,
    noClick: false,
    noKeyboard: false,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-4 sm:p-8 text-center cursor-pointer transition-colors",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50"
      )}
    >
      <input {...getInputProps()} />
      <Upload
        className={cn(
          "h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-4",
          isDragActive ? "text-primary" : "text-muted-foreground"
        )}
      />
      {isDragActive ? (
        <p className="text-primary font-medium">Drop files here...</p>
      ) : (
        <div className="space-y-2">
          <p className="text-base sm:text-lg font-medium">
            Drag & drop files here, or click to select
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Supports: JPG, JPEG, PNG, JSON, CSV files (max 1MB each)
          </p>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
