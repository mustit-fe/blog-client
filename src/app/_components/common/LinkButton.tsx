import Link from 'next/link';
import { ReactNode } from 'react';
import classNames from 'classnames';

// TODO: 컬러 변경 가능하게 props 추가
function LinkButton({ href, classes, children }: { href: string; classes?: string; children: ReactNode }) {
  const _classes = classNames(classes, 'm-2 p-2 rounded-md border font-bold');

  return (
    <button className={_classes}>
      <Link href={href}>{children}</Link>
    </button>
  );
}

export default LinkButton;
