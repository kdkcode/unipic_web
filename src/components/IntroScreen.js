import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const IntroScreen = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/images/graduation-photo.png')",
        }}
        animate={{
          scale: 1.2,
          x: [0, 20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      />
      <div className="relative flex-grow flex flex-col items-center justify-end pb-16 w-full bg-gradient-to-t from-black via-black/70 to-transparent">
        <h2 className="text-4xl font-bold text-white mb-2">UNIPIC</h2>
        <p className="text-lg text-white text-center px-2 mb-6">
          AI로 만드는 졸업사진
        </p>
        <button
          onClick={handleStartClick}
          className="bg-gradient-to-r from-[#91CAFF] to-[#FC7176] text-white px-8 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition duration-300 shadow-lg"
        >
          졸업사진 만들기 AI
        </button>
      </div>

      <div className="relative w-full bg-black p-4 text-center">
        <p className="text-sm text-white">
          © 2024 UNIPIC. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default IntroScreen;
