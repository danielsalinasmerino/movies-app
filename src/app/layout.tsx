import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/components/header/header";
import { ReactQueryProvider } from "@/utils/react-query";
import { ReactReduxProvider } from "@/utils/react-redux";

import "./globals.css";
import "./reset.css";

// TODO: Add dependabot https://docs.github.com/en/code-security/dependabot/dependabot-version-updates
// TODO: Improve this layout.tsx
// TODO: Change favicon
// TODO: Atomic components ?
// TODO: Responsive!

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Own TMDB",
  description: "Next React App that serves TMDB content",
  keywords: "Next.js, React, App, TMDB, Frontend, Typescript",
  authors: [
    {
      name: "Daniel Salinas Merino",
      url: "https://www.linkedin.com/in/danielsalinasmerino/",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactReduxProvider>
          <ReactQueryProvider>
            <Header />
            {children}
          </ReactQueryProvider>
        </ReactReduxProvider>
      </body>
    </html>
  );
}
