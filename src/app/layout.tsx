import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { styles } from "@/lib/styles";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Marketplace Example",
  description: "Authentication free example with Next.js",
};

const font = Poppins({
  subsets: ["latin"],
  weight: ['600']
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="en" className="h-full">
        <body className={cn('relative h-full antialiased bg-background light', inter.className, font.className)}>
          <main className="flex flex-col relative min-h-screen">
            <Navbar user={session?.user || null} />
              {children}
          </main>
          <Toaster />
        </body>
      </html>
    </SessionProvider>

  );
}
