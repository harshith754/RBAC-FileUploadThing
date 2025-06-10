"use client";
import React, { useState, useCallback } from "react";
import { FileRejection } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { uploadFile } from "@/utils/file-upload";
import type { UploadQueueItem } from "@/types/file-upload";
import UploadQueueList from "@/components/file-upload/upload-queue-list";
import Dropzone from "./dropzone";

const FileUploadComponent: React.FC = () => {
  const [uploadQueue, setUploadQueue] = useState<UploadQueueItem[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      rejectedFiles.forEach(({ file, errors }) => {
        const errorMessages = errors.map((error) => {
          switch (error.code) {
            case "file-too-large":
              return `File size exceeds 1MB limit (${(
                file.size /
                1024 /
                1024
              ).toFixed(2)}MB)`;
            case "file-invalid-type":
              return `File type not supported. Only JPG, PNG, JSON, CSV files are allowed`;
            case "too-many-files":
              return "Too many files selected";
            default:
              return error.message;
          }
        });
        const fileObj: UploadQueueItem = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          name: file.name,
          status: "error",
          progress: 0,
          errors: errorMessages,
        };
        setUploadQueue((prev) => [...prev, fileObj]);
      });
      acceptedFiles.forEach(async (file) => {
        const fileId = Math.random().toString(36).substr(2, 9);
        const fileObj: UploadQueueItem = {
          id: fileId,
          file,
          name: file.name,
          status: "uploading",
          progress: 0,
          errors: [],
        };
        setUploadQueue((prev) => [...prev, fileObj]);
        try {
          const result = await uploadFile(file, (progress: number) => {
            setUploadQueue((prev) =>
              prev.map((f) => (f.id === fileId ? { ...f, progress } : f))
            );
          });
          setUploadQueue((prev) =>
            prev.map((f) =>
              f.id === fileId
                ? {
                    ...f,
                    status: result.success ? "completed" : "error",
                    url: result.url,
                    message: result.message,
                  }
                : f
            )
          );
        } catch (error) {
          setUploadQueue((prev) =>
            prev.map((f) =>
              f.id === fileId
                ? {
                    ...f,
                    status: "error",
                    message: `Upload failed - ${
                      error instanceof Error ? error.message : String(error)
                    }`,
                  }
                : f
            )
          );
        }
      });
    },
    []
  );

  const removeFile = (fileId: string): void => {
    setUploadQueue((prev) => prev.filter((f) => f.id !== fileId));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <Dropzone onDrop={onDrop} />
        </CardContent>
      </Card>

      {uploadQueue.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-row items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-semibold">Upload Queue</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUploadQueue([])}
              className="px-3 py-1"
            >
              Clear All
            </Button>
          </div>
          <UploadQueueList uploadQueue={uploadQueue} removeFile={removeFile} />
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
