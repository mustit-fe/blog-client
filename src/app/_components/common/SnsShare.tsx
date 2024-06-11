'use client';

import { useState, useEffect } from 'react';
import {faFacebook, faTwitter, faLine} from '@fortawesome/free-brands-svg-icons';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  params: {title: string}    
}

function SnsShare({params: {title} }: Props) {
  const [url, setUrl] = useState('');
  
  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  
  const snsList = [
    {
      name: 'clipboard',
      url:'',
      icon : faPaperclip
    },
    {
      name: 'facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      icon: faFacebook,
    },
    {
      name: 'twitter',
      url: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      icon: faTwitter
    },
    {
      name: 'line',
      url: `https://social-plugins.line.me/lineit/share?url=${url}`,
      icon: faLine
    },
  ];

  const openSnsSharePopup = (url: string) => {
    window.open(url, '', 'width=600, height=300');
  }

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert('URL이 복사되었습니다.');
  }
  
  return (
    <div>
      {snsList.map((sns, index) => (
        <FontAwesomeIcon
          key={index}
          icon={sns.icon}
          className='mr-[10px] cursor-pointer'
          onClick={sns.url ? () => openSnsSharePopup(sns.url) : () => copyUrlToClipboard()}
        />
      ))}
    </div>
  );
}
export default SnsShare;