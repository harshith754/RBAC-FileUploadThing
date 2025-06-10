import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export default async function Page() {
  const { userId }: { userId: string | null } = await auth();

  if (userId) {
    await createUserIfNeeded(userId);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white dark:from-neutral-900 dark:to-neutral-950 px-4 py-8">
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 sm:p-8 md:p-10 flex flex-col items-center gap-4 sm:gap-6 border border-neutral-200 dark:border-neutral-800 w-full max-w-2xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 dark:text-blue-300 mb-2 text-center leading-tight">
          Welcome to FileUpload RBAC Demo
        </h1>

        <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 mb-4 text-center max-w-xl leading-relaxed">
          This is a demo application for role-based access control and file
          uploads. Sign in to access your dashboard, or explore the landing page
          as a guest.
        </p>

        {userId ? (
          <Button
            asChild
            variant="default"
            className="w-full sm:w-auto min-w-[160px] h-10 sm:h-12"
          >
            <Link
              href="/dashboard"
              className="text-sm sm:text-base font-medium"
            >
              Go to Dashboard
            </Link>
          </Button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              asChild
              variant="default"
              className="w-full sm:w-auto min-w-[100px] h-10 sm:h-12"
            >
              <Link
                href="/sign-in"
                className="text-sm sm:text-base font-medium"
              >
                Sign In
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto min-w-[100px] h-10 sm:h-12"
            >
              <Link
                href="/sign-up"
                className="text-sm sm:text-base font-medium"
              >
                Sign Up
              </Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
async function createUserIfNeeded(
  userId: string
): Promise<{ success: boolean; data?: unknown; error?: string }> {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, error: "No user found" };
    }

    console.log("Creating user for ID:", userId);

    try {
      const newUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0]?.emailAddress || "",
          name:
            `${user.firstName || ""}${
              user.lastName ? " " + user.lastName : ""
            }`.trim() || "Unknown User",
        },
      });

      return { success: true, data: newUser };
    } catch (dbError) {
      if (
        typeof dbError === "object" &&
        dbError &&
        "code" in dbError &&
        (dbError as { code?: string }).code === "P2002"
      ) {
        return {
          success: false,
          error: "User with this email or clerkId already exists",
        };
      }
      throw dbError;
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      error:
        typeof error === "object" && error && "message" in error
          ? (error as { message?: string }).message || "Failed to create user"
          : "Failed to create user",
    };
  }
}
