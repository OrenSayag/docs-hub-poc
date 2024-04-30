import './global.css';

export const metadata = {
  title: 'docs-hub',
  description: 'Documentation system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
