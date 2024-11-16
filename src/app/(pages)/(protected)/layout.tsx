import { SessionProvider } from "@/providers/SessionProvider";
import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { urls } from "@/lib/urls";
import SignOut from "@/components/auth/SignOutButton";
import { SharedLayout } from "@/layouts";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();
  if (!session.user) {
    redirect(urls.AUTH);
  }

  return (
    <SharedLayout>
      <SessionProvider value={session}>
        <SignOut>Sign out</SignOut>
        {children}
      </SessionProvider>
    </SharedLayout>
  );
}
