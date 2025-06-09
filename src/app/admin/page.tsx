import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";
import AdminUserList from "./AdminUserList";
import { ROLES_ENUM } from "@/types/roles";

export default async function Admin() {
  const client = await clerkClient();
  const users = (await client.users.getUserList()).data;

  const { userId } = await auth();
  const safeUsers = users.map((u) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    publicMetadata: u.publicMetadata,
    primaryEmailAddressId: u.primaryEmailAddressId,
    emailAddresses: u.emailAddresses.map((e: any) => ({
      id: e.id,
      emailAddress: e.emailAddress,
    })),
  }));
  const safeCurrentUser = safeUsers.find((u) => u.id === userId);
  const isSuperAdmin = safeCurrentUser?.publicMetadata.role === ROLES_ENUM.SUPER_ADMIN;

  return <AdminUserList users={safeUsers} isSuperAdmin={isSuperAdmin} />;
}
