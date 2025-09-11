import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/common/header";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToastInjection } from "@/lib/toast";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Vincento Pizza | Головна",
  description:
    "Замовляйте найсмачнішу піцу в місті у Vincento Pizza. Свіжі інгредієнти, італійські рецепти, швидка доставка. Спробуй смак Італії вже сьогодні!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} antialiased flex min-h-screen flex-col bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <ToastInjection />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
