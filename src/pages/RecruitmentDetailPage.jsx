import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Margin from '../components/ui/Margin.jsx';
import DynamicColorButton from '../components/ui/Button/DynamicColorButton.jsx';
import Contour from '../components/ui/Contour.jsx';
import CommentList from '../components/ui/Input/CommentList.jsx';
import InfoItem from '../components/ui/Input/InfoItem.jsx';
import { NowformatDate, formatDate } from '../components/Data/datacalcul.js';
import {
  FetchDelectRecruits,
  FetchRecruits,
} from '../api/recruits.js';
import { FetchAllReqCommentsData, FetchCreateComments } from '../api/comment.js';
import { FetchTeam } from '../api/team.js';
import { submitReport } from '../api/report.js';
import { checkIfReLike, likeRecruit, unlikeRecruit } from '../api/likes.js';
import { checkRecruitApplication, applyForRecruit, cancelRecruitApplication } from '../api/applyRecruit';
import { AuthContext } from '../context/AuthContextProvider.jsx';
import NumberedPagination from '../components/Pagination/NumberedPagination.jsx';
import LikeButton from '../components/ui/Button/LikeButton.jsx';
import ReportBtn from '../components/ui/Button/ReportBtn.jsx';

function RecruitmentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [data, setData] = useState(null);
  const [teamData, setTeamData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inserComment, setInserComment] = useState('');
  const [AmIRecruit, setAmIRecruit] = useState('');
  const [AmIRecruitChange, setAmIRecruitChange] = useState(1);
  const [cachedData, setCachedData] = useState(false);
  const [selectedCommentUser, setSelectedCommentUser] = useState({ id: '', nickname: '' });

  const handleInputChange = (event) => {
    setInserComment(event.target.value);
  };

  const postId = id;

  useEffect(() => {
    const RecruitApplication = async () => {
      try {
        const IRecruit = await checkRecruitApplication(id);
        setAmIRecruit({ IRecruit });
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };
    RecruitApplication();
  }, [AmIRecruitChange]);

  useEffect(() => {
    const checkLike = async () => {
      const liked = await checkIfReLike(id);
      setIsLiked(liked);
    };
    checkLike();
  }, [isLiked]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const postData = await FetchRecruits({ id });
        setData((prev) => ({ ...prev, ...postData }));
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    commentFetch();
    getPost();

    setAmIRecruitChange((prev) => prev + 1);
  }, [currentPage]);

  useEffect(() => {
    const getTeam = async (teamId) => {
      try {
        if (!cachedData) {
          const teamData = await FetchTeam({ id: teamId });
          setData((prev) => ({ ...prev, ...teamData }));
          setCachedData(true);
        }
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    if (data !== null) {
      const teamId = data.team;

      if (teamId) {
        getTeam(teamId);
      }
    }
  }, [data]);

  const AmIReClikc = () => {
    setAmIRecruitChange((prev) => prev + 1);
    const isUserInArray = AmIRecruit.IRecruit.some((item) => item.user === user.id);
    let alertMessage = isUserInArray ? '신청중입니다' : '신청 상태가 없는 상태 입니다';
    alert(alertMessage);
  };

  const RecruitBtn = async () => {
    await applyForRecruit(id);
    setAmIRecruitChange((prev) => prev + 1);
  };

  const UnRecruitBtn = async () => {
    await cancelRecruitApplication(id);
    setAmIRecruitChange((prev) => prev + 1);
  };

  const RecruitDelectBtn = async () => {
    try {
      await FetchDelectRecruits({ id });
      navigate('/recruits');
    } catch (error) {
      console.error('Error deleting recruit:', error);
    }
  };

  const gotoListBtn = () => {
    navigate('/recruits');
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const commentFetch = async () => {
    const commentsData = await FetchAllReqCommentsData({ id: id, page: currentPage });
    setComments(commentsData);
  };

  const handleLikeClick = async () => {
    try {
      await likeRecruit(postId);
      setIsLiked(true);
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const handleUnlikeClick = async () => {
    try {
      await unlikeRecruit(postId);
      setIsLiked(false);
    } catch (error) {
      console.error('Error unliking the post:', error);
    }
  };

 

  const handleCommentClick = (commentUser) => {
    setSelectedCommentUser(commentUser);
  };

  const CreatComment = async () => {
    try {
      await FetchCreateComments({
        recruits: id,
        content: inserComment,
        to_user: selectedCommentUser.id || '',
      });

    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-[80vw] rounded-md p-6">
        <div className="flex items-center justify-center w-[60px] h-[30px] bg-gray-200 text-sm font-roboto rounded-md text-center">
          {data.category}
        </div>

        <Margin top="1" />
        <div className="w-full">
          <div>
            <div className="text-2xl font-bold">{data.title}</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={data.author_info.profile_image}
                  alt="프로필 사진"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="font-bold text-lg">{data.author_info.nickname}</div>
                <Margin left="1" plustailwind="w-3" />
                <div className="text-sm text-gray-600 ">{NowformatDate(data.created_at)}</div>
              </div>
              <div className="flex flex-col items-center p-2">
                <div className="flex">
                  <div className="text-sm ">좋아요:</div>
                  <div className="text-sm ">{data.likes}</div>
                </div>
                <div className="flex">
                  <div className="text-sm ">조회수:</div>
                  <div className="text-sm ">{data.view_count}</div>
                </div>
              </div>
            </div>

            <Contour />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="grid grid-cols-2 gap-3">
                  <InfoItem title="카테고리" content={data.category} />
                  <InfoItem title="지역" content={data.region} />
                  <InfoItem title="최대인원" content={data.max_attendance} />
                  <InfoItem title="현재인원" content={data.current_attendance} />
                </div>
              </div>
              <div className="flex flex-col items-center p-2">
                <div className="flex">
                  <div className="text-sm ">작성일:</div>
                  <div className="text-sm ">{formatDate(data.created_at)}</div>
                </div>
                <div className="flex">
                  <div className="text-sm ">수정일:</div>
                  <div className="text-sm ">{formatDate(data.updated_at)}</div>
                </div>
              </div>
            </div>

            <Contour />

            <Margin top="4" />
            <div className="text-xl w-ful border-black font-bold mb-4"></div>

            <Margin top="3" plustailwind="h-3 w-1" />
            <div className="border p-2 w-full min-h-[400px] overflow-scroll rounded-md">
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>

            <Margin top="2" />
            <div className="flex justify-center">
            <LikeButton isLiked={isLiked} setIsLiked={setIsLiked}   handleLikeClick={handleLikeClick} handleUnlikeClick={handleUnlikeClick} ></LikeButton>
            
              <Margin left="4" />
          
               <ReportBtn author={data.author} id={id}></ReportBtn>

            </div>

            <Margin top="4" />
            <div className={`w-full border p-4 flex justify-between items-start`}>
              <div className="flex">
                <DynamicColorButton
                  color="blue"
                  text="신청확인"
                  btnstyle="py-1 px-2 ml-0 items-end flex-shrink-0"
                  onClick={AmIReClikc}
                />
                <Margin left="2" />
                <DynamicColorButton
                  color="red"
                  text="삭제하기"
                  btnstyle="py-1 px-2 flex-shrink-0"
                  onClick={RecruitDelectBtn}
                />
              </div>

              <div className="flex flex-wrap">
                <DynamicColorButton
                  color="blue"
                  text="신청하기"
                  btnstyle="py-1 px-2 ml-0 items-end flex-shrink-0"
                  onClick={RecruitBtn}
                />
                <DynamicColorButton
                  color="blue"
                  text="신청해제"
                  btnstyle="py-1 px-2 ml-0 items-end flex-shrink-0"
                  onClick={UnRecruitBtn}
                />
                <Margin left="1" />
                <Link to="/recruits">
                  <DynamicColorButton
                    text="목록으로"
                    btnstyle="py-1 px-2 ml-0 items-end flex-shrink-0"
                    onClick={gotoListBtn}
                  />
                </Link>
              </div>
            </div>

            <div>{selectedCommentUser ? selectedCommentUser.nickname + '님을 선택을 하였습니다' : ''}</div>
            <Margin top="4" />
            <div className="text-2xl font-bold mb-4">댓글</div>

            <div className="flex items-center justify-center">
              <input
                className="border p-2 w-3/4 rounded-md"
                placeholder="댓글 입력..."
                value={inserComment}
                onChange={handleInputChange}
              />
              <DynamicColorButton
                color="black"
                text="댓글 달기"
                btnstyle="py-2 px-2 ml-2"
                onClick={CreatComment}
              />
            </div>
          </div>
          <CommentList comments={comments} onCommentClick={handleCommentClick} />
          <div className="flex w-full justify-center items-center">
            
          <NumberedPagination count={comments.count} currentPage={currentPage} setCurrentPage={handlePageClick} maxNum={5}></NumberedPagination>

       
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruitmentDetailPage;
