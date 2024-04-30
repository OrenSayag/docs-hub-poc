'use client';

import '@docs-hub/ui/preset';
import { ThemeProvider } from '../components/providers/theme-provider';
import { ModeToggle } from '@docs-hub/ui/components';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="fixed bottom-2 left-2">
            <ModeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
