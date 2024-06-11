'use client'

import { useCookies } from 'react-cookie';
import { BLOG_USER_NAME } from '@/app/_constants/constant/constant';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons';
import API from '@/app/_lib/fetcher/fetcher';

interface Props {
  params: {articleId : string
           likes: number
           isLiked : boolean
  };
}

function LikeButton({params: {articleId} }: Props) {
    const [cookie, setCookie] = useCookies([BLOG_USER_NAME]);
    const [likeYn, setLikeYn] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const userId = cookie.mustit_blog_username;

    useEffect(() => { 
      API.getArticleLikeInfo(articleId).then((res) => {
        setLikeYn(res.isLiked);
        setLikesCount(res.likes);
      });
    }, []);
    
    const likeAction = async (userId : string) => {
      if(!userId) {
        alert('로그인이 필요한 서비스입니다. 로그인 후 시도해주세요.');
        return;
      }

      if(likeYn){
        setLikeYn(false)
        setLikesCount(likesCount-1)
        await API.unlikeArticle(articleId, userId)
      }else{
        setLikeYn(true)
        setLikesCount(likesCount+1)
        await API.likeArticle(articleId, userId)  
      }  
    }  
    
    return (
      <div className='mr-[20px]'>
        <FontAwesomeIcon 
          icon={likeYn? fasHeart : farHeart}
          className="h-4 cursor-pointer"
          onClick={() => likeAction(userId)}
        />
        <span className='ml-[5px] text-[15px]'>{likesCount}</span>
      </div>         
    );
}

export default LikeButton;
