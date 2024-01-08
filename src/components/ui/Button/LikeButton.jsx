import React from 'react';
import DynamicColorButton from './DynamicColorButton';


const LikeButton = ({ isLiked,handleLikeClick,handleUnlikeClick}) => {
  console.log("inisLiked")
  console.log(isLiked)
  console.log(isLiked)
  return (
    <div>
      {isLiked ? (
        <DynamicColorButton
        color="blue"
        text="좋아요"
        btnstyle="py-2 px-4"
        onClick={handleUnlikeClick}
      />

     
      ) : (
        <DynamicColorButton
        className={`py-2 px-4 text-sm`} // Apply text-sm class for smaller text
        onClick={handleLikeClick}
        text="좋아요 취소"
        color="red"
      />
      )}
    </div>
  );
};

export default LikeButton;
