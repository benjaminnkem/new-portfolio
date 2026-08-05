import type { Metadata } from "next";
import "../public/globals.css";
import { dmSans } from "@/lib/utils/fonts";
import Providers from "@/lib/providers";

export const metadata: Metadata = {
  title: "Benjamin Nkem (Tochison)",
  description: "Hi, I'm Benjamin Nkem (Tochison), a Software Engineer with 5 years of experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${dmSans.className} dark:bg-black-main text-cWhite`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
