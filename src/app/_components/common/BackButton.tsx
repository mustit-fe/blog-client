'use client';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="mb-6 text-3xl">
      <button className="text-themeBlue-500 hover:text-themeBlue-100" onClick={() => handleBack()}>
        &larr;
      </button>
    </div>
  );
}
