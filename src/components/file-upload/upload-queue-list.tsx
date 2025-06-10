import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";
import {
  StatusIcon,
  StatusBadge,
  ErrorAlert,
  MessageAlert,
} from "@/components/file-upload/upload-status-ui";
import { formatFileSize } from "@/utils/file-upload";
import type { UploadQueueItem } from "@/types/file-upload";

interface UploadQueueListProps {
  uploadQueue: UploadQueueItem[];
  removeFile: (fileId: string) => void;
}

const UploadQueueList: React.FC<UploadQueueListProps> = ({
  uploadQueue,
  removeFile,
}) => {
  return (
    <div className="space-y-2">
      {uploadQueue.map((item) => (
        <Card key={item.id} className="pt-0 pb-0">
          <CardContent className="p-2 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 gap-1 sm:gap-0">
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex flex-row items-center justify-between gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 min-w-0">
                    <div className="flex items-center gap-1 font-medium text-foreground truncate text-xs sm:text-base max-w-[120px] sm:max-w-xs">
                      <span className="flex-shrink-0">
                        <StatusIcon status={item.status} />
                      </span>
                      <span className="truncate">{item.name}</span>
                    </div>
                    {/* Hide status badge on mobile, show on sm+ */}
                    <span className="hidden sm:inline-flex">
                      <StatusBadge status={item.status} />
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-1 sm:gap-2">
                    <span className="text-[10px] sm:text-xs text-muted-foreground">
                      {formatFileSize(item.file.size)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(item.id)}
                      className="h-6 w-6 p-0"
                      aria-label={`Remove ${item.name}`}
                    >
                      <X className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
                {item.status === "uploading" && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
                      <span>Uploading...</span>
                      <span>{Math.round(item.progress)}%</span>
                    </div>
                    <Progress value={item.progress} className="h-1.5 sm:h-2" />
                  </div>
                )}
                <MessageAlert
                  message={item.message || ""}
                  status={item.status}
                  className="text-xs sm:text-sm"
                />
                <ErrorAlert
                  errors={item.errors}
                  className="text-xs sm:text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UploadQueueList;
