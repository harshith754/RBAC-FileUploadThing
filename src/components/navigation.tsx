"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { ROLES_ENUM } from "@/types/roles";

const BUTTON_STYLES =
  "w-full md:w-auto rounded-md border border-neutral-300 dark:border-neutral-600 text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 shadow-sm transition text-sm py-2 px-3 md:text-base md:py-2.5 md:px-4";

export const Navigation = () => {
  const { isLoaded, user } = useUser();
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const isAdmin = [ROLES_ENUM.ADMIN, ROLES_ENUM.SUPER_ADMIN].includes(
    user?.publicMetadata?.role as ROLES_ENUM
  );
  const isOnAdminPage = pathname?.startsWith("/admin") ?? false;
  const isOnSignInPage = pathname === "/sign-in";
  const isOnSignUpPage = pathname === "/sign-up";

  const closeSheet = () => setIsSheetOpen(false);

  const AdminNavLink = () => {
    if (!isAdmin) return null;

    const href = isOnAdminPage ? "/dashboard" : "/admin";
    const label = isOnAdminPage ? "Dashboard" : "Manage Users";

    return (
      <Link href={href} onClick={closeSheet}>
        <Button variant="outline" className={BUTTON_STYLES}>
          {label}
        </Button>
      </Link>
    );
  };

  const AuthButtons = () => (
    <>
      <SignedOut>
        {!isOnSignInPage && (
          <SignInButton>
            <Button variant="outline" className={BUTTON_STYLES}>
              Sign In
            </Button>
          </SignInButton>
        )}
        {!isOnSignUpPage && (
          <SignUpButton>
            <Button variant="outline" className={BUTTON_STYLES}>
              Sign Up
            </Button>
          </SignUpButton>
        )}
      </SignedOut>

      <SignedIn>
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
          <UserButton />
          <SignOutButton>
            <Button variant="outline" className={BUTTON_STYLES}>
              Sign Out
            </Button>
          </SignOutButton>
        </div>
      </SignedIn>
    </>
  );

  const NavigationContent = () => {
    if (!isLoaded) {
      return (
        <div className="w-20 h-8 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded" />
      );
    }

    return (
      <>
        <AdminNavLink />
        <AuthButtons />
      </>
    );
  };

  const MobileSheet = () => (
    <div className="md:hidden flex items-center">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-72 sm:w-80 flex flex-col gap-4 pt-12 px-6"
        >
          <SheetHeader>
            <VisuallyHidden>
              <SheetTitle>Navigation Menu</SheetTitle>
            </VisuallyHidden>
          </SheetHeader>
          <div className="flex flex-col gap-3">
            <NavigationContent />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );

  return (
    <nav className="bg-[var(--background)] border-b border-[var(--foreground)]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-[var(--foreground)]">
              File Upload Thing + RBAC
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <NavigationContent />
          </div>

          {/* Mobile Navigation */}
          <MobileSheet />
        </div>
      </div>
    </nav>
  );
};
