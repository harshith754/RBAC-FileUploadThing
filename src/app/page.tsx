import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const { userId } = await auth();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white dark:from-neutral-900 dark:to-neutral-950">
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-10 flex flex-col items-center gap-6 border border-neutral-200 dark:border-neutral-800">
        <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-300 mb-2">
          Welcome to FileUpload RBAC Demo
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-4 text-center max-w-xl">
          This is a demo application for role-based access control and file
          uploads. Sign in to access your dashboard, or explore the landing page
          as a guest.
        </p>
        {userId ? (
          <Button asChild variant="default">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        ) : (
          <div className="flex gap-4">
            <Button asChild variant="default">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild variant="default">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
