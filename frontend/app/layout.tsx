import { Golos_Text } from "next/font/google";
import "./app.css";

const fontSans = Golos_Text({
  variable: "--font-sans",
  subsets: ["latin"],
});

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
