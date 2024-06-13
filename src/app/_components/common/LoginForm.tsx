'use client';

import useOverlay from '@/app/_lib/overlay/useOverlay';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { FormEventHandler, useCallback, useState } from 'react';
import { LoginDto } from '@/app/_constants/types/types';
import API from '@/app/_lib/fetcher/fetcher';
import Dim from './Dim';
import SignupForm from './SignupForm';

const loginVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.7,
    left: '50%',
    top: '50%',
    translateX: '-50%',
    translateY: '-50%',
  },
  animate: {
    opacity: 1,
    scale: 1,
    left: '50%',
    top: '50%',
    translateX: '-50%',
    translateY: '-50%',
  },
  exit: () => ({
    opacity: 0,
    scale: 0.7,
    left: '50%',
    top: '50%',
    translateX: '-50%',
    translateY: '-50%',
    transition: { duration: 0.1 },
  }),
};

interface Props {
  isOpen: boolean;
  close: () => void;
  exit: () => void;
}
function LoginForm({ isOpen, close }: Props) {
  const [form, setForm] = useState<LoginDto>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const overlay = useOverlay();
  const dim = useOverlay();

  const openSignup = useCallback(() => {
    close();
    dim.open(({ isOpen: DimOpen, close: DimClose, exit: DimExit }) => (
      <Dim
        isOpen={DimOpen}
        onClose={() => {
          overlay.close();
          DimClose();
        }}
        exit={DimExit}
      />
    ));
    overlay.open(({ isOpen: SignupOpen, close: SignupClose, exit: SignupExit }) => (
      <SignupForm
        isOpen={SignupOpen}
        close={() => {
          SignupClose();
          dim.close();
        }}
        exit={SignupExit}
      />
    ));
  }, [overlay, dim, close]);

  const onSubmit: FormEventHandler = useCallback(
    async e => {
      e.preventDefault();
      const response = await API.login(form.username, form.password);
      if (response.data?.username) return close();
      return setError(response.message);
    },
    [form, close]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={loginVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
          className="fixed w-full max-w-[450px] h-[400px] flex flex-col justify-center items-center rounded-2xl gap-8 bg-white shadow-lg z-50 p-8"
        >
          <h2 className="font-bold text-2xl">로그인</h2>
          <p>회원가입 및 로그인은 머스트잇 임직원만 가능합니다.</p>
          <form action="" className="flex flex-col gap-2 w-3/4" onSubmit={onSubmit}>
            <input
              type="text"
              className="border border-slate-100 h-10 text-md outline-none px-2"
              placeholder="@mustit.co.kr을 빼고 입력해주세요."
              minLength={4}
              onFocus={() => setError(null)}
              onChange={e => setForm(prev => ({ ...prev, username: e.target.value }))}
              value={form.username}
              autoComplete="username"
              required
            />
            <input
              type="password"
              className="border border-slate-100 h-10 text-md outline-none px-2"
              autoComplete={'current-password'}
              placeholder="8글자 이상의 비밀번호를 입력해주세요."
              minLength={8}
              onFocus={() => setError(null)}
              onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
              value={form.password}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="bg-mustitRed w-full text-white h-10 mt-4">
              로그인
            </button>
            <button type="button" className="bg-mustitBlack w-full text-white h-10" onClick={openSignup}>
              회원가입
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoginForm;
