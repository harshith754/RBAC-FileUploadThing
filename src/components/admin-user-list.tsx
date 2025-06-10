"use client";
import { setRole, removeRole } from "@/app/admin/actions";
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
    <div className="space-y-2 sm:space-y-0">
      {users.map((user) => (
        <div
          key={user.id}
          className={`p-3 sm:p-4 ${
            users.indexOf(user) % 2 === 0
              ? "bg-neutral-50 dark:bg-neutral-800"
              : "bg-white dark:bg-neutral-900"
          }`}
        >
          {/* Mobile Layout */}
          <div className="sm:hidden space-y-3">
            <div className="space-y-1">
              <div className="font-medium text-sm dark:text-neutral-200">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400 break-all">
                {
                  user.emailAddresses.find(
                    (email) => email.id === user.primaryEmailAddressId
                  )?.emailAddress
                }
              </div>
              <div className="text-xs px-2 py-1 bg-neutral-200 dark:bg-neutral-700 rounded-md inline-block">
                <span className="dark:text-neutral-200">
                  {user.publicMetadata.role as string}
                </span>
              </div>
            </div>

            {isSuperAdmin && (
              <div className="flex flex-col gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-700">
                <form action={setRole} className="flex gap-2 items-center">
                  <input type="hidden" value={user.id} name="id" />
                  <Select
                    name="role"
                    defaultValue={user.publicMetadata.role as string}
                  >
                    <SelectTrigger className="flex-1 h-8 text-xs">
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
                    className="px-3 py-1 text-xs border border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700 whitespace-nowrap"
                  >
                    Change
                  </Button>
                </form>
                <form action={removeRole}>
                  <input type="hidden" value={user.id} name="id" />
                  <Button
                    type="submit"
                    size="sm"
                    variant="outline"
                    className="w-full px-3 py-1 text-xs border border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700"
                  >
                    Remove Role
                  </Button>
                </form>
              </div>
            )}
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-between gap-4">
            <div className="flex gap-4 lg:gap-8 flex-1 min-w-0">
              <div className="dark:text-neutral-200 font-medium whitespace-nowrap">
                {user.firstName} {user.lastName}
              </div>
              <div className="dark:text-neutral-200 text-sm truncate">
                {
                  user.emailAddresses.find(
                    (email) => email.id === user.primaryEmailAddressId
                  )?.emailAddress
                }
              </div>
              <div className="dark:text-neutral-200 text-sm">
                {user.publicMetadata.role as string}
              </div>
            </div>

            {isSuperAdmin && (
              <div className="flex gap-2 flex-shrink-0">
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
                    className="px-2 py-1 text-xs border border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700 whitespace-nowrap"
                  >
                    Change Role
                  </Button>
                </form>
                <form action={removeRole}>
                  <input type="hidden" value={user.id} name="id" />
                  <Button
                    type="submit"
                    size="sm"
                    variant="outline"
                    className="px-2 py-1 text-xs border border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700 whitespace-nowrap"
                  >
                    Remove Role
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
