import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import type { AdminUser } from "@/types/roles";
import FileUploadComponent from "@/components/file-upload/upload-component";
import { getUserFiles } from "../actions/files";
import {
  AdminOnly,
  SuperAdminOnly,
  UserOnly,
} from "@/components/rbac/RoleGuards";

export default async function Page() {
  const user = await currentUser();

  const initialFiles = await getUserFiles();
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-neutral-900 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-800">
      <h1 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">
        Dashboard
      </h1>
      <p className="mb-6 text-neutral-700 dark:text-neutral-300">
        This is the dashboard page where you can manage your files.
      </p>

      <FileUploadComponent initialFiles={initialFiles} />

      <div className="space-y-4">
        <SuperAdminOnly user={user as AdminUser}>
          <div className="p-3 rounded border-l-4 border-red-500 bg-red-50 dark:bg-red-900/40 text-red-900 dark:text-red-200 font-medium shadow-sm">
            <span className="font-semibold">Super Admin: </span>
            This is only visible to super admins.
          </div>
        </SuperAdminOnly>
        <AdminOnly user={user as AdminUser}>
          <div className="p-3 rounded border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/40 text-yellow-900 dark:text-yellow-200 font-medium shadow-sm">
            <span className="font-semibold">Admin: </span>
            This is only visible to admins.
          </div>
        </AdminOnly>
        <UserOnly user={user as AdminUser}>
          <div className="p-3 rounded border-l-4 border-green-500 bg-green-50 dark:bg-green-900/40 text-green-900 dark:text-green-200 font-medium shadow-sm">
            <span className="font-semibold">User: </span>
            This is only visible to regular users.
          </div>
        </UserOnly>
      </div>
    </div>
  );
}
