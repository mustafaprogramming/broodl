import {Fugaz_One, Open_Sans} from "next/font/google";
import Link from "next/link";
import Head from "./head";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import Logout from "@/components/Logout";

const OpenSans= Open_Sans({ subsets: ["latin"] })
const fugaz= Fugaz_One({ subsets: ["latin"], weight: ['400'] })

export const metadata = {
  title: "Broodl",
  description: "Track your daily mood every day of the year1",
};

export default function RootLayout({ children }) {
  const header=(
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={'/'}>
        <h1 className={`${fugaz.className} text-base sm:text-lg text-gradient`}>Broodl</h1>
      </Link>
      <Logout />
    </header>
  );
  const footer=(
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={`${fugaz.className} text-indigo-500`}>
        Created with 💛
      </p>
    </footer>
  );
  return (
    <html lang="en">
      <Head/>
      <AuthProvider>
        <body
          className={`${OpenSans.className} w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800`}
        >
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
