import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Root layout only renders children - html/body are in [locale]/layout.tsx
  return children;
}
