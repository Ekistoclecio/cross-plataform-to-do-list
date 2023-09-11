import "../styles/global.css";
import type { Metadata } from "next";
import Providers from "@/Providers";

export const metadata: Metadata = {
  title: "Kanban To Do List",
  viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="pt-BR">
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </>
  );
}
