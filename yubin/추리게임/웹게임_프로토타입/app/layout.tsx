import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://last-cabin-detective.workspace-815047.chatgpt.site'),
  title: '마지막 객실의 탐정',
  description: '1897년 런던행 열차에서 벌어진 선택형 미스터리 게임',
  openGraph: {
    title: '마지막 객실의 탐정',
    description: '멈춘 시계, 잠긴 객실, 그리고 기억나지 않는 40분.',
    images: ['/og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '마지막 객실의 탐정',
    description: '멈춘 시계, 잠긴 객실, 그리고 기억나지 않는 40분.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
