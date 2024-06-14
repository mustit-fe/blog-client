import { FormEventHandler, useCallback, useState } from 'react';
import { Division, SignupDto } from '@/app/_constants/types/types';
import API from '@/app/_lib/fetcher/fetcher';
import useOverlay from '@/app/_lib/overlay/useOverlay';
import Dim from './Dim';
import LoginForm from './LoginForm';
import { PASSWORD_PLACEHOLDER } from '@/app/_constants/constant/validation';
import Overlay from '@/app/_components/common/Overlay';
import classNames from 'classnames';
// import { sendEmail } from '@/app/_lib/utils/server/email';

interface Props {
  isOpen: boolean;
  close: () => void;
  exit: () => void;
}
function SignupForm(  { isOpen, close }: Props) {
  const [form, setForm] = useState<SignupDto>({
    email: '',
    password: '',
    division: 'frontend',
  });
  const [emailVerification, setEmailVerification] = useState<{isSent: boolean, isDone: boolean}>({
    isSent: false,
    isDone: false
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

  const verifyEmail = async () => {
    // const isSuccess = await sendEmail(form.email);
    // if(!isSuccess) {
    //   setError('머스트잇 임직원 이메일 인증이 필요합니다.')
    // }
    setEmailVerification({isSent: true, isDone: false});
  }

  const buttonClasses = classNames("bg-mustitRed min-w-12 h-10 text-white font-bold");

  const submitButtonClasses = classNames(
    buttonClasses,
    {'bg-themeGray-100': emailVerification.isDone && emailVerification.isSent}
  )

  return (
   <Overlay isOpen={isOpen}>
      <Overlay.Title>회원가입</Overlay.Title>
      <Overlay.Description>회원가입 시 머스트잇 임직원 이메일 인증이 필요합니다.</Overlay.Description>
      <Overlay.Content>
        <form action="" className="flex flex-col gap-2 w-5/6" onSubmit={onSubmit}>
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
          <div className='flex gap-1'>
            <input
              type="text"
              className="border border-slate-100 h-10 text-md outline-none px-2 grow"
              placeholder="머스트잇 이메일을 입력해주세요."
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              value={form.email}
            />
            <button type="button" className={buttonClasses} onClick={verifyEmail}>인증</button>
          </div>
            {emailVerification.isSent &&
              <div className='flex gap-1'>
                <input type='text'
                       className="border border-slate-100 h-10 text-md outline-none px-2 grow"
                       placeholder="이메일로 발송된 인증번호를 입력해주세요." minLength={6} maxLength={6}
                />
                <button type='button' className={buttonClasses} onClick={() => setEmailVerification(prevState => ({...prevState, isDone: true}))}>확인</button>
              </div>
            }
          <input
            type="password"
            className="border border-slate-100 h-10 text-md outline-none px-2"
            placeholder={PASSWORD_PLACEHOLDER}
            onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
            value={form.password}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className={submitButtonClasses} disabled={!emailVerification.isSent || !emailVerification.isDone}
          >
            회원가입
          </button>
        </form>
      </Overlay.Content>
    </Overlay>
  );
}

export default SignupForm;
