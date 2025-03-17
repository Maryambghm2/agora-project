import type { Metadata } from "next";
import "./globals.css";
import Providers from "../Providers";

export const metadata: Metadata = {
  title: "Agora Community",
  description: "Plateform d'entraide Agora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Agdasima:wght@400;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
      <Providers>{children}</Providers> 
      </body>
    </html>
  );
}