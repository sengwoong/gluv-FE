import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth(SpecificComponent) {
  function AuthenticationCheck(props) {
    const isAuthenticated = localStorage.getItem("user");
    const navigate = useNavigate();

    useEffect(() => {
      // 로그인 하지않을시 보낼 링크
      if (!isAuthenticated) {
        navigate("/");
      }
    }, [isAuthenticated, navigate]);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}

export default Auth;
