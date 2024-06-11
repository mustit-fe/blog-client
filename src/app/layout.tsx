import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import Provider from './_components/common/Provider';

import './globals.css';

export const metadata: Metadata = {
  title: '머스트잇 FE TECH Blog',
  description: '머스트잇 FE 기술블로그 입니다.',
  robots: 'index, follow',
  openGraph: {
    title: '머스트잇 FE TECH Blog',
    siteName: '머스트잇 FE TECH Blog',
    locale: 'ko_KR',
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="kr">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
