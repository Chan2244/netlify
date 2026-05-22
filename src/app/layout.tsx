// src/app/layout.tsx
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'task-list',
  description: 'Next.js app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}