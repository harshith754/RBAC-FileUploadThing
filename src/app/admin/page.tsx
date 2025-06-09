import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const isAdmin = await checkRole("admin");
  const isSuperAdmin = await checkRole("super-admin");
  if (!isAdmin && !isSuperAdmin) {
    redirect("/");
  }

  return (
    <p>
      This is the protected admin dashboard restricted to users with the `admin`
      or `super-admin` role.
    </p>
  );
}
