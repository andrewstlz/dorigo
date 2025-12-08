import "./globals.css";
import { Jua } from "next/font/google";
import Header from "@/components/Header";

const jua = Jua({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jua.className} bg-zinc-50`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
