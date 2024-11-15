"use server";

import { lucia } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { T_SignInSchema, T_SignUpSchema } from "@/lib/schemas";
import { error } from "console";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

export const signUp = async (values: T_SignUpSchema) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    });
    if (existingUser) {
      return { message: "User already exists", success: false };
    }

    const hashedPassword = await new Argon2id().hash(values.password);

    const user = await prisma.user.create({
      data: {
        email: values.email.toLowerCase(),
        hashPassword: hashedPassword,
      },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return {
      message:
        "Account created successfully, kindly be patient as we redirect you",
      success: true,
    };
  } catch (error) {
    return { message: "Something went wrong", success: false };
  }
};

export const signIn = async (values: T_SignInSchema) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    });
    if (!user || !user.hashPassword) {
      return { message: "Invalid email or password", success: false };
    }

    const doesPasswordMatch = await new Argon2id().verify(
      user.hashPassword,
      values.password
    );

    if (!doesPasswordMatch) {
      return { message: "Invalid email or password", success: false };
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return {
      message: "Login success, kindly be patient as we redirect you",
      success: true,
    };
  } catch (error) {
    return { message: "Something went wrong", success: false };
  }
};

export const signOut = async () => {
  const sessionCookie = await lucia.createBlankSessionCookie();

  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/auth");
};
