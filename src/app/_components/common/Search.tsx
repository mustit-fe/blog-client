'use client';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

import { FormEventHandler, useCallback, useEffect, useRef, useState } from 'react';

export default function Search() {
  const router = useRouter();
  const [inputMode, setInputMode] = useState(false);
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit: FormEventHandler = useCallback(
    e => {
      e.preventDefault();
      if (keyword) {
        router.push(`/search/${keyword}`);
      }
    },
    [router, keyword]
  );

  useEffect(() => {
    if (inputMode) {
      inputRef.current?.focus();
    }
  }, [inputMode]);

  return (
    <form className="flex justify-center items-center gap-2" onSubmit={onSubmit}>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="h-6 cursor-pointer"
        onClick={e => {
          if (keyword && inputMode) onSubmit(e);
          else setInputMode(prev => !prev);
        }}
      />
      {inputMode && (
        <input
          ref={inputRef}
          type="text"
          className="pl-2"
          onBlur={() =>
            setTimeout(() => {
              setKeyword('');
              setInputMode(false);
            }, 100)
          }
          onChange={e => setKeyword(e.target.value)}
        />
      )}
    </form>
  );
}
