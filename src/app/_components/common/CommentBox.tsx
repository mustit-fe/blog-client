'use client';

import { useEffect, useState } from 'react';
import { CommentDto } from '@/app/_constants/types/types';
import API from '@/app/_lib/fetcher/fetcher';
import { useCookies } from 'react-cookie';
import { BLOG_USER_NAME } from '@/app/_constants/constant/constant';
import CommentListView from '@/app/_components/common/CommentListView';


interface Props { 
  params: {articleId : string};
} 

const CommentBox = ({params: {articleId}}: Props) => {
  const [cookie, _] = useCookies([BLOG_USER_NAME]);
  const [comments, setComments] = useState<CommentDto[]>([]); // Specify the type of 'comments' as an array of 'Comment' objects
  const [content, setContent] = useState('');
  const [commentCnt, setCommentCnt] = useState(0);
  const userId =  cookie.mustit_blog_username;
  
  useEffect(() => {
     API.getArticleComments(articleId).then((res) => {
       setComments(res.data);
       setCommentCnt(res.data.length);
     })
  }, []);

  const handleCommentSubmit = () => {
    if(!userId){
      alert('로그인이 필요한 서비스입니다. 로그인 후 시도해주세요.');
      return;
    }
    if(!content.trim()){
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    API.createArticleComment(articleId, content).then((res) => {
      if(res.status === 200){
        setComments(res.data);
        setCommentCnt(res.data.length);
        setContent('');
      }
    });
  }
  
  return (
    <div className='flex flex-col mt-[25px]'>
      <span className='text-[15px]'>{`${commentCnt}개의 댓글`}</span>
      <textarea className='mt-[5px] border-[1px] border-solid border-[#bec1c6] rounded-[5px] p-[10px] h-[100px] resize-none' 
                    value={content} 
              placeholder='댓글을 입력해주세요.'
                 onChange={(e)=>setContent(e.target.value)}/>
      <div className='flex justify-end mt-[10px]'>
        <button className='rounded-[5px] text-[12px] text-[#9e9fa2] border-[#bec1c6] border-solid border-[1px] w-[65px] h-[30px]' onClick={handleCommentSubmit}>댓글 작성</button>    
      </div>
      <div>
        <CommentListView comments={comments}
                         userId={userId}
                         setComments={setComments}
                         setCommentCnt={setCommentCnt}/>
      </div>
    </div>
  );
};

export default CommentBox;
