import { Task, UserRole } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { User } from "lucia";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isAdminOrOwner = (user: User, entityId: string) => {
  return user.role === UserRole.ADMIN || user.id === entityId;
};
