'use client';

import Link from 'next/link';
import classNames from 'classnames';
import LoginButton from '@/app/_components/common/LoginButton';
// import { useEffect, useState } from 'react';

export default function Footer() {
  const ulClasses = classNames('flex gap-x-2');
  const strongClasses = classNames('font-bold text-themeBlue-500 w-32');
  const linkClasses = classNames('w-24 text-themeBlue-100 hover:font-semibold');

  // const [isFullContent, setIsFullContent] = useState(false);

  // useEffect(() => {
  //   const main = document.querySelector('main');
  //
  //   if (main) {
  //     const mainHeight = main.clientHeight;
  //     if (mainHeight + 350 < window.innerHeight) {
  //       setIsFullContent(false);
  //     } else {
  //       setIsFullContent(true);
  //     }
  //   }
  // }, []);

  return (
    <footer
      // className={`${!isFullContent ? 'fixed bottom-0' : ''} flex flex-col space-y-8 w-full h-max pt-20 px-8 pb-16 sm:pb-24`}
      className={`flex flex-col space-y-8 w-full h-max pt-20 px-8 pb-16 sm:pb-24`}
    >
      <nav className="flex flex-col gap-y-2">
        <section className={ulClasses}>
          <strong className={strongClasses}>머스트잇 테크</strong>
          <Link className={linkClasses} href="/contact">
            의견 보내기
          </Link>
        </section>
        <section className={ulClasses}>
          <strong className={strongClasses}>머스트잇</strong>
          <Link className={linkClasses} href="https://corp.mustit.co.kr/">
            홈페이지
          </Link>
          <Link
            className={linkClasses}
            href="https://mustit-recruit.notion.site/We-re-Hiring-68cd43fa18f44f91817a639d3d59aa9e"
          >
            채용
          </Link>
          <LoginButton classes={linkClasses} />
        </section>
      </nav>
      <div className="flex flex-col gap-y-1">
        <strong className="text-themeBlue-500">(주)머스트잇</strong>
        <p className="text-themeGray-300 font-light">Copyright © MUST&apos;IT. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
