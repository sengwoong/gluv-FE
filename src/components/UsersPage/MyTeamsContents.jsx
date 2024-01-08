import React, { useState, useEffect } from "react";

import axios from "axios";

import Contour from "../ui/Contour";
import Margin from "../ui/Margin";
import TeamBox from "../ui/list/TeamBox";
import NumberedPagination from "../Pagination/NumberedPagination";
import { fetchTeamData } from "../../api/team";

function MainContents() {
  const [teamDataList, setTeamDataList] = useState([]);
  const [teamPage, setTeamPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    const TeamData = async () => {
      try {
        const response = await fetchTeamData({currentPage:currentPage})
        setTeamDataList(response.results);
        setTeamPage(response)
        return response.data;
      } catch (error) {
        console.error("Fetching data failed:", error.message);
        return null;
      }
    };
    TeamData();
  }, [currentPage]);
  return (
    <div>
      <div className="border p-2 flex flex-col rounded-md h-[520px]">
        <div className="m-8 ml-6">
          {teamDataList.map((teamData) => (
              <div key={teamData.id}>
                <TeamBox teamData={teamData} />
                <Margin top="3" plustailwind="h-3" />
              </div>
          ))}
        </div>
      </div>
      <Margin top="2" plustailwind="h-4" />
      <Contour />
      <Margin top="2" />
      <div className="flex justify-center items-center">
       <NumberedPagination count={teamPage.count} currentPage={currentPage} setCurrentPage={setCurrentPage} maxNum={5}></NumberedPagination>
      </div>
    </div>
  );
}

export default MainContents;
