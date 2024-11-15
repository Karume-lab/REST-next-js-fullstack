import SignOut from "@/components/auth/SignOutButton";
import { getUser } from "@/lib/lucia";
import { urls } from "@/lib/urls";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
  const user = await getUser();
  if (!user) {
    redirect(urls.AUTH);
  }
  return (
    <div>
      {user.email}
      <SignOut>Sign out</SignOut>
    </div>
  );
};

export default Home;
