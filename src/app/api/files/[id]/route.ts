import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { ROLES_ENUM } from "@/types/roles";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await context.params;
  const { userId, sessionClaims } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const userRoles = sessionClaims?.metadata?.role as string[] | undefined;
  const isAdmin =
    (userRoles?.includes(ROLES_ENUM.ADMIN) ||
      userRoles?.includes(ROLES_ENUM.SUPER_ADMIN)) ??
    false;

  const fileId = parseInt(id, 10);
  if (isNaN(fileId)) {
    return NextResponse.json({ message: "Invalid file ID" }, { status: 400 });
  }

  try {
    const file = await prisma.file.findUnique({
      where: { id: fileId },
      include: { user: true },
    });

    if (!file) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    if (!isAdmin && file.user.clerkId !== userId) {
      return NextResponse.json(
        { message: "Not authorized to delete this file" },
        { status: 403 }
      );
    }

    const publicId = file.url.split("/").pop()?.split(".")[0];
    if (publicId) {
      await cloudinary.uploader.destroy(`file-upload-thing/${publicId}`);
    }

    await prisma.file.delete({
      where: { id: fileId },
    });

    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { message: "Error deleting file" },
      { status: 500 }
    );
  }
}
