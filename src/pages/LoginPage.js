import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      try {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
        }
      } catch (error) {
        console.error("Kakao initialization failed", error);
      }
    };

    script.onerror = () => {
      console.error("Failed to load Kakao SDK script");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleKakaoLogin = () => {
    try {
      if (window.Kakao) {
        window.Kakao.Auth.login({
          success: function (authObj) {
            console.log(authObj);
            // Request user information using the access token
            window.Kakao.API.request({
              url: "/v2/user/me",
              success: function (response) {
                console.log(response);
                const kakaoAccount = response.kakao_account;
                const userInfo = {
                  id: response.id,
                  email: kakaoAccount.email,
                };
                login(userInfo); // Login with actual user info
                navigate("/home");
              },
              fail: function (error) {
                console.error("Failed to get user info", error);
              },
            });
          },
          fail: function (err) {
            console.error("Kakao login failed", err);
          },
        });
      }
    } catch (error) {
      console.error("Kakao login error", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-black text-white">
      <div className="flex-grow flex flex-col items-center justify-center w-full px-4">
        <h1 className="text-2xl font-bold mb-8">로그인</h1>
        <button onClick={handleKakaoLogin} className="w-full max-w-xs">
          <img
            src="/assets/images/kakao_login.png"
            alt="카카오로 시작하기"
            className="w-full"
          />
        </button>
      </div>

      <div className="w-full bg-gray-800 p-4 text-center">
        <select className="bg-gray-700 text-white px-2 py-1 rounded">
          <option>한국어</option>
          <option>English</option>
        </select>
        <p className="text-sm mt-2">Copyright © UNIPIC. All Rights Reserved</p>
        <p className="text-xs mt-1">
          사업자등록번호: 414-81-08646 | 대표자명: 박신우,김도경 | 상호명:
          유니토브 | 전화번호: 010-2628-0313
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
