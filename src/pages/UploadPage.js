import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length + selectedFiles.length > 6) {
      alert("최대 6장까지 선택할 수 있습니다.");
      return;
    }

    const validFiles = files.filter(
      (file) => file.size < 5 * 1024 * 1024 && file.type.startsWith("image/")
    );

    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setPreview((prevPreview) => [...prevPreview, ...newPreviews]);
    setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleNextClick = () => {
    if (selectedFiles.length < 4) {
      alert("사진을 4장 이상 선택해주세요.");
      return;
    }

    // Navigate to SelectionPage and pass the selected files
    navigate("/selection", { state: { uploadedImages: selectedFiles } });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <header className="w-full bg-gray-100 p-4 text-center relative">
        <button
          onClick={() => window.history.back()}
          className="absolute top-0 left-0 ml-4 mt-4"
        >
          <span className="material-icons text-gray-700">arrow_back</span>
        </button>
        <h1
          className="text-lg font-bold text-gradient"
          style={{
            background: "linear-gradient(90deg, #91CAFF, #FC7176)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Step 1
        </h1>
        <h2 className="text-sm font-bold text-black-500">내 사진 업로드하기</h2>
      </header>

      <main className="flex-grow flex flex-col items-center w-full">
        {/* 좋은 사진 예시 */}
        <section className="w-full mb-6">
          <h3 className="text-sm font-bold text-center">좋은 사진 예시</h3>
          <div className="flex justify-center space-x-4 mt-2">
            <img
              src="/assets/images/model1.png"
              alt="좋은 사진 예시 1"
              className="w-24 h-24 object-cover rounded"
            />
            <img
              src="/assets/images/model2.png"
              alt="좋은 사진 예시 2"
              className="w-24 h-24 object-cover rounded"
            />
            <img
              src="/assets/images/model3.png"
              alt="좋은 사진 예시 3"
              className="w-24 h-24 object-cover rounded"
            />
          </div>
          <ul className="text-xs mt-2 text-gray-600 text-center">
            <li>얼굴이 선명하게 나온 셀카</li>
            <li>보정하지 않은 원본 사진</li>
          </ul>
        </section>

        {/* 나쁜 사진 예시 */}
        <section className="w-full mb-6">
          <h3 className="text-sm font-bold text-center">나쁜 사진 예시</h3>
          <div className="flex justify-center space-x-4 mt-2">
            <img
              src="/assets/images/model4.png"
              alt="나쁜 사진 예시 1"
              className="w-24 h-24 object-cover rounded"
            />
            <img
              src="/assets/images/model5.png"
              alt="나쁜 사진 예시 2"
              className="w-24 h-24 object-cover rounded"
            />
            <img
              src="/assets/images/model6.png"
              alt="나쁜 사진 예시 3"
              className="w-24 h-24 object-cover rounded"
            />
          </div>
          <ul className="text-xs mt-2 text-gray-600 text-center">
            <li>마스크/안경/선글라스/손 등으로 얼굴이 가려진 사진</li>
            <li>저화질/흐릿한 사진</li>
            <li>얼굴이 너무 작게 나오거나 얼굴 전체가 나오지 않은 사진</li>
          </ul>
        </section>

        {/* 업로드된 이미지 미리보기 */}
        {preview.length > 0 && (
          <div className="mb-4 grid grid-cols-3 gap-2">
            {preview.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`미리보기 ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        {/* 파일 선택 버튼 */}
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        <p className="text-center text-red-500 mb-4">
          사진을 4장 이상 선택해주세요! (최대 6장)
        </p>

        <div className="flex w-full max-w-xs justify-between">
          <button
            onClick={handleUploadClick}
            className="border border-black text-black font-bold py-2 px-4 rounded bg-white w-1/2 mr-2"
            style={{
              borderColor: "#91CAFF",
              color: "#91CAFF",
            }}
          >
            사진 업로드
          </button>
          <button
            onClick={handleNextClick}
            className="border font-bold py-2 px-4 rounded bg-white w-1/2 ml-2"
            style={{
              borderColor: "linear-gradient(80deg, #91CAFF, #FC7176)",
              color: "black",
            }}
            disabled={selectedFiles.length < 4}
          >
            다음으로
          </button>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;
