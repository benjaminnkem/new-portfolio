import type { Metadata } from "next";
import "../public/globals.css";
import { dmSans } from "@/lib/utils/fonts";

export const metadata: Metadata = {
  title: "Benjamin Nkem",
  description: "Hi, I'm Benjamin Nkem, a Fullstack Web Developer with 5 years of experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
