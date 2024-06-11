import Link from 'next/dist/client/link';
import Image from 'next/image';
import Search from './Search';
import LoginButton from './LoginButton';

export default function Header() {
  return (
    <header className="fixed left-0 top-0 h-16 w-full flex justify-center bg-white border-b z-50">
      <div className="flex justify-between items-center h-full w-full max-w-4xl px-4">
        <Link href="/" className="flex">
          <Image
            src="https://static-ux.mustit.co.kr/img/front/bi/main_logo.svg"
            alt="mustit logo"
            width="100"
            height="80"
            priority
          />
        </Link>
        <div className="flex justify-center items-center gap-4">
          <Search />
          <Link
            href="https://mustit-recruit.notion.site"
            className="border border-gray-500 text-themeBlue-500 hover:bg-themeBlue-100 hover:text-white hover:border-transparent text-md font-semibold py-1 px-4 rounded-md"
          >
            채용 공고
          </Link>
          <LoginButton />
        </div>
      </div>
    </header>
  );
}
