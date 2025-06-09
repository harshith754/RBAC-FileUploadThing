import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";
import AdminUserList from "./AdminUserList";

export default async function Admin() {
  const client = await clerkClient();
  const users = (await client.users.getUserList()).data;

  // Get current user id from session
  const { userId } = await auth();
  // Map users to plain objects for client component
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
  const isSuperAdmin = safeCurrentUser?.publicMetadata.role === "super-admin";

  return <AdminUserList users={safeUsers} isSuperAdmin={isSuperAdmin} />;
}
