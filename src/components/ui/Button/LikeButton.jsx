import React from 'react';
import DynamicColorButton from './DynamicColorButton';

const LikeButton = ({ isLiked,setIsLiked}) => {


  const handleLikeClick = async () => {
    try {
      await likePost(postId);
      setIsLiked(true);
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const handleUnlikeClick = async () => {
    try {
      await unlikePost(postId);
      setIsLiked(false);
    } catch (error) {
      console.error('Error unliking the post:', error);
    }

  };


  return (
    <div>
      {isLiked ? (
        <DynamicColorButton
          className={`py-2 px-4 text-sm`} // Apply text-sm class for smaller text
          onClick={handleLikeClick}
          text="좋아요 취소"
          color="red"
        />
      ) : (
        <DynamicColorButton
          color="blue"
          text="좋아요"
          btnstyle="py-2 px-4"
          onClick={handleUnlikeClick}
        />
      )}
    </div>
  );
};

export default LikeButton;
