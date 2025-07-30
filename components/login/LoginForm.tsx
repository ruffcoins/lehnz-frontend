import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/common/FormField";
import { LoginFormData } from "@/lib/validators";

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
  const { register, formState: { errors }, watch } = form;
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
      <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Reset Your Password</h3>
          <p className="text-sm text-muted-foreground">
            Enter your email address and we&apos;ll send you a link to reset your password
          </p>
        </div>

        <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
          <FormField
            label="Email Address"
            error={errors.email?.message}
          >
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
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
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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
        <FormField
          label="Email Address"
          error={errors.email?.message}
        >
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="email"
              {...register("email")}
              placeholder="Enter your email address"
              className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
              autoComplete="email"
            />
          </div>
        </FormField>

        <FormField
          label="Password"
          error={errors.password?.message}
        >
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Enter your password"
              className={`pl-10 pr-10 ${errors.password ? "border-destructive" : ""}`}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </FormField>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="rememberMe" 
            {...register("rememberMe")}
          />
          <label 
            htmlFor="rememberMe" 
            className="text-sm text-muted-foreground cursor-pointer"
          >
            Remember me
          </label>
        </div>
        
        <button
          type="button"
          onClick={() => {
            setForgotPasswordEmail(watchedEmail || "");
            setShowForgotPassword(true);
          }}
          className="text-sm text-primary hover:underline"
        >
          Forgot password?
        </button>
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </div>
  );
}