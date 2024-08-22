import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useImageGeneration } from "../contexts/ImageGenerationContext"; // Import the context

const HomePage = () => {
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const navigate = useNavigate();
  const { generationCount } = useImageGeneration(); // Get the generation count

  const handlePrivacyCheck = (e) => {
    setPrivacyChecked(e.target.checked);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white">
      <main className="flex-grow flex flex-col items-center justify-center w-full px-4">
        <div className="relative w-full max-w-lg rounded-lg overflow-hidden mb-4">
          <img
            src="/assets/images/graduation-photo.png"
            alt="AI 졸업사진"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 p-4 text-center text-white bg-black bg-opacity-50">
            <h2 className="text-xl font-bold">AI 졸업사진</h2>
            <p className="text-sm">
              갤러리에 있는 사진으로 빠르게 졸업사진 만들기
            </p>
          </div>
        </div>

        <p className="text-center text-gray-700 mb-4">
          AI 이미지 생성 횟수가{" "}
          <span className="text-red-500 font-bold">{generationCount}</span> 번
          남았습니다.
        </p>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="privacyConsent"
            className="mr-2"
            checked={privacyChecked}
            onChange={handlePrivacyCheck}
          />
          <label htmlFor="privacyConsent" className="text-sm text-gray-600">
            개인정보 수집에 동의합니다.
          </label>
          <Link to="/privacy" className="text-blue-500 text-sm ml-2">
            자세히
          </Link>
        </div>

        <button
          onClick={() => navigate("/upload")}
          className={`border border-black text-black font-bold py-2 px-4 rounded w-full max-w-xs mb-4 ${
            privacyChecked ? "bg-white" : "bg-transparent cursor-not-allowed"
          }`}
          disabled={!privacyChecked}
        >
          사진 생성하기
        </button>
      </main>

      <footer className="w-full p-4 bg-white border-t border-gray-300 text-center">
        <nav className="flex justify-around mb-4 text-gray-600">
          <div className="flex flex-col items-center">
            <span className="material-icons text-2xl mb-1">home</span>
            <span className="text-xs">홈</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-icons text-2xl mb-1">share</span>
            <span className="text-xs">공유하기</span>
          </div>
          <div
            className="flex flex-col items-center"
            onClick={() => navigate("/album")}
          >
            <span className="material-icons text-2xl mb-1">photo_album</span>
            <span className="text-xs">나의 앨범</span>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default HomePage;
