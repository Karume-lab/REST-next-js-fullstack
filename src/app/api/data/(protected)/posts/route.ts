import { validateRequest } from "@/lib/lucia";
import prisma from "@/lib/prisma";

export const GET = async () => {
  try {
    // const { user } = await validateRequest();
    // if (!user) {
    //   return Response.json({ message: "Unauthorized" }, { status: 401 });
    // }

    const tasks = await prisma.task.findMany();

    return Response.json(tasks);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};
