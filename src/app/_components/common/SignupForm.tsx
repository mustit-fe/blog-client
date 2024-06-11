import { Division, SignupDto } from '@/app/_constants/types/types';
import API from '@/app/_lib/fetcher/fetcher';
import useOverlay from '@/app/_lib/overlay/useOverlay';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { FormEventHandler, useCallback, useState } from 'react';
import Dim from './Dim';
import LoginForm from './LoginForm';

const signupVariants: Variants = {
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

function SignupForm({ isOpen, close }: Props) {
  const [form, setForm] = useState<SignupDto>({
    email: '',
    password: '',
    division: 'frontend',
  });
  const [error, setError] = useState<string | null>(null);

  const overlay = useOverlay();
  const dim = useOverlay();

  const onSubmit: FormEventHandler = useCallback(
    async e => {
      e.preventDefault();
      const response = await API.signup(form.email, form.password, form.division);
      if (response.data.email === form.email) {
        close();
        alert('회원가입이 완료되었습니다.');
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
        overlay.open(({ isOpen: OverlayOpen, close: OverlayClose, exit: OverlayExit }) => (
          <LoginForm
            isOpen={OverlayOpen}
            close={() => {
              dim.close();
              OverlayClose();
            }}
            exit={OverlayExit}
          />
        ));
      } else {
        setError(response.message);
      }
    },
    [form, overlay, close, dim]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={signupVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
          className="fixed w-full max-w-[350px] h-[350px] flex flex-col justify-center items-center rounded-sm gap-8 bg-white shadow-lg z-50"
        >
          <h2 className="font-bold text-2xl">회원가입</h2>
          <form action="" className="flex flex-col gap-2 w-3/4" onSubmit={onSubmit}>
            <div className="flex gap-2">
              <label
                htmlFor="division"
                className="flex justify-center items-center rounded-sm bg-mustitBlack text-white w-14 h-8"
              >
                소속
              </label>
              <select
                id="division"
                className="w-full border border-slate-200 font-bold px-1"
                value={form.division}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    division: e.target.value as Division,
                  }))
                }
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="devops">DevOps</option>
                <option value="mobile">Mobile</option>
              </select>
            </div>

            <input
              type="text"
              className="border border-slate-100 h-10 text-md outline-none px-2"
              placeholder="머스트잇 이메일을 입력해주세요."
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              value={form.email}
            />
            <input
              type="password"
              className="border border-slate-100 h-10 text-md outline-none px-2"
              placeholder="password"
              onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
              value={form.password}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="bg-mustitRed w-full text-white h-10">
              회원가입
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SignupForm;
