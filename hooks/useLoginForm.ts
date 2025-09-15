import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/lib/validators";

export function useLoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log("Login data:", data);
      // Here you would typically make an API call to authenticate the user

      // For demo purposes, let's simulate success
      alert(`Login successful! Welcome back, ${data.email}`);

      // In a real app, you would:
      // 1. Store auth tokens
      // 2. Redirect to dashboard
      // 3. Update global auth state
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
