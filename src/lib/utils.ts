import { UserRole } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { User } from "lucia";
import { cache } from "react";
import { twMerge } from "tailwind-merge";
import prisma from "./prisma";
import { notFound } from "next/navigation";
import { validateRequest } from "./lucia";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isAdminOrOwner = (user: User, entityId?: string) => {
  return user.role === UserRole.ADMIN || user.id === entityId;
};

export const checkAuthorization = async () => {
  const { user } = await validateRequest();
  if (!user) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  if (!isAdminOrOwner(user)) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  return user;
};

export const getTask = cache(async (taskId: string) => {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!task) {
    notFound();
  }

  return task;
});
