import React from 'react';
import DynamicColorButton from './DynamicColorButton';
import { FetchDelete } from '../../../api/post';

function DeleteButton({ id, type }) {
  const deletePost = async () => {
    try {
      const postData = await FetchDelete({ id });
      setData(postData);
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  };

  const deleteClick = async () => {
    type === 'post' ? deletePost() : deletePost();
    // Assuming you have the 'navigate' and 'post' functions defined somewhere
    navigate('/posts/notices/');
  };

  return (
    <DynamicColorButton
      color="red"
      text="삭제하기"
      onClick={deleteClick}
      btnstyle="py-1 px-2 flex-shrink-0"
    />
  );
}

export default DeleteButton;
