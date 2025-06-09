export type Roles = "super-admin" | "admin" | "manager" | "user" | "guest";

export enum ROLES_ENUM {
  SUPER_ADMIN = "super-admin",
  ADMIN = "admin",
  MANAGER = "manager",
  USER = "user",
  GUEST = "guest",
}

export const ROLES: Roles[] = [
  ROLES_ENUM.SUPER_ADMIN,
  ROLES_ENUM.ADMIN,
  ROLES_ENUM.MANAGER,
  ROLES_ENUM.USER,
  ROLES_ENUM.GUEST,
];

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}

export interface UserEmail {
  id: string;
  emailAddress: string;
}

export interface AdminUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  publicMetadata: {
    role?: Roles;
    [key: string]: unknown;
  };
  primaryEmailAddressId: string;
  emailAddresses: UserEmail[];
}
