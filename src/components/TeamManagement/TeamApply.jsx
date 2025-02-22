import React from 'react';

import { applyToTeam, kickTeamMember } from '../../api/team';

import Margin from '../ui/Margin';
import DynamicColorButton from '../ui/Button/DynamicColorButton';
import crew from '../../assets/crew.png';
import leader from '../../assets/leader.png';


function TeamApply({ profileData,  postiId,isMe,setPageReload }) {
  const { profilePicture,  is_leader, user ,nickname} = profileData;




  const applyTeamBtn = async()=>{

    try{
   await applyToTeam({  id:postiId ,userId:user})

    setPageReload((prev)=>{prev+1})

  }
    catch{}
  }
  
  const kickTeamBtn = async()=>{
  
    try {
      await kickTeamMember({ id: postiId, userId: user });
      
      // window.location.reload();
      setPageReload((prev)=>{prev+1})
    } catch (error) {
      console.error('Failed to kick the team member:', error.message);
    }
 
  }


  return (
    <div className={`flex ${is_leader ? 'bg-red-100' : 'bg-blue-100'}`}>
      <div className={`relative overflow-hidden rounded-full ${is_leader ? 'bg-red-500' : 'bg-blue-500'} h-20 w-20`}>
        <img
          src={profilePicture ? profilePicture : is_leader ? leader : crew}
          alt='프로필 사진'
  
        />
      </div>
      <Margin left='3' plustailwind='w-3' />
      <div className={` w-72 rounded-lg h-20 flex justify-center items-center ${is_leader ? 'border-red-200 border-2' : 'border-blue-200 border-2'}`}>
       {nickname} {is_leader ? '현재 팀장입니다' : '신입 팀원 입니다'}
      </div>
      <Margin left='3' plustailwind='w-6' />
      <div className='flex flex-col justify-center items-center'>
<DynamicColorButton btnstyle='w-24 h-8 mt-2' color='blue' text='신청 수락' onClick={applyTeamBtn}></DynamicColorButton>
<DynamicColorButton btnstyle='w-24 h-8 mt-2' color='red' text='신청 거절' onClick={kickTeamBtn}></DynamicColorButton>

      </div>
    </div>
  );
}

export default TeamApply;

