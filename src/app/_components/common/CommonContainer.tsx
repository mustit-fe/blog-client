import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface Props {
  header?: boolean;
  footer?: boolean;
  children: ReactNode;
}
export default function CommonContainer({ header, footer, children }: Props) {
  return (
    <div className="w-full max-w-4xl mx-auto h-screen">
      {header && <Header />}
      <main className="pt-16 h-max">{children}</main>
      {footer && <Footer />}
    </div>
  );
}
