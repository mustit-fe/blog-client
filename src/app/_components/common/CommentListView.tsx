import { CommentDto, CommentList } from '@/app/_constants/types/types';
import API from '@/app/_lib/fetcher/fetcher';
import dayjs from 'dayjs';

const CommentListView = ({comments, userId, setComments, setCommentCnt}: CommentList) => {

  const showModifyArea = (commentId: string) => {
    const targetModify = document.getElementById(`comment-modify-${commentId}`);
    const targetConent = document.getElementById(`comment-content-${commentId}`); 
    const targetTextarea = targetModify?.firstChild as HTMLTextAreaElement;

    targetTextarea.value = targetConent?.textContent as string;
    targetModify?.classList.toggle('hidden');
    targetConent?.classList.toggle('hidden');
  }  
  const modifyComment = (comment : CommentDto) => {
    const targetModify = document.getElementById(`comment-modify-${comment.id}`); 
    const targetTextarea = targetModify?.firstChild as HTMLTextAreaElement;
    
    if(!targetTextarea.value.trim()){
      alert('수정할 내용을 입력해주세요.');
      return;
    }

    API.modifyArticleComment(comment.articleId, comment.id, targetTextarea.value).then((res) => {
      if(res.status === 200){
        setComments(res.data);
        setCommentCnt(res.data.length);
      }
    });
    showModifyArea(comment.id);
  }

  const deleteComment = (comment: CommentDto) => {
    confirm('정말 삭제하시겠습니까?') &&
    API.deleteArticleComment(comment.articleId, comment.id).then((res) => {
      if(res.status === 200){
        setComments(res.data);
        setCommentCnt(res.data.length);
      }
    }); 
  }
  return (
    <>
      {comments?.map((comment, idx) => (
        <div key={comment.id} className='mt-[15px]'>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col mb-[10px]'>
              <span className='font-bold text-[15px] text-[gray]'>{comment.author.username}</span>
              <span className='text-[12px] text-[#c4c4c4]'>{dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm')}</span>
            </div>
            {comment.author.username === userId ? (
              <div className='text-[12px] text-[#c4c4c4]'>
                <span className='cursor-pointer' onClick={()=>showModifyArea(comment.id)}> 수정 </span>|
                <span className='cursor-pointer' onClick={()=>deleteComment(comment)}> 삭제 </span>
              </div>
            ) : <></>}
          </div>
          <p id={`comment-content-${comment.id}`} className='text-[13px]'>{comment.content}</p>
          <div id={`comment-modify-${comment.id}`} className='hidden'>
            <textarea className='mt-[5px] border-[1px] border-solid border-[#bec1c6] rounded-[5px] p-[10px] h-[100px] w-full resize-none'
                    placeholder='수정할 내용을 입력해주세요.'/>
            <div className='flex justify-end mt-[3px]'>     
              <button className='rounded-[5px] mr-[7px] text-[12px] text-[#9e9fa2] border-[#bec1c6] border-solid border-[1px] w-[55px] h-[30px]' onClick={()=>modifyComment(comment)}>수정</button>
              <button className='rounded-[5px] text-[12px] text-[#9e9fa2] border-[#bec1c6] border-solid border-[1px] w-[55px] h-[30px]' onClick={()=>showModifyArea(comment.id)}>취소</button>
            </div>
          </div>
          {comments.length !== idx+1 && 
            <hr className='border-[1px] border-solid border-[#bec1c6] mt-[15px]' 
          />}
        </div>
      ))}
    </>    
  )
}

export default CommentListView;