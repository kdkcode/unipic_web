import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { generatedImages } = location.state || { generatedImages: [] }; // Ensure generatedImages is an array

  const handleSaveImages = () => {
    // Logic to save images to user's device
    generatedImages.forEach((image, index) => {
      const link = document.createElement("a");
      link.href = image;
      link.download = `AI_Generated_Image_${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    // After saving images, navigate back to the home page
    navigate("/home");
  };

  if (!Array.isArray(generatedImages) || generatedImages.length === 0) {
    return (
      <div className="flex flex-col items-center min-h-screen bg-white p-4">
        <header className="w-full text-center relative mb-4">
          <h1 className="text-lg font-bold">STEP 3</h1>
          <h2 className="text-md text-gray-500">사진 편집하기</h2>
        </header>

        <main className="flex-grow w-full">
          <p className="text-center text-red-500 text-sm mb-4">
            어플을 종료하지 마세요 (종료시 기회가 날아갈 수 있습니다.)
          </p>

          <p className="text-center text-gray-500 text-lg">
            생성된 이미지가 없습니다. 다시 시도해 주세요.
          </p>

          <button
            onClick={() => navigate("/home")}
            className="w-full py-3 rounded-full bg-gradient-to-r from-pink-300 to-blue-300 text-white text-lg font-bold mt-6"
          >
            홈으로 돌아가기
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-4">
      <header className="w-full text-center relative mb-4">
        <h1 className="text-lg font-bold">STEP 3</h1>
        <h2 className="text-md text-gray-500">사진 편집하기</h2>
      </header>

      <main className="flex-grow w-full">
        <p className="text-center text-red-500 text-sm mb-4">
          어플을 종료하지 마세요 (종료시 기회가 날아갈 수 있습니다.)
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {generatedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Generated ${index + 1}`}
              className="w-full h-auto object-cover rounded-lg"
            />
          ))}
        </div>

        <button
          onClick={handleSaveImages}
          className="w-full py-3 rounded-full bg-gradient-to-r from-pink-300 to-blue-300 text-white text-lg font-bold"
        >
          저장하기!
        </button>
      </main>
    </div>
  );
};

export default ResultPage;
