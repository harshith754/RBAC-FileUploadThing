"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { UploadQueueItem } from "@/types/file-upload";
import { ROLES_ENUM } from "@/types/roles";

export async function getUserFiles(): Promise<UploadQueueItem[]> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const files = await prisma.file.findMany({
    where: { user: { clerkId: userId } },
  });

  return files.map((file) => ({
    id: Math.random().toString(36).substr(2, 9),
    backendId: file.id.toString(),
    file: new File([], file.name),
    name: file.name,
    status: "completed",
    progress: 100,
    errors: [],
    url: file.url,
    message: "Previously uploaded",
  }));
}

export async function getAllFiles(): Promise<UploadQueueItem[]> {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const roles = sessionClaims?.metadata?.role as string[] | string | undefined;
  const userRoles = Array.isArray(roles) ? roles : [roles].filter(Boolean);
  const isAdmin =
    userRoles.includes(ROLES_ENUM.ADMIN) ||
    userRoles.includes(ROLES_ENUM.SUPER_ADMIN);

  const files = await prisma.file.findMany({
    where: isAdmin ? {} : { user: { clerkId: userId } },
  });

  return files.map((file) => ({
    id: Math.random().toString(36).substr(2, 9),
    backendId: file.id.toString(),
    file: new File([], file.name),
    name: file.name,
    status: "completed",
    progress: 100,
    errors: [],
    url: file.url,
    message: "Previously uploaded",
  }));
}
