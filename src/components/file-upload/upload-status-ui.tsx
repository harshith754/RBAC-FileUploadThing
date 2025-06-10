import React from "react";
import { Loader2, CheckCircle, AlertCircle, File } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { UploadStatus } from "@/types/file-upload";

export function StatusIcon({ status }: { status: UploadStatus }) {
  switch (status) {
    case "uploading":
      return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "error":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <File className="h-4 w-4 text-gray-400" />;
  }
}

export function StatusBadge({ status }: { status: UploadStatus }) {
  switch (status) {
    case "uploading":
      return <Badge variant="secondary">Uploading</Badge>;
    case "completed":
      return (
        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
          Completed
        </Badge>
      );
    case "error":
      return <Badge variant="destructive">Failed</Badge>;
    default:
      return <Badge variant="outline">Pending</Badge>;
  }
}

export function ErrorAlert({
  errors,
}: {
  errors: string[];
  className?: string;
}) {
  if (!errors.length) return null;
  return (
    <Alert variant="destructive" className="text-xs sm:text-sm">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        <ul className="list-disc list-inside space-y-1">
          {errors.map((error, idx) => (
            <li key={idx} className="text-xs sm:text-sm">
              {error}
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}

export function MessageAlert({
  message,
  status,
}: {
  message: string;
  status: UploadStatus;
  className?: string;
}) {
  if (!message) return null;
  return (
    <Alert
      className={
        status === "completed"
          ? "border-green-500 text-xs sm:text-sm"
          : "border-red-500 text-xs sm:text-sm"
      }
    >
      <AlertDescription
        className={
          status === "completed" ? "text-green-700" : "text-red-700"
        }
      >
        {message}
      </AlertDescription>
    </Alert>
  );
}
