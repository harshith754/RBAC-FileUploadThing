"use client";
import { setRole, removeRole } from "./actions";
import { ROLES } from "@/types/roles";

interface AdminUserListProps {
  users: any[];
  isSuperAdmin: boolean;
}

export default function AdminUserList({ users, isSuperAdmin }: AdminUserListProps) {
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
                  (email: any) => email.id === user.primaryEmailAddressId
                )?.emailAddress
              }
            </div>
            <div className="dark:text-neutral-200">
              {user.publicMetadata.role as string}
            </div>
          </div>
          <div className="flex gap-2">
            {isSuperAdmin &&
              ROLES.map((role) => (
                <form action={setRole} className="inline" key={role}>
                  <input type="hidden" value={user.id} name="id" />
                  <input type="hidden" value={role} name="role" />
                  <button
                    type="submit"
                    className="px-2 py-1 text-sm border border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700"
                  >
                    Make {role.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </button>
                </form>
              ))}
            {isSuperAdmin && (
              <form action={removeRole} className="inline">
                <input type="hidden" value={user.id} name="id" />
                <button
                  type="submit"
                  className="px-2 py-1 text-sm border border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700"
                >
                  Remove Role
                </button>
              </form>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
