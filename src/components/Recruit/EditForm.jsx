import React, { useState, useEffect } from 'react';
import { Request } from '../../api/api';
import Contour from '../ui/Contour';
import Margin from '../ui/Margin';
import DynamicColorButton from '../ui/Button/DynamicColorButton';
import {getPlainTextFromHtml} from '../../../utils/ParseString'


const EditForm = ({ recruitPost, scheduleID }) => {
  const [teamName, setTeamName] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [teamID, setTeamID] = useState('');
  const [teamInfo, setTeamInfo] = useState(null);
  const [teamMaxAttenDance, setTeamMaxAttenDance] = useState(null);
  const [frequency, setFrequency] = useState(null);
  const [selectedDays, setSelectedDays] = useState(null);
  const [selectedWeeks, setSelectedWeeks] = useState(null);
  const [teamImage, setTeamImage] = useState(null);

  useEffect(() => {
    if (!recruitPost) return;

    setTeamID(recruitPost.team);
    fetchTeamInfo(recruitPost.team);
    setTeamName(recruitPost.name);
    setPostTitle(recruitPost.title);
    setPostContent(getPlainTextFromHtml(recruitPost.content));
    setSelectedRegion(recruitPost.region);
  }, [recruitPost]);


  const handleImageChange = (e) => {
    const files = e.target.files;
  
    if (!files || files.length === 0) {
      // 사용자가 파일을 선택하지 않은 경우
      return;
    }

    const file = files[0];

    if (!isImageFile(file)) {
      alert('올바른 이미지 파일을 선택해주세요.');
      // 파일 선택 창 비우기
      e.target.value = null;
      return;
    }
   
  };

  const isImageFile = (file) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const extension = file.name.split('.').pop().toLowerCase();
    return allowedExtensions.includes(extension);
  };

  const fetchTeamInfo = async (team_id) => {
    try {
      const response = await Request('get', `/teams/${team_id}/`, {}, {}, {});

      setTeamInfo(response);
      setTeamMaxAttenDance(response.max_attendance);
      setFrequency(response.frequency);
      setSelectedDays(response.day);
      setSelectedWeeks(response.week);
      setTeamImage(response.image);
    } catch (error) {
      console.error('Error fetching TeamInfo:', error.message);
    }
  };

  const savePost = async () => {
    try {
      const response = await Request('patch', `/recruits/${recruitPost.id}/`, {}, {}, {
        title: postTitle,
        content: postContent,
        region: selectedRegion,
      });
    } catch (error) {
      console.error('게시글 업데이트 중 에러 발생 : ', error.message);
    }
  };

  const saveTeam = async () => {
    try {
        const formData = new FormData();
    
        const imageInput = document.querySelector('input[type="file"]');
        if (imageInput.files.length > 0) {
          formData.append('image', imageInput.files[0]);
        }

        formData.append('name', teamName);
        formData.append('max_attendance', teamMaxAttenDance);
        formData.append('frequency', frequency);
        formData.append('day', selectedDays);

      const response = await Request('patch', `/teams/${teamID}/`, {}, {}, formData);
    } catch (error) {
      console.error('팀 업데이트 중 에러 발생 : ', error.message);
    }
  };

  const saveSchedule = async () => {
    try {
      const response = await Request('patch', `/schedules/${scheduleID}/change/`, {}, {}, {
        frequency: frequency,
        day: selectedDays,
        week: selectedWeeks,
      });
    } catch (error) {
      console.error('일정 업데이트 중 에러 발생 : ', error.message);
    }
  };

  const handleSave = async () => {
    savePost();
    saveTeam();
    saveSchedule();
    
  };

  return (
    <div className="mt-9 p-6 rounded-md w-[800px]">
      {recruitPost ? (
        <>
          <div className='text-center'>
            <input
              placeholder="모임 명을 입력해주세요."
              value={teamName}
              className="text-4xl font-bold mb-3 text-center border-2 p-2 rounded-full"
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div className='mx-auto overflow-hidden rounded-full h-28 w-28'>
            <img
              src={teamImage || '/media/default_team.png'}
              alt='모임_이미지'
              className='rounded-full object-cover h-full w-full'
            />
          </div>
          <div className="flex items-center justify-center">
            <input type="file" onChange={handleImageChange} />
          </div>

          <Contour></Contour>
                    <div className="w-full border-[1px] p-4 rounded-md">
                <div className="mt-4">
                    <div className="text-lg font-semibold mb-1">
                        모집글 제목
                    </div>
                    <Contour></Contour>
                    <input type="text" 
                        placeholder="제목을 입력해주세요."
                        value={postTitle}
                        className="font-semibold mb-1 bg-white border-2 rounded-md w-full p-2"
                        onChange={(e) => setPostTitle(e.target.value)} >
                    </input>
                </div>
                <div className="mt-4">
                    <div className="text-lg font-semibold mb-1">
                        글 내용
                    </div>
                    <Contour></Contour>
                    <textarea type="text" 
                        placeholder="내용을 입력해주세요."
                        value={postContent}
                        className="font-semibold mb-1 bg-white border-2 rounded-md w-full p-2 h-[200px]"
                        onChange={(e) => setPostContent(e.target.value)} >
                    </textarea>
                </div>
                <div className="mt-4">
                    <div className="text-lg font-semibold mb-1">
                        모임 지역
                    </div>
                    <Contour></Contour>
                    <select type="text" 
                        value={selectedRegion}
                        className="font-semibold mb-1 bg-white border-2 rounded-md w-full p-2" 
                        onChange={(e) => setSelectedRegion(e.target.value)}>
                        <option value="" disabled hidden>
                        지역을 선택해주세요.
                        </option>
                        <option value="지역 무관">지역 무관</option>
                        <option value="서울">서울</option>
                        <option value="경기">경기</option>
                        <option value="강원">강원</option>
                        <option value="충북">충북</option>
                        <option value="충남">충남</option>
                        <option value="전북">전북</option>
                        <option value="전남">전남</option>
                        <option value="경북">경북</option>
                        <option value="경남">경남</option>
                        <option value="제주">제주</option>
                    </select>
                </div>
                <div className="mt-4">
                    <div className="text-lg font-semibold mb-1">
                        모임 빈도
                    </div>
                    <Contour></Contour>
                    <div className='flex'>
                    <select type="text" 
                        value={frequency || ''}
                        className="font-semibold mb-1 bg-white border-2 rounded-md w-full p-2 mr-2" 
                        onChange={(e) => setFrequency(e.target.value)}>
                        <option value="" disabled hidden>
                        빈도를 선택해주세요.
                        </option>
                        <option value="매일">매일</option>
                        <option value="매주">매주</option>
                        <option value="매월">매월</option>
                    </select>

                    <select type="text" 
                        value={selectedWeeks || ''}
                        className="font-semibold mb-1 bg-white border-2 rounded-md w-full p-2 ml-2" 
                        onChange={(e) => setSelectedWeeks(e.target.value)}>
                        <option value="" disabled hidden>
                        주를 선택해주세요.
                        </option>
                        <option value="1주">1주</option>
                        <option value="2주">2주</option>
                        <option value="3주">3주</option>
                        <option value="4주">4주</option>
                    </select>

                    <select type="text" 
                        value={selectedDays || ''}
                        className="font-semibold mb-1 bg-white border-2 rounded-md w-full p-2 ml-2" 
                        onChange={(e) => setSelectedDays(e.target.value)}>
                        <option value="" disabled hidden>
                        요일을 선택해주세요.
                        </option>
                        <option value="월">월</option>
                        <option value="화">화</option>
                        <option value="수">수</option>
                        <option value="목">목</option>
                        <option value="금">금</option>
                        <option value="토">토</option>
                        <option value="일">일</option>
                    </select>
                    </div>                   
                </div>
                <div className="mt-4">
                    <div className="text-lg font-semibold mb-1">
                        최대 인원수
                    </div>
                    <Contour></Contour>
                    <input type="text" 
                        placeholder="인원수를 선택해주세요."
                        value={teamMaxAttenDance}
                        className="font-semibold mb-1 bg-white border-2 rounded-md w-full p-2" 
                        onChange={(e) => setTeamMaxAttenDance(e.target.value)}
                        >
                    </input>
                </div>
                
                <Margin top="2" />
                <Contour></Contour>
    
                <div className="w-full h-[40px]  ">
                    <div className='flex justify-center'>
                    <DynamicColorButton
                    color="white"
                    text="저장"
                    btnstyle="py-2 px-2 self-center"
                    onClick={handleSave}
                    />
                    </div>
                </div>
            </div>
                </>)
                : (<>
                    {/* <RedirectComponent></RedirectComponent> */}
                </>)
            }
        </div>
    );
};

export default EditForm;
