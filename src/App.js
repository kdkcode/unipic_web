import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ImageGenerationProvider } from "./contexts/ImageGenerationContext"; // Import the provider
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ExplorePage from "./pages/ExplorePage";
import SettingsPage from "./pages/SettingsPage";
import SplashScreen from "./components/SplashScreen";
import IntroScreen from "./components/IntroScreen";
import ImageDetailPage from "./pages/ImageDetailPage";
import MyAlbumPage from "./pages/MyAlbumPage";
import PrivacyPage from "./pages/PrivacyPage";
import UploadPage from "./pages/UploadPage";
import SelectionPage from "./pages/SelectionPage"; // Import SelectionPage
import ResultPage from "./pages/ResultPage"; // Import ResultPage
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <AuthProvider>
      <ImageGenerationProvider>
        <Router>
          <Routes>
            <Route path="/" element={<IntroScreen />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/explore"
              element={
                <ProtectedRoute>
                  <ExplorePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/image/:id"
              element={
                <ProtectedRoute>
                  <ImageDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/album"
              element={
                <ProtectedRoute>
                  <MyAlbumPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/privacy"
              element={
                <ProtectedRoute>
                  <PrivacyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <UploadPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/selection"
              element={
                <ProtectedRoute>
                  <SelectionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/result"
              element={
                <ProtectedRoute>
                  <ResultPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ImageGenerationProvider>
    </AuthProvider>
  );
}

export default App;
