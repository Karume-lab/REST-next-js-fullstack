"use client";
import React from "react";
import { Button } from "../ui/button";
import { signOut } from "@/app/(pages)/auth/action";

interface SignOutProps {
  children: React.ReactNode;
}

const SignOut: React.FC<SignOutProps> = ({ children }) => {
  return (
    <Button
      onClick={() => {
        signOut();
      }}
    >
      {children}
    </Button>
  );
};

export default SignOut;
