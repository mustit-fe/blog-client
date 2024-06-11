import CommonContainer from '@/app/_components/common/CommonContainer';
import { PropsWithChildren } from 'react';

export default function ContactLayout({ children }: PropsWithChildren) {
  return (
    <CommonContainer header footer>
      {children}
    </CommonContainer>
  );
}
