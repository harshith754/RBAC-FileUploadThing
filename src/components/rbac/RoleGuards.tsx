import React from "react";
import { ROLES_ENUM } from "@/types/roles";
import type { AdminUser } from "@/types/roles";

export function AdminOnly({
  user,
  children,
}: {
  user: AdminUser | null | undefined;
  children: React.ReactNode;
}) {
  if (user?.publicMetadata?.role === ROLES_ENUM.ADMIN) {
    return <>{children}</>;
  }
  return null;
}

export function SuperAdminOnly({
  user,
  children,
}: {
  user: AdminUser | null | undefined;
  children: React.ReactNode;
}) {
  if (user?.publicMetadata?.role === ROLES_ENUM.SUPER_ADMIN) {
    return <>{children}</>;
  }
  return null;
}

export function UserOnly({
  user,
  children,
}: {
  user: AdminUser | null | undefined;
  children: React.ReactNode;
}) {
  if (user?.publicMetadata?.role === ROLES_ENUM.USER) {
    return <>{children}</>;
  }
  return null;
}
