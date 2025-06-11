import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { ROLES_ENUM } from "@/types/roles";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { userId, sessionClaims } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const userRoles = sessionClaims?.metadata?.role as string[] | undefined;
  const isSuperAdmin = userRoles?.includes(ROLES_ENUM.SUPER_ADMIN) ?? false;

  try {
    let files;
    if (isSuperAdmin) {
      files = await prisma.file.findMany({
        include: { user: true },
      });
    } else {
      files = await prisma.file.findMany({
        where: { user: { clerkId: userId } },
      });
    }

    return NextResponse.json({ files }, { status: 200 });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { message: "Error retrieving files" },
      { status: 500 }
    );
  }
}
