import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { urls } from "@/lib/urls";
import SignOut from "@/components/auth/SignOutButton";
import { SessionProvider } from "@/providers/SessionProvider";

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
    <SessionProvider value={session}>
      <div className="min-h-screen bg-background">
        <nav className="border-b">
          <div className="container mx-auto py-4 flex justify-end">
            <SignOut children="Sign out" />
          </div>
        </nav>
        <main className="container mx-auto py-4">{children}</main>
      </div>
    </SessionProvider>
  );
}
