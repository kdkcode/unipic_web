import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SplashScreen = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onFinish();
    }, 2000); // 2초 후 사라짐

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: isVisible ? 0 : "100%" }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#1f2937", // Tailwind의 neutral-800에 해당하는 색상
        display: "flex",
        flexDirection: "column", // 세로 방향으로 아이템 배치
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <img
        src="/assets/images/logo1.png"
        alt="UNIPIC"
        style={{ width: "100px", marginBottom: "20px" }} // 크기 줄이고 아래 여백 추가
      />
      <img
        src="/assets/images/logo2.png"
        alt="UNIPIC"
        style={{ width: "100px" }} // 크기 줄임
      />
    </motion.div>
  );
};

export default SplashScreen;
