import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const MyAlbumPage = () => {
  const { user, logout } = useAuth(); // 여기서 logout을 가져옵니다.
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.Kakao) {
      window.Kakao.Auth.logout(() => {
        console.log("카카오 로그아웃 완료");
        logout();
        navigate("/login");
      });
    } else {
      logout();
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="w-full bg-gray-900 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">UNI Gallery</h1>
      </header>

      <main className="flex-grow w-full p-4">
        <div className="flex flex-col items-center">
          {/* 사용자 프로필 */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
              <span className="material-icons text-4xl text-gray-500">
                account_circle
              </span>
            </div>
            <p className="text-lg font-semibold">
              {user?.nickname || "사용자이름"}
            </p>
            <button
              onClick={handleLogout}
              className="mt-2 text-xs text-red-500 border border-red-500 px-2 py-1 rounded-full"
            >
              로그아웃
            </button>
          </div>

          {/* 내 앨범 */}
          <div className="w-full bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-4 text-center">내 앨범</h2>
            <div className="space-y-4">
              <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                {/* 나중에 앨범 이미지가 여기에 표시될 예정 */}
                <span className="text-gray-500">
                  이미지가 여기에 표시됩니다
                </span>
              </div>
              <p className="text-center text-sm text-gray-500">
                2024.02.13 생성
              </p>
              <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">
                  친구에게 공유하고 한 번 더 생성하기
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-white border-t border-gray-300 text-center py-4">
        <nav className="flex justify-around text-gray-600">
          <div
            className="flex flex-col items-center"
            onClick={() => navigate("/home")}
          >
            <span className="material-icons text-2xl mb-1">home</span>
            <span className="text-xs">홈</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-icons text-2xl mb-1">share</span>
            <span className="text-xs">공유하기</span>
          </div>
          <div className="flex flex-col items-center text-pink-500">
            <span className="material-icons text-2xl mb-1">photo_album</span>
            <span className="text-xs">나의 앨범</span>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default MyAlbumPage;
