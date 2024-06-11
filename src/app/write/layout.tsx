import { PropsWithChildren } from 'react';
import CommonContainer from '../_components/common/CommonContainer';

export default function WriteLayout({ children }: PropsWithChildren) {
  return <CommonContainer header>{children}</CommonContainer>;
}
