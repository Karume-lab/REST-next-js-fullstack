import SignOut from "@/components/auth/SignOutButton";
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/auth");
  }
  return (
    <div>
      {user.email}
      <SignOut>Sign out</SignOut>
    </div>
  );
};

export default Home;
