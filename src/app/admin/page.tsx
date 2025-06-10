import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";
import AdminUserList from "@/components/admin-user-list";
import { ROLES_ENUM, AdminUser, UserEmail } from "@/types/roles";

export default async function Admin() {
  const client = await clerkClient();
  const users = (await client.users.getUserList()).data;

  const { userId } = await auth();
  const safeUsers: AdminUser[] = users.map((u) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    publicMetadata: u.publicMetadata,
    primaryEmailAddressId: u.primaryEmailAddressId || "",
    emailAddresses: u.emailAddresses.map((e: unknown) => {
      const email = e as { id: string; emailAddress: string };
      return {
        id: email.id,
        emailAddress: email.emailAddress,
      };
    }) as UserEmail[],
  }));
  const safeCurrentUser = safeUsers.find((u) => u.id === userId);
  const isSuperAdmin =
    safeCurrentUser?.publicMetadata.role === ROLES_ENUM.SUPER_ADMIN;

  return <AdminUserList users={safeUsers} isSuperAdmin={isSuperAdmin} />;
}
