import { checkAuthorization } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  const user = await checkAuthorization();

  console.log("reached");
  return NextResponse.json({ message: "Hello World" });
};
