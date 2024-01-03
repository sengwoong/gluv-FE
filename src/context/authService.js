import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { httpClient } from "../api/interceptor";

const apiURL = import.meta.env.VITE_APP_API_KEY;

export const authService = {
  login: async (inputs) => {
    try {
      const res = await axios.post(`${apiURL}/users/login/`, inputs);
      const token = res.data;
      return { success: true, data: token };
    } catch (error) {
      console.error("로그인 실패:", error.message);
      return { success: false, error: error.message };
    }
  },

  getUserInfo: async () => {
    const token = localStorage.getItem("user");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id;
      const tokenObject = JSON.parse(localStorage.getItem("user"));
      const accessToken = tokenObject.access_token;

      try {
        const response = await httpClient.get(
          `${apiURL}/users/${userId}/profile`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = response.data;
        return data;
      } catch (error) {
        console.error("사용자 프로필 가져오기 실패:", error);
        throw error;
      }
    }
    return null;
  },

  registerUser: async (inputs) => {
    try {
      const res = await axios.post(`${apiURL}/users/signup/`, inputs);
      if (res.status === 200) {
        return { success: true, data: res.data };
      } else {
        return { success: false, error: "Unexpected status code" };
      }
    } catch (error) {
        // 실패시 에러창
      console.error("회원 가입 실패:", error.message);
      return { success: false, error: error.message };
    }
  },
};
