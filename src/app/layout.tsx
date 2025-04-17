import '@app/styles/globals.css';

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
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Hand Crafted Haven',
    default: 'Hand Crafted Haven',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};