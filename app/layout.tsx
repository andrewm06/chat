import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lime Window Cleaning | Lime Membership Quotes",
  description:
    "Get a Lime Membership quote, choose your plan, and schedule your cleaning with Lime Window Cleaning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} bg-lime-25 text-lime-950 antialiased`}>
        {children}
      </body>
    </html>
  );
}
