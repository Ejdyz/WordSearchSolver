import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Word Search Solver",
  description: "A simple word search solver",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen"}>
      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  );
}
