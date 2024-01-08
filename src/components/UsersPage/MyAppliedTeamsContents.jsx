import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Contour from "../ui/Contour";
import TeamBox from "../ui/list/TeamBox";
import Margin from "../ui/Margin";
import NumberedPagination from "../Pagination/NumberedPagination";
import { fetchMyAppliedTeamData } from "../../api/team";

function MainContents() {
  const [teamDataList, setTeamDataList] = useState([]);
  const [teamPage, setTeamPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMyAppliedTeamData({ currentPage });
        setTeamDataList(response.results);
        setTeamPage(response);
      } catch (error) {
        console.error("Fetching data failed:", error.message);
      }
    };
    console.log("teamDataList")
    console.log(teamDataList)
    console.log(teamDataList)
    fetchData();
  }, [currentPage]);

  return (
    <div>
      <div className="border p-2 flex flex-col rounded-md h-[520px]">
        <div className="m-8 ml-6">
          {teamDataList.length !== 0 ? (
            teamDataList.map((teamData) => (
              <Link to={`/teams/${teamData.id}`} key={teamData.id}>
                <div>
                  <TeamBox teamData={teamData} />
                  <Margin top="3" plustailwind="h-3" />
                </div>
              </Link>
            ))
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </div>
      <Margin top="2" plustailwind="h-4" />
      <Contour />
      <Margin top="2" />
      <div className="flex justify-center items-center">
        {/* Add your pagination component here */}
        <NumberedPagination
          count={teamPage.count}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          maxNum={5}
        />
      </div>
    </div>
  );
}

export default MainContents;
