import "./../styles/globals.css";
import { Fira_Sans } from "next/font/google";
const firaSans = Fira_Sans({
  weight: ["200", "400", "700"],
  subsets: ["latin"],
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={`${firaSans.className}`}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
