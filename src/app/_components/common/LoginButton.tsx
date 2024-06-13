'use client';

import useOverlay from '@/app/_lib/overlay/useOverlay';
import { useCallback, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { BLOG_USER_NAME } from '@/app/_constants/constant/constant';
import Link from 'next/link';
import LoginForm from './LoginForm';
import Dim from './Dim';
import { useRouter } from 'next/navigation';
import API from '@/app/_lib/fetcher/fetcher';
import classNames from 'classnames';

export default function LoginButton({ classes }: { classes?: string }) {
  const router = useRouter();

  const overlay = useOverlay();
  const dim = useOverlay();
  const [cookie, _] = useCookies([BLOG_USER_NAME]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const openLogin = useCallback(() => {
    dim.open(({ isOpen, close, exit }) => (
      <Dim
        isOpen={isOpen}
        onClose={() => {
          overlay.close();
          close();
        }}
        exit={exit}
      />
    ));
    overlay.open(({ isOpen, close, exit }) => (
      <LoginForm
        isOpen={isOpen}
        close={() => {
          close();
          dim.close();
        }}
        exit={() => {
          exit();
          dim.close();
        }}
      />
    ));
  }, [overlay, dim]);

  const logout = useCallback(async () => {
    const response = await API.logout();
    if (response.status === 200) {
      alert('로그아웃 되었습니다.');
      router.refresh();
    }
  }, [router]);

  if (!isClient) {
    return null;
  }
  const className = classes ? 'cursor-pointer ' + classes : 'cursor-pointer';

  return (
    <>
      {!cookie.mustit_blog_username && (
        <span className={className} onClick={openLogin}>
          로그인
        </span>
      )}
      {cookie.mustit_blog_username && (
        <>
          <Link className={classNames('px-2 py-1', classes)} href="/write">
            글쓰기
          </Link>
          <Link className={className} href="/mypage">
            마이페이지
          </Link>
          <button className={className} onClick={logout}>
            로그아웃
          </button>
        </>
      )}
    </>
  );
}
