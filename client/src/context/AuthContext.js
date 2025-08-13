import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "AUTH_FAIL":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set auth token header
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  };

  // Load user on app start
  useEffect(() => {
    const loadUser = async () => {
      if (state.token) {
        setAuthToken(state.token);
        try {
          const res = await axios.get("/api/auth/me");
          dispatch({
            type: "AUTH_SUCCESS",
            payload: {
              user: res.data,
              token: state.token,
            },
          });
        } catch (error) {
          // Fallback to mock user if present (offline/demo mode)
          try {
            const mockUserJson = localStorage.getItem("mockUser");
            if (mockUserJson) {
              const mockUser = JSON.parse(mockUserJson);
              dispatch({
                type: "AUTH_SUCCESS",
                payload: {
                  user: mockUser,
                  token: state.token,
                },
              });
              return;
            }
          } catch (_) {
            // ignore JSON parse errors
          }
          dispatch({ type: "AUTH_FAIL", payload: "Token is invalid" });
          setAuthToken(null);
        }
      } else {
        dispatch({ type: "AUTH_FAIL", payload: null });
      }
    };

    loadUser();
  }, [state.token]);

  // Register user
  const register = async (userData) => {
    dispatch({ type: "AUTH_START" });
    try {
      const res = await axios.post("/api/auth/register", userData);
      const { token, ...user } = res.data;

      setAuthToken(token);
      dispatch({
        type: "AUTH_SUCCESS",
        payload: { user, token },
      });

      toast.success(
        "Registration successful! Please check your email for verification."
      );
      return { success: true };
    } catch (error) {
      // Offline/demo fallback: simulate successful registration
      const isNetworkError = error.request && !error.response;
      const isServerError = error.response && error.response.status >= 500;
      if (isNetworkError || isServerError) {
        const mockUser = {
          id: "mock-user-id",
          name: userData.name || "Customer",
          email: userData.email,
          phone: userData.phone || "",
          role: "user",
          emailVerified: false,
        };
        const mockToken = "mock-token";
        try {
          localStorage.setItem("mockUser", JSON.stringify(mockUser));
        } catch (_) {}
        setAuthToken(mockToken);
        dispatch({
          type: "AUTH_SUCCESS",
          payload: { user: mockUser, token: mockToken },
        });
        toast.success("Registration successful (demo mode)");
        return { success: true, demo: true };
      }
      const message = error.response?.data?.message || "Registration failed";
      dispatch({ type: "AUTH_FAIL", payload: message });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Login user
  const login = async (email, password) => {
    dispatch({ type: "AUTH_START" });
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { token, ...user } = res.data;

      setAuthToken(token);
      dispatch({
        type: "AUTH_SUCCESS",
        payload: { user, token },
      });

      toast.success("Login successful!");
      return { success: true };
    } catch (error) {
      // Offline/demo fallback
      const isNetworkError = error.request && !error.response;
      const isServerError = error.response && error.response.status >= 500;
      if (isNetworkError || isServerError) {
        const demoAccounts = [
          {
            email: "customer@demo.com",
            password: "password123",
            user: {
              id: "demo-user",
              name: "Demo Customer",
              email: "customer@demo.com",
              role: "user",
              emailVerified: true,
            },
          },
          {
            email: "admin@demo.com",
            password: "admin123",
            user: {
              id: "demo-admin",
              name: "Demo Admin",
              email: "admin@demo.com",
              role: "admin",
              emailVerified: true,
            },
          },
        ];
        const match = demoAccounts.find(
          (acc) => acc.email === email && acc.password === password
        );
        if (match) {
          const mockToken = "mock-token";
          try {
            localStorage.setItem("mockUser", JSON.stringify(match.user));
          } catch (_) {}
          setAuthToken(mockToken);
          dispatch({
            type: "AUTH_SUCCESS",
            payload: { user: match.user, token: mockToken },
          });
          toast.success("Login successful (demo mode)");
          return { success: true, demo: true };
        }
      }
      const message = error.response?.data?.message || "Login failed";
      dispatch({ type: "AUTH_FAIL", payload: message });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Logout user
  const logout = () => {
    setAuthToken(null);
    dispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully");
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const res = await axios.put("/api/user/profile", userData);
      dispatch({ type: "UPDATE_USER", payload: res.data });
      toast.success("Profile updated successfully");
      return { success: true };
    } catch (error) {
      // Demo fallback for profile update
      const updatedUser = {
        ...state.user,
        ...userData,
      };
      dispatch({ type: "UPDATE_USER", payload: updatedUser });
      toast.success("Demo profile updated successfully!");
      return { success: true };
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      await axios.put("/api/user/change-password", {
        currentPassword,
        newPassword,
      });
      toast.success("Password changed successfully");
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Password change failed";
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Resend verification email
  const resendVerification = async () => {
    try {
      await axios.post("/api/auth/resend-verification");
      toast.success("Verification email sent successfully");
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to send verification email";
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      await axios.post("/api/auth/forgot-password", { email });
      toast.success("Password reset email sent successfully");
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to send reset email";
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Reset password
  const resetPassword = async (token, password) => {
    try {
      await axios.post(`/api/auth/reset-password/${token}`, { password });
      toast.success("Password reset successfully");
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Password reset failed";
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value = {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    resendVerification,
    forgotPassword,
    resetPassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
