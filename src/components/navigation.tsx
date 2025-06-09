"use client";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Navigation = () => {
  const { isLoaded, user } = useUser();
  const pathname = usePathname();
  const isAdmin =
    user?.publicMetadata?.role === "admin" ||
    user?.publicMetadata?.role === "super-admin";
  const isOnAdminPage = pathname.startsWith("/admin");

  return (
    <nav className="bg-[var(--background)] border-b border-[var(--foreground)]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-[var(--foreground)]">
              File Upload Thing + RBAC
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {!isLoaded ? (
              <div className="w-20 h-8 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded"></div>
            ) : (
              <>
                {isAdmin &&
                  (isOnAdminPage ? (
                    <Link href="/dashboard">
                      <Button
                        variant="outline"
                        className="rounded-md border border-neutral-300 dark:border-neutral-600 text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 shadow-sm transition"
                      >
                        Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/admin">
                      <Button
                        variant="outline"
                        className="rounded-md border border-neutral-300 dark:border-neutral-600 text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 shadow-sm transition"
                      >
                        Manage Users
                      </Button>
                    </Link>
                  ))}
                <SignedOut>
                  <SignInButton>
                    <Button
                      variant="outline"
                      className="rounded-md border border-neutral-300 dark:border-neutral-600 text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 shadow-sm transition"
                    >
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button
                      variant="outline"
                      className="rounded-md border border-neutral-300 dark:border-neutral-600 text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 shadow-sm transition"
                    >
                      Sign Up
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                  <SignOutButton>
                    <Button
                      variant="outline"
                      className="cursor-pointer text-sm rounded-md border border-neutral-300 dark:border-neutral-600 text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 shadow-sm transition"
                    >
                      Sign Out
                    </Button>
                  </SignOutButton>
                </SignedIn>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
