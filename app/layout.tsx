import "./globals.css";

export const metadata = {
  title: "Tools | DrWan",
  description: "Simple health tools for educational use."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
