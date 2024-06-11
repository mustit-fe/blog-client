import { PropsWithChildren } from 'react';
import CommonContainer from '../_components/common/CommonContainer';

export default function ContactLayout({ children }: PropsWithChildren) {
  return (
    <CommonContainer header footer>
      {children}
    </CommonContainer>
  );
}
