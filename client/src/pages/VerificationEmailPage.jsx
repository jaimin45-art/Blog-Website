import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export function VerificationEmailPage() {
  const [value, setValue] = useState("");
  const { verifyEmail, isLoading } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (value.length !== 6) {
      toast({
        title: "Invalid Code ❌",
        description: "Code must be 6 digits.",
        variant: "destructive",
      });
      return;
    }
    const success = await verifyEmail(value);

    if (success) {
      toast({
        title: "Email Verified ✅",
        description: "Please login to continue.",
      });

      navigate("/login");
    } else {
      toast({
        title: "Invalid Code ❌",
        description: "Please enter the correct code.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#E6FFFA] flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden">

        {/* Top Image (Optional - Matching login visual section) */}
        <div className="w-full h-40 overflow-hidden">
          <img
            src="/girl.jpeg"
            alt="Email verification visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2">
            Verify Your Email
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6 font-light">
            Welcome to our blog – where stories inspire, ideas grow, and voices shine 🌿
          </p>

          {/* OTP Input */}
          <InputOTP maxLength={6} value={value} onChange={setValue}>
            <InputOTPGroup className="justify-center gap-2">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          {/* Message Below OTP */}
          <div className="text-center text-sm text-gray-500 mt-2">
            {value === "" ? "Enter your verification email code." : `You entered: ${value}`}
          </div>

          {/* Button */}
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-[#FFD6EC] hover:bg-[#ffb8e1] text-black font-semibold py-2 rounded mt-6 transition"
          >
            {isLoading ? "Verifying..." : "Verify Email Now"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VerificationEmailPage;
