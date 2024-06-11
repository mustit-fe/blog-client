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

export default function LoginButton() {
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

  return (
    <>
      {!cookie.mustit_blog_username && (
        <span onClick={openLogin} className="cursor-pointer">
          로그인
        </span>
      )}
      {cookie.mustit_blog_username && (
        <div className="flex gap-2 items-center">
          <Link href="/write" className="px-2 py-1">
            글쓰기
          </Link>
          <span className="cursor-pointer" onClick={() => router.push('/mypage')}>
            <strong>{cookie.mustit_blog_username}</strong> 님
          </span>
          <button className="cursor-pointer" onClick={logout}>
            로그아웃
          </button>
        </div>
      )}
    </>
  );
}
