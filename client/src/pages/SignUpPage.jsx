import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const { signup, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(
        formData.email,
        formData.password,
        formData.name,
        formData.role
      );
      navigate("/verify-email");
    } catch (err) {
      console.error("Signup failed:", err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#E6FFFA]">
      <main className="flex flex-1 flex-col md:flex-row items-center justify-center">
        
        {/* Left: Form Area */}
        <div className="w-full md:w-1/2 p-10 md:p-20">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Ready to start your success story?</h2>

            {/* Blog Description */}
            <p className="text-[#333] font-serif mb-6 text-base leading-relaxed">
              Welcome to a world of words and wonder — our blog is a haven for readers, writers, and wanderers of thought. 
              From book reviews to personal insights, discover stories that spark your mind and touch your heart.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="name"
                    name="name"
                    placeholder="Jane Doe"
                    className="pl-10"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="janedoe@mail.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">Area of Interest</Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    id="role"
                    name="role"
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded w-full"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-center text-sm">
                <input type="checkbox" required className="mr-2" />
                <span>I agree to the <a href="#" className="text-blue-600 underline">Terms & Conditions</a></span>
              </div>

              {/* Error */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Submit */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  className="w-full bg-[#FFD6EC] hover:bg-[#ffb8e1] text-black font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing up..." : "Sign Up"}
                </Button>
              </motion.div>

              {/* Link to login */}
              <p className="text-center text-sm mt-4">
                Already have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </p>
            </form>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="hidden md:block md:w-1/2 bg-[#FFF5F5] h-full flex items-center justify-center">
          <img
            src="/public/girl.jpeg"
            alt="Reading girl illustration"
            className="max-w-md w-full object-contain"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-pink-300 text-gray-900 text-center py-2 text-sm">
        BLOG WEBSITE 2025. All rights reserved.
      </footer>
    </div>
  );
}
