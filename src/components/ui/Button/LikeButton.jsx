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
        className={`py-2 px-4 text-sm`} // Apply text-sm class for smaller text
        onClick={handleUnlikeClick}
        text="좋아요 취소"
        color="red"
      />
     
      ) : (
        <DynamicColorButton
        color="blue"
        text="좋아요"
        btnstyle="py-2 px-4"
        onClick={handleLikeClick}
      />
      )}
    </div>
  );
};

export default LikeButton;
