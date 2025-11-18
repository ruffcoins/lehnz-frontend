import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/features/auth/utils/validators";
import { apiRequest } from "@/features/shared/utils/api";
import { useAuth } from "./useAuth";

export function useLoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { handleSubmit, reset } = form;

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);

    try {
      const response = await apiRequest("POST", "/api/auth/login", data);
      const userData = await response.json();

      signIn(userData.user);

      alert(`Login successful! Welcome back, ${data.email}`);
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = async (email: string) => {
    try {
      // Simulate forgot password API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Password reset email sent to:", email);
      alert(`Password reset instructions sent to ${email}`);
    } catch (error) {
      console.error("Forgot password error:", error);
      alert("Error sending password reset email. Please try again.");
    }
  };

  return {
    form,
    isSubmitting,
    showPassword,
    onSubmit: handleSubmit(onSubmit),
    togglePasswordVisibility,
    handleForgotPassword,
    reset,
  };
}
