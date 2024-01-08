import React, { useEffect, useState, useContext } from 'react';
import { FetchPostData, FetchDelete } from '../api/post.js';
import { checkIfLike, likePost, unlikePost } from '../api/likes.js';
import { FetchAllCommentsData, FetchCreateComments } from '../api/comment.js';
import { submitReport } from '../api/report.js';
import { AuthContext } from '../context/AuthContextProvider.jsx';

import Margin from '../components/ui/Margin.jsx';
import DynamicColorButton from '../components/ui/Button/DynamicColorButton.jsx';
import CommentList from '../components/ui/Input/CommentList.jsx';
import Contour from '../components/ui/Contour.jsx';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import DeleteButton from '../components/ui/Button/DelectButton.jsx';
import ReportBtn from '../components/ui/Button/ReportBtn.jsx';
import LikeButton from '../components/ui/Button/LikeButton.jsx';
import InfoItem from '../components/ui/Input/InfoItem.jsx';
import NumberedPagination from '../components/Pagination/NumberedPagination.jsx';
import { NowformatDate, formatDate } from '../components/Data/datacalcul.js';
import CreateComment from '../components/ui/Input/CreateComment.jsx';


function PostDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const { getDecodedToken } = useContext(AuthContext);
  const [selectedCommentUser, setSelectedCommentUser] = useState({ id: '', nickname: '' });
  const [isAuthor, setIsAuthor] = useState(false);

  const postId = id;

  const getPost = async () => {
    try {
      const postData = await FetchPostData({ id });
      checkIsAuthor(JSON.stringify(postData.author_info.id));
      setData(postData);
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  };

  const checkIfLiked = async () => {
    try {
      const liked = await checkIfLike(postId);
      setIsLiked(liked);
    } catch (error) {
      console.error('Error checking if liked:', error);
    }
  };

 

  const handleCommentClick = (commentUser) => {
    setSelectedCommentUser({ id: commentUser.id, nickname: commentUser.nickname });
  };

  const commentFetch = async () => {
    let getComment = await FetchAllCommentsData({ id: id, page: currentPage });
    setComments(getComment);
  };

  useEffect(() => {
    commentFetch();
    getPost();
    checkIfLiked();
  }, [currentPage, isLiked]);

  function checkIsAuthor(author) {
    const decodedToken = getDecodedToken();
    if (decodedToken.user_id == author) {
      setIsAuthor(true);
    }
  }

 

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center">
      <div className='w-[80vw] rounded-md p-6'>
        <div className='flex items-center justify-center w-[60px] h-[30px] bg-gray-200 text-sm font-roboto rounded-md text-center overflow-hidden'>
          {data.category}
        </div>

        <Margin top="1" />
        <div className='w-full'>
          <div>
            <div className='text-2xl font-bold'>{data.title}</div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <img
                  src={data.author_info.profile_image}
                  alt="포스트 사진"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className='font-bold text-lg'>{data.author_info.nickname}</div>
                <Margin left="1" plustailwind="w-3" />
                <div className='text-sm text-gray-600'>{NowformatDate(data.created_at)}</div>
              </div>
              <div className='flex flex-col items-center p-2'>
                <div className='flex'>
                  <div className='text-sm'>좋아요:</div>
                  <div className='text-sm'>{data.likes}</div>
                </div>
                <div className='flex'>
                  <div className='text-sm'>조회수:</div>
                  <div className='text-sm'>{data.view_count}</div>
                </div>
              </div>
            </div>
            <Contour />
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='grid grid-cols-2 gap-3'>
                  <InfoItem title="카테고리" content={data.category} />
                </div>
              </div>
              <div className='flex flex-col items-center p-2'>
                <div className='flex'>
                  <div className='text-sm'>작성일:</div>
                  <div className='text-sm'>{formatDate(data.created_at)}</div>
                </div>
                <div className='flex'>
                  <div className='text-sm'>수정일:</div>
                  <div className='text-sm'>{formatDate(data.updated_at)}</div>
                </div>
              </div>
            </div>
            <Contour />
            <Margin top="4" />
            <div className='text-xl w-ful border-black font-bold mb-4'>내용</div>
            <Contour />
            <Margin top="3" plustailwind="h-3 w-1" />
            <div className="min-h-[400px] w-full flex z-10">
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
            <Margin top="4" />
            <div className={`w-full border p-4 flex`}>
              <div className='flex w-1/2'>
                <LikeButton isLiked={isLiked} setIsLiked={setIsLiked}></LikeButton>
                <ReportBtn author={data.author} id={id}></ReportBtn>
              </div>
              <div className='flex w-1/2 justify-end '>
                <div className='ml-auto'>
                  <DeleteButton id={id} type={"post"}></DeleteButton>
                </div>
                <Margin left="2" />
                <Link to="/posts/notices/">
                  <DynamicColorButton text="목록으로" btnstyle="py-1 px-2 ml-0 items-end flex-shrink-0" />
                </Link>
                <Margin left="2" />
                {isAuthor && (
                  <Link to={`/posts/${id}/edit`}>
                    <DynamicColorButton color="black" text="수정하기" btnstyle="py-1 px-2 flex-shrink-0" />
                  </Link>
                )}
              </div>
              <Margin left="4" />
            </div>
            <div>
              {selectedCommentUser ? selectedCommentUser.nickname + "님을 선택을 하였습니다" : ""}
              <Margin top="4" />
              <Contour />
              <div className='flex items-center justify-center'>
                <div className='text-2xl font-bold px-2'></div>
               <CreateComment id={id} selectedCommentUser={selectedCommentUser} commentFetch={commentFetch}></CreateComment>
              </div>
              <Margin top="4" />
              <Contour />
            </div>
            <div className='flex justify-between items-center  px-4'>
              <CommentList comments={comments} onCommentClick={handleCommentClick} />
            </div>
          </div>
          <NumberedPagination count={comments.count} currentPage={currentPage} setCurrentPage={setCurrentPage} maxNum={5}></NumberedPagination>
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;
