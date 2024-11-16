"use server";
import { validateRequest } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { createTaskSchema, T_CreateTaskSchema } from "@/lib/schemas";

export const createTask = async (values: T_CreateTaskSchema) => {
  //   const { user } = await validateRequest();

  //   if (!user) {
  //     throw Error("Unauthorized");
  //   }

  const { title } = createTaskSchema.parse({ ...values });

  const task = await prisma.task.create({
    data: {
      title,
    },
  });
  return task;
};
