import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 초기 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 가짜 로그인 함수
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      // 여기서 실제 API 요청 대신에 가짜 데이터를 사용합니다.
      const fakeUser = {
        id: "123",
        nickname: credentials.username || "사용자",
        email: `${credentials.username}@example.com`,
      };
      const fakeAccessToken = "fakeAccessToken";
      const fakeRefreshToken = "fakeRefreshToken";

      // 사용자 정보 및 토큰을 로컬 스토리지에 저장합니다.
      setUser(fakeUser);
      localStorage.setItem("user", JSON.stringify(fakeUser));
      localStorage.setItem("accessToken", fakeAccessToken);
      localStorage.setItem("refreshToken", fakeRefreshToken);
    } catch (err) {
      setError("로그인에 실패하였습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 로그아웃 함수
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  // 초기 로드 시 토큰 및 사용자 정보 확인
  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
