import axios from "axios";
import { Request } from "./api";

const baseURL = import.meta.env.VITE_APP_API_KEY;



export const FetchAllTeamData = async ({ page = 1, search = "", category = "", order_by = "", order = "" }) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const accessToken = user?.access_token || "";
        if (!accessToken) {
            console.error("Access token not available");
            return null;
        }
        
        const queryString = `?page=${page}&search=${search}&category='${category}'&order_by=${order_by}&order=${order}`;
        const apiUrl = `${baseURL}/teams/${queryString}`;

        const res = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return res.data;
    } catch (error) {
        console.error("Fetching notice failed:", error.message);
        return null;
    }
};

  export const FetchTeam = async ({id}) => {
    return await Request('get', `/teams/${id}/`, {}, {}, {})
  };



  export const TeamLeave = async ({id}) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const accessToken = user?.access_token || "";
        if (!accessToken) {
            console.error("Access token not available");
            return null;
        }
        
        const res = await axios.delete(`${baseURL}/teams/${id}/leave/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error("Fetching notice failed:", error.message);
        return null;
    }
  };

  export const TeamDelete = async ({id}) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const accessToken = user?.access_token || "";
        if (!accessToken) {
            console.error("Access token not available");
            return null;
        }
   
        const res = await axios.delete(`${baseURL}/teams/${id}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error("Fetching notice failed:", error.message);
        return null;
    }
  };



export const getTeamMembers = async ({ id }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.access_token || "";

    if (!accessToken) {
        console.error("Access token not available");
        return null;
    }

    const apiUrl2 = `${baseURL}/teams/${id}/members/`;
   
    try {
        const res = await axios.get(apiUrl2, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

  
        return res.data;
    } catch (error) {
        console.error("Fetching team members failed:", error.message);
        return null;
    }
};





export const applyToTeam = async ({id,userId}) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.access_token || "";
    if (!accessToken) {
      console.error("Access token not available");
      return null;
    }
  
    const response = await axios.patch(
      `${baseURL}/teams/${id}/join/`,
      { user: userId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Changing team leader failed:", error.response?.data || error.message);
    return null;
  }
};




export const fetchMyAppliedTeamData = async ({currentPage}) => {
  const baseURL = import.meta.env.VITE_APP_API_KEY;
  try {

    const response = await Request('get', `${baseURL}/teams/myappliedteams/?page=${currentPage}`, {}, {}, {})
    console.log("fetchMyAppliedTeamData")
    console.log("fetchMyAppliedTeamData")
    console.log(response)
    return response

  } catch (error) {
    console.error("Fetching notice failed:", error.message);
    return null;
  }
};





export const fetchTeamData = async ({currentPage}) => {
  console.log(currentPage)
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.access_token || "";
    if (!accessToken) {
      console.error("Access token not available");
      return null;
    }
    const baseURL = import.meta.env.VITE_APP_API_KEY;

    const response = await axios.get(
      `${baseURL}/teams/myteams/?page=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  
 

    return response.data;
  } catch (error) {
    console.error("Fetching data failed:", error.message);
    return null;
  }
};














//킥
export const kickTeamMember = async ({ id, userId }) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = user?.access_token || '';
   
    if (!accessToken) {
      console.error('Access token not available');
      return null;
    }
   
    const apiUrl = `${baseURL}/teams/${id}/kick/`;

    const res = await axios.delete(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        user_id: userId,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Kicking team member failed:', error.message);
    return null;
  }
};


export const changeTeamLeader = async ({ id, newLeaderId }) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.access_token || "";
    if (!accessToken) {
      console.error("Access token not available");
      return null;
    }
   

    const response = await axios.patch(
      `${baseURL}/teams/${id}/leader/`,
      { user: newLeaderId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Changing team leader failed:", error.response?.data || error.message);
    return null;
  }
};

