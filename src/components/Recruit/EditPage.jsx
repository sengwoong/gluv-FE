import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import { FetchTeam } from "../../api/team";
import { TeamContext } from '../../context/TeamContextProvider';
import { Request } from '../../api/api';

import EditForm from './EditForm';

const EditPage = () => {
  const teamContext = useContext(TeamContext);
  const [recruitPost, setRecruitPost] = useState(null);
  const [scheduleID, setScheduleID] = useState(null);

  const navigate = useNavigate();

  const fetchRecruitPost = async () => {
      if(!teamContext.teamData.recruit_id){
        return
      }

      try {
        const response = await Request('get', `/recruits/${teamContext.teamData.recruit_id}/`, {}, {}, {})
        setRecruitPost(response);
        setScheduleID(response.schedule_id)
      } catch (error) {
          console.error('Error fetching post:', error.message);
      }
  };

  const fetchTeam = async () => {
    
    try {
      const teamData = await FetchTeam({ id });
      // setRecruitPost(response);
      setScheduleID(response.schedule_id)
    } catch (error) {
        console.error('Error fetching post:', error.message);
    }
};

  useEffect(() => {
    fetchRecruitPost();
  }, [teamContext]);

  return (
    <div className="flex items-center justify-center w-screen mt-0 h-full">
      <EditForm recruitPost={recruitPost} scheduleID={scheduleID}></EditForm>
    </div>
  );
};

export default EditPage;
