// ImageGenerationContext.js
import React, { createContext, useContext, useState } from "react";

const ImageGenerationContext = createContext();

export const ImageGenerationProvider = ({ children }) => {
  const [generationCount, setGenerationCount] = useState(3); // Default to 3

  const decrementGenerationCount = () => {
    setGenerationCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  return (
    <ImageGenerationContext.Provider
      value={{ generationCount, decrementGenerationCount }}
    >
      {children}
    </ImageGenerationContext.Provider>
  );
};

export const useImageGeneration = () => useContext(ImageGenerationContext);
