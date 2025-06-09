export {};

export type Roles = "super-admin" | "admin" | "manager" | "user" | "guest";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
