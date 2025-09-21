import { createContext, useEffect, useState } from "react";

export const IsLoginContext = createContext();

export function IsLoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(true);
  const [profile, setProfile] = useState(null);

  const token = localStorage.getItem("token");
  // console.log(isLogin);
  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [token]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/me/profile", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(`خطا ${res.status}: ${text}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        setProfile(data.data);
      })
  }, [token]);

  console.log("profile : ",profile)
  return (
    <IsLoginContext.Provider value={[isLogin,profile]}>
      {children}
    </IsLoginContext.Provider>
  );
}
