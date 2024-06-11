'use client';

import { useEffect, useState } from 'react';

const CommentBox = () => {
  const [comment, setComment] = useState('');
  const [commentCnt, _] = useState(0);

  useEffect(() => {}, []);

  const handleCommentSubmit = () => {};

  return (
    <div className="flex flex-col mt-[25px]">
      <span className="text-[15px]">{`${commentCnt}개의 댓글`}</span>
      <textarea
        className="mt-[5px] border-[1px] border-solid border-[#bec1c6] rounded-[5px] p-[10px] h-[100px] resize-none"
        value={comment}
        placeholder="댓글을 입력해주세요."
        onChange={e => setComment(e.target.value)}
      />
      <div className="flex justify-end mt-[10px]">
        <button
          className="rounded-[5px] text-[15px] text-[#9e9fa2] border-[#bec1c6] border-solid border-[1px] w-[80px] h-[35px]"
          onClick={handleCommentSubmit}
        >
          댓글 작성
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
