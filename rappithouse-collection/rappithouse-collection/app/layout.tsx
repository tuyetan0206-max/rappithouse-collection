import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Rappit House', description: 'Tra cứu và quản lý bộ sưu tập hoa Rappit House' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="vi"><body>{children}</body></html>;
}
