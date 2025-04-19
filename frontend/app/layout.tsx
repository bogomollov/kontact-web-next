import { Golos_Text } from "next/font/google";
import "./app.css";
import { Metadata } from "next";

const fontSans = Golos_Text({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "kontact web",
  description:
    "Современный корпоративный веб-мессенджер. Безопасные чаты, групповые обсуждения, файлообмен и интеграция с корпоративными системами",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${fontSans.className} antialiased`}>{children}</body>
    </html>
  );
}
