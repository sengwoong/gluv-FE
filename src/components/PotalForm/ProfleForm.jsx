import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../context/AuthContextProvider';


import ModalPortal from '../ui/portal/ModalPortal';
import PortalBgRight from '../ui/portal/PortalBgRight';
import Contour from '../ui/Contour';
import Margin from '../ui/Margin';
import { OpenModalContext } from '../../context/OpenModalProvider';

function ProfileForm() {

  const { logout, getUserInfo } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    profile_image: '',
    nickname: '',
    email: '',
  });

  const gotoProfile =()=>{

    window.location.href = '/users/myteams/';
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // getUserInfo 함수를 호출하고 반환된 데이터를 받아옵니다.
        const data = await getUserInfo();
        setProfileData({
          profile_image: data.profile_image,
          nickname: data.nickname || '',
          email: data.email || '',
        });

      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };
  
    fetchData();

  }, []);

  return (
    <ModalPortal>
      <PortalBgRight>
        <div>
          <div className='bg-white p-6   w-72 z-50 rounded-md'>
            <div className="flex flex-col justify-center items-center">
              <div className="modal-header">
                <h3 className="text-lg font-bold">내 프로필</h3>
              </div>
              <Margin top="3" plustailwind="h-5"></Margin>
              <div className="flex flex-col justify-center items-center">
                <img src={profileData.profile_image}
                  alt="프로필 사진"
                  className="rounded-full  w-16 h-16 mb-4"
                />
                <Margin top="3" plustailwind="h-2"></Margin>
                <p className='text-sm'>Email: {profileData.email}</p>
                <Margin top="3" plustailwind="h-5"></Margin>
                <p className="mb-2 text-sm ">닉네임: {profileData.nickname}</p>
              </div>
              <Margin top="3" plustailwind="h-5"></Margin>
              <Contour></Contour>
              <div className="modal-footer">
                <Margin top="0" plustailwind="h-1"></Margin>
                <div className='flex'>
                  <div
                    role="button"
                    tabIndex={0}
                    className='text-black py-2 px-4 rounded-md transition duration-300 border mx-2'
                    onClick={gotoProfile}
                  >
                    프로필 보기 
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    className='text-black py-2 px-4 rounded-md transition duration-300 border mx-2'
                    onClick={logout}
                  >
                    로그아웃
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PortalBgRight>
    </ModalPortal>
  );
}

export default ProfileForm;
