import CommonContainer from '@/app/_components/common/CommonContainer';
import { PropsWithChildren } from 'react';

export default function SearchLayout({ children }: PropsWithChildren) {
  return <CommonContainer header>{children}</CommonContainer>;
}
