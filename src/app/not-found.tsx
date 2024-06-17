'use client';
import { useEffect } from 'react';
import Warning from '@/app/_components/common/Warning';

export default function NotFound() {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  });

  return (
    <Warning
      title="존재하지 않는 페이지입니다."
      content={Content}
      buttonText="메인으로 돌아가기"
      buttonHref="/"
      classes="mt-24"
    />
  );
}

const Content = (
  <article className="flex flex-col items-center gap-8">
    <span>3초 후 메인으로 돌아갑니다.</span>
  </article>
);
