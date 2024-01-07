import React from 'react';
import Margin from '../Margin';

const CommentList = ({ comments, onCommentClick }) => {
  return (
    <div className='w-full mt-4'>
      {comments && comments.results && comments.results.length > 0 ? (
        comments.results.map((comment, index) => (
          <div
            key={index}
            className='flex items-start my-3 py-1 cursor-pointer'
            onClick={() => onCommentClick({ id: comment.user_id, nickname: comment.nickname })}
          >
            {/* User's profile picture */}
            <img
              src={comment.user.profile_image}
              alt='프로필 사진'
              className='w-8 h-8 rounded-full mr-2'
            />

            <div>
              <strong className='font-semibold'>{comment.nickname}님</strong>
              <Margin left='3' plustailwind='w-3' />
              <strong className='font-semibold'>
                {/* Display to_user's nickname and profile picture if available */}
                {comment.to_user_info ? `${comment.to_user_info.nickname}에게` : ''}
              </strong>
              <p className=''>{comment.content}</p>
            </div>
          </div>
        ))
      ) : (
        <p>커맨트가 없습니다.</p>
      )}
    </div>
  );
};

export default CommentList;
