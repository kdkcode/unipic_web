import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useImageGeneration } from "../contexts/ImageGenerationContext";
import axios from "axios"; // Import axios for HTTP requests

const SelectionPage = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedFaceShape, setSelectedFaceShape] = useState(null);
  const [selectedHairstyle, setSelectedHairstyle] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [displayedImage, setDisplayedImage] = useState(0); // Image cycling state
  const [dots, setDots] = useState(""); // State for dynamic dots in "Generating..."
  const navigate = useNavigate();
  const { generationCount, decrementGenerationCount } = useImageGeneration(); // Get the generation count and the decrement function
  const location = useLocation();
  const { uploadedImages } = location.state || { uploadedImages: [] }; // Get uploaded images from previous page

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setSelectedFaceShape(null); // Reset face shape when gender changes
    setSelectedHairstyle(null); // Reset hairstyle when gender changes
  };

  const handleFaceShapeSelect = (shape) => {
    setSelectedFaceShape(shape);
    setSelectedHairstyle(null); // Reset hairstyle when face shape changes
  };

  const handleHairstyleSelect = (style) => {
    setSelectedHairstyle(style);
  };

  const handleGenerateClick = async () => {
    if (!selectedGender || !selectedFaceShape || !selectedHairstyle) {
      alert("성별, 얼굴형, 그리고 헤어스타일을 선택해주세요.");
      return;
    }

    // Start loading state
    setIsLoading(true);

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("gender", selectedGender);
      formData.append("face_shape", selectedFaceShape);
      formData.append("hairstyle", selectedHairstyle);

      // Append images to form data
      uploadedImages.forEach((image, index) => {
        formData.append("files", image);
      });

      // Send POST request to FastAPI server
      const response = await axios.post(
        "http://127.0.0.1:8000/upload-images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response from FastAPI
      const generatedImages = response.data.uploaded_image_urls;

      // Navigate to result page with generated images
      decrementGenerationCount();
      navigate("/result", { state: { generatedImages } });
    } catch (error) {
      // Handle errors (e.g., network issues, AWS errors)
      alert("이미지 생성에 실패했습니다. 다시 시도해주세요.");
      setIsLoading(false);
    }
  };

  const handleAbort = () => {
    setIsLoading(false);
  };

  // Cycle through images during the loading process
  useEffect(() => {
    if (isLoading) {
      const images = [
        "/assets/images/banner1.png",
        "/assets/images/banner2.png",
      ]; // Add your image paths here

      const interval = setInterval(() => {
        setDisplayedImage((prev) => (prev + 1) % images.length);
      }, 3000); // Change image every second

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Dynamic dots for "Generating..." text
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500); // Change the number of dots every 500ms

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Confirm navigation before leaving the page if process is running
  useEffect(() => {
    if (isLoading) {
      const confirmNavigation = (e) => {
        e.preventDefault();
        e.returnValue = ""; // Required for older browsers
      };

      window.addEventListener("beforeunload", confirmNavigation);
      return () =>
        window.removeEventListener("beforeunload", confirmNavigation);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-4">
      <header className="w-full text-center relative mb-4">
        <button
          onClick={() => window.history.back()}
          className="absolute top-0 left-0 ml-4 mt-4"
        >
          <span className="material-icons text-gray-700">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold">선택 사항</h1>
        <p className="text-sm text-gray-500">
          모델 이미지 학습 참고사항으로 전달됩니다.
        </p>
      </header>

      <main className="flex-grow w-full">
        {!isLoading ? (
          <>
            <div className="mb-6">
              <img
                src="/assets/images/model5.png" // Replace with the actual path of your background image
                alt="Model Visual"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">성별 선택</h2>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleGenderSelect("남자")}
                  className={`border px-4 py-2 rounded-md w-28 ${
                    selectedGender === "남자"
                      ? "border-blue-700"
                      : "border-gray-300"
                  }`}
                  style={{
                    borderRadius: "4px",
                  }}
                >
                  남자
                </button>
                <button
                  onClick={() => handleGenderSelect("여자")}
                  className={`border px-4 py-2 rounded-md w-28 ${
                    selectedGender === "여자"
                      ? "border-pink-700"
                      : "border-gray-300"
                  }`}
                  style={{
                    borderRadius: "4px",
                  }}
                >
                  여자
                </button>
              </div>
            </div>

            {selectedGender && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">얼굴형 선택</h2>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => handleFaceShapeSelect("oval")}
                    className={`border px-4 py-2 rounded-md w-28 ${
                      selectedFaceShape === "oval"
                        ? "border-blue-700"
                        : "border-gray-300"
                    }`}
                    style={{
                      borderRadius: "4px",
                    }}
                  >
                    계란형
                  </button>
                  <button
                    onClick={() => handleFaceShapeSelect("square")}
                    className={`border px-4 py-2 rounded-md w-28 ${
                      selectedFaceShape === "square"
                        ? "border-blue-700"
                        : "border-gray-300"
                    }`}
                    style={{
                      borderRadius: "4px",
                    }}
                  >
                    사각형
                  </button>
                  <button
                    onClick={() => handleFaceShapeSelect("round")}
                    className={`border px-4 py-2 rounded-md w-28 ${
                      selectedFaceShape === "round"
                        ? "border-blue-700"
                        : "border-gray-300"
                    }`}
                    style={{
                      borderRadius: "4px",
                    }}
                  >
                    둥근형
                  </button>
                </div>
              </div>
            )}

            {selectedFaceShape && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">헤어스타일 선택</h2>
                <div className="flex justify-center space-x-4">
                  {selectedGender === "남자" ? (
                    <>
                      <button
                        onClick={() => handleHairstyleSelect("덮은머리")}
                        className={`border px-4 py-2 rounded-md w-28 ${
                          selectedHairstyle === "덮은머리"
                            ? "border-blue-700"
                            : "border-gray-300"
                        }`}
                        style={{
                          borderRadius: "4px",
                        }}
                      >
                        덮은머리
                      </button>
                      <button
                        onClick={() => handleHairstyleSelect("내린머리")}
                        className={`border px-4 py-2 rounded-md w-28 ${
                          selectedHairstyle === "내린머리"
                            ? "border-blue-700"
                            : "border-gray-300"
                        }`}
                        style={{
                          borderRadius: "4px",
                        }}
                      >
                        내린머리
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleHairstyleSelect("긴머리")}
                        className={`border px-4 py-2 rounded-md w-28 ${
                          selectedHairstyle === "긴머리"
                            ? "border-pink-700"
                            : "border-gray-300"
                        }`}
                        style={{
                          borderRadius: "4px",
                        }}
                      >
                        긴머리
                      </button>
                      <button
                        onClick={() => handleHairstyleSelect("단발")}
                        className={`border px-4 py-2 rounded-md w-28 ${
                          selectedHairstyle === "단발"
                            ? "border-pink-700"
                            : "border-gray-300"
                        }`}
                        style={{
                          borderRadius: "4px",
                        }}
                      >
                        단발
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={handleGenerateClick}
              className="w-full py-3 rounded-full bg-gradient-to-r from-blue-300 to-pink-300 text-white text-lg font-bold"
              disabled={
                generationCount === 0 ||
                !selectedGender ||
                !selectedFaceShape ||
                !selectedHairstyle
              }
            >
              이미지 생성 횟수 1회 차감
            </button>
            <p className="text-center text-gray-500 mt-4">
              AI 이미지 생성 횟수가{" "}
              <span className="text-red-500">{generationCount}</span> 번
              남았습니다.
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="mb-6 relative">
              <img
                src={`/assets/images/banner${displayedImage + 1}.png`} // Cycle between two images
                alt="Loading"
                className="w-full object-cover rounded-lg"
              />
            </div>
            <div className="mb-4">
              <div
                className="animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
            <p className="text-center text-lg font-bold text-gray-700">
              Generating{dots}
            </p>
            <p className="text-center text-sm text-gray-500">
              사용자의 이미지를 분석하고 있습니다.
            </p>
            <p className="text-center text-sm text-gray-500">
              AI가 이미지를 처리하고 있습니다.
            </p>
            <button
              onClick={handleAbort}
              className="mt-4 py-2 px-4 bg-red-500 text-white rounded-full"
            >
              중지하기
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SelectionPage;
