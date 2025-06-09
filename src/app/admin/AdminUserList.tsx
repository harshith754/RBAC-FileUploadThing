"use client";
import { setRole, removeRole } from "./actions";
import { ROLES, AdminUser } from "@/types/roles";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface AdminUserListProps {
  users: AdminUser[];
  isSuperAdmin: boolean;
}

export default function AdminUserList({
  users,
  isSuperAdmin,
}: AdminUserListProps) {
  return (
    <>
      {users.map((user) => (
        <div
          key={user.id}
          className={`flex items-center justify-between gap-4 p-4 ${
            users.indexOf(user) % 2 === 0
              ? "bg-neutral-50 dark:bg-neutral-800"
              : "bg-white dark:bg-neutral-900"
          }`}
        >
          <div className="flex gap-8">
            <div className="dark:text-neutral-200">
              {user.firstName} {user.lastName}
            </div>
            <div className="dark:text-neutral-200">
              {
                user.emailAddresses.find(
                  (email) => email.id === user.primaryEmailAddressId
                )?.emailAddress
              }
            </div>
            <div className="dark:text-neutral-200">
              {user.publicMetadata.role as string}
            </div>
          </div>
          <div className="flex gap-2">
            {isSuperAdmin && (
              <form action={setRole} className="flex gap-2 items-center">
                <input type="hidden" value={user.id} name="id" />
                <Select
                  name="role"
                  defaultValue={user.publicMetadata.role as string}
                >
                  <SelectTrigger className="w-32 h-8 text-xs">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((role) => (
                      <SelectItem value={role} key={role} className="text-xs">
                        {role
                          .replace("-", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="submit"
                  size="sm"
                  variant="outline"
                  className="px-2 py-1 text-xs border border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700"
                >
                  Change Role
                </Button>
              </form>
            )}
            {isSuperAdmin && (
              <form action={removeRole} className="flex gap-2 items-center">
                <input type="hidden" value={user.id} name="id" />
                <Button
                  type="submit"
                  size="sm"
                  variant="outline"
                  className="px-2 py-1 text-xs border border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700"
                >
                  Remove Role
                </Button>
              </form>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
