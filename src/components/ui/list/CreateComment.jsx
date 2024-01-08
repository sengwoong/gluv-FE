import React, { useState } from 'react'
import { FetchCreateComments } from '../../../api/comment';
import DynamicColorButton from '../Button/DynamicColorButton';

function CreateComment({commentFetch,id,selectedCommentUser}) {
  const [insertComment, setInsertComment] = useState('');
  const CreatComment = async (e) => {
    try {
      await FetchCreateComments({
        post_id: id,
        content: insertComment,
        to_user: selectedCommentUser.id || '',
      });
      await commentFetch();
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleInputChange = (event) => {
    setInsertComment(event.target.value);
  };

  return (
    <> <input
    className='border p-3 grow rounded-md'
    placeholder='댓글 입력...'
    value={insertComment}
    onChange={handleInputChange}
  />
  <DynamicColorButton
    color="black"
    text="댓글 달기"
    btnstyle="ml-2"
    onClick={CreatComment}
  /></>
  )
}

export default CreateComment