import "./globals.css";

export const metadata = {
  title: "Moda Store",
  description: "Local Fashion Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen w-full">
        {children}
      </body>
    </html>
  );
}