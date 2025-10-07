import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/features/shared/ui/button";
import { Input } from "@/features/shared/ui/input";
import { Checkbox } from "@/features/shared/ui/checkbox";
import { FormField } from "@/features/shared/ui/FormField";
import { LoginFormData } from "@/features/auth/utils/validators";

interface LoginFormProps {
  form: UseFormReturn<LoginFormData>;
  isSubmitting: boolean;
  showPassword: boolean;
  onTogglePassword: () => void;
  onForgotPassword: (email: string) => void;
}

export default function LoginForm({
  form,
  isSubmitting,
  showPassword,
  onTogglePassword,
  onForgotPassword,
}: LoginFormProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = form;
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isSendingReset, setIsSendingReset] = useState(false);

  const watchedEmail = watch("email");

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotPasswordEmail) return;

    setIsSendingReset(true);
    await onForgotPassword(forgotPasswordEmail);
    setIsSendingReset(false);
    setShowForgotPassword(false);
    setForgotPasswordEmail("");
  };

  if (showForgotPassword) {
    return (
      <div className="animate-in slide-in-from-right-5 space-y-6 duration-300">
        <div className="text-center">
          <h3 className="mb-2 text-lg font-semibold">Reset Your Password</h3>
          <p className="text-muted-foreground text-sm">
            Enter your email address and we&apos;ll send you a link to reset your password
          </p>
        </div>

        <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
          <FormField label="Email Address" error={errors.email?.message}>
            <div className="relative">
              <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                type="email"
                value={forgotPasswordEmail}
                onChange={e => setForgotPasswordEmail(e.target.value)}
                placeholder="Enter your email address"
                className="pl-10"
                required
              />
            </div>
          </FormField>

          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full"
              disabled={isSendingReset || !forgotPasswordEmail}
            >
              {isSendingReset ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setShowForgotPassword(false)}
            >
              Back to Login
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField label="Email Address" error={errors.email?.message}>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              type="email"
              {...register("email")}
              placeholder="Enter your email address"
              className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
              autoComplete="email"
            />
          </div>
        </FormField>

        <FormField label="Password" error={errors.password?.message}>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Enter your password"
              className={`pr-10 pl-10 ${errors.password ? "border-destructive" : ""}`}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={onTogglePassword}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transform transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </FormField>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="rememberMe" {...register("rememberMe")} />
          <label htmlFor="rememberMe" className="text-muted-foreground cursor-pointer text-sm">
            Remember me
          </label>
        </div>

        <button
          type="button"
          onClick={() => {
            setForgotPasswordEmail(watchedEmail || "");
            setShowForgotPassword(true);
          }}
          className="text-primary text-sm hover:underline"
        >
          Forgot password?
        </button>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </div>
  );
}
