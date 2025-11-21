/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AuthProvider = ({ children }) => {
  const base_url = import.meta.env.VITE_API_URL;

  const [user, setUser] = useState(null);
  const [Authtoken, setAuthtoken] = useState(localStorage.getItem("Authtoken"));
  const [initialLoading, setInitialLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ---------------------------
  // LOGIN
  // ---------------------------
  const admin_login = async (data) => {
    try {
      setLoginLoading(true);

      const response = await axios.post(`${base_url}/admin/login`, data);

      const token = response?.data?.data?.token;

      if (response.status === 200 && token) {
        console.log(response)
        localStorage.setItem("Authtoken", token);
        setAuthtoken(token);

        toast.success("Logged in successfully");
        navigate("/", { replace: true });
      } else {
        toast.error(response?.data?.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    } finally {
      setLoginLoading(false);
    }
  };

  // ---------------------------
  // VALIDATE ADMIN TOKEN
  // ---------------------------
  const validate_admin = async () => {
    try {
      const response = await axios.post(
        `${base_url}/admin/validate`,
        {},
        {
          headers: {
            Authorization: `${Authtoken}`,
          },
        }
      );

      if (response.status === 200) {
        setUser(response?.data?.user || null);

        if (location.pathname === "/login") {
          navigate("/", { replace: true });
        }
      }
    } catch (error) {
      setAuthtoken(null);
      localStorage.removeItem("Authtoken");
      navigate("/login", { replace: true });
    } finally {
      setInitialLoading(false);
    }
  };

  // ---------------------------
  // ON APP LOAD
  // ---------------------------
  useEffect(() => {
    if (!Authtoken) {
      setInitialLoading(false);
      navigate("/login");
      return;
    }

    validate_admin();
  }, [Authtoken]);

  // ---------------------------
  // PROVIDER VALUES
  // ---------------------------
  const values = {
    Authtoken,
    user,
    admin_login,
    validate_admin,
    initialLoading,
    loginLoading,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAuthContext must be inside AuthProvider");
  return context;
};
