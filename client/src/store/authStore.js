import { create } from "zustand";

const API_URL = "http://localhost:5000/api/auth";

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, name, role) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, name, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      set({
        isLoading: false,
        isAuthenticated: true,
        user: data.user,
      });
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.log("Signup error:", error.message);
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Verification failed");
      }

      // After successful verification, update user.isVerified locally if needed
      set((state) => ({
        isLoading: false,
        user: state.user ? { ...state.user, isVerified: true } : null,
      }));

      return true;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      return false;
    }
  },

 login: async (email, password) => {
  set({ isLoading: true, error: null });

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("Login failed:", data);
      throw new Error(data.message || "Login failed");
    }

    set({
      isAuthenticated: true,
      user: data.user,
      isLoading: false,
    });

    return true;
  } catch (error) {
    set({ error: error.message, isLoading: false });
    return false;
  }
},


  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await fetch(`${API_URL}/check-auth`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      if (data.user) {
        set({ isAuthenticated: true, user: data.user, isCheckingAuth: false });
      } else {
        set({ isAuthenticated: false, user: null, isCheckingAuth: false });
      }
    } catch (error) {
      set({ isCheckingAuth: false, isAuthenticated: false, user: null });
      console.log(error);
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      set({ isLoading: false, isAuthenticated: false, user: null });
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      set({ isLoading: false, message: data.message });
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.log(error);
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      set({ isLoading: false, message: data.message });
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.log(error);
      throw error;
    }
  },
}));
