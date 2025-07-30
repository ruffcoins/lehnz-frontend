"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoginForm } from "@/hooks/useLoginForm";
import LoginForm from "@/components/login/LoginForm";
import SocialLogins from "@/components/login/SocialLogins";
import DemoAlert from "@/components/login/DemoAlert";

export default function LoginPage() {
  const {
    form,
    isSubmitting,
    showPassword,
    onSubmit,
    togglePasswordVisibility,
    handleForgotPassword,
  } = useLoginForm();

  const handleSocialLogin = (provider: string) => {
    // Simulate social login
    console.log(`Logging in with ${provider}`);
    alert(`${provider} login coming soon!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your Lehnz account to continue
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Demo Alert */}
          <DemoAlert
            type="info"
            title="Demo Mode"
            description="This is a demo login form. Use any email and password to test the functionality."
          />

          <form onSubmit={onSubmit} className="space-y-6">
            <LoginForm
              form={form}
              isSubmitting={isSubmitting}
              showPassword={showPassword}
              onTogglePassword={togglePasswordVisibility}
              onForgotPassword={handleForgotPassword}
            />
          </form>

          <div className="mt-6">
            <SocialLogins
              onGoogleLogin={() => handleSocialLogin("Google")}
              onGitHubLogin={() => handleSocialLogin("GitHub")}
              isLoading={isSubmitting}
            />
          </div>

          {/* Sign up link */}
          <div className="text-center mt-8 pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}