"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/features/shared/ui/button";
import { Input } from "@/features/shared/ui/input";
import { Label } from "@/features/shared/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/features/shared/ui/dialog";
import { Github, Mail, ArrowRight, X } from "lucide-react";
import { apiRequest } from "@/features/shared/utils/api";
import { useAuth } from "../hooks/useAuth";
import { API_ENDPOINTS } from "@/features/shared/utils/consts";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
  initialView?: "login" | "signup";
}

export default function AuthModal({
  isOpen,
  onClose,
  onAuthSuccess,
  initialView = "signup",
}: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [isEmailMode, setIsEmailMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const { signIn } = useAuth();

  const handleGitHubAuth = async () => {
    setIsLoading(true);
    try {
      const response = await apiRequest("POST", API_ENDPOINTS.AUTH.SIGNUP, {
        email: "github.user@example.com",
        name: "GitHub User",
      });
      const data = await response.json();
      signIn(data.user);
      onAuthSuccess?.();
      onClose();
    } catch (error) {
      console.error("GitHub auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      const response = await apiRequest("POST", API_ENDPOINTS.AUTH.SIGNUP, {
        email: "google.user@example.com",
        name: "Google User",
      });
      const data = await response.json();
      signIn(data.user);
      onAuthSuccess?.();
      onClose();
    } catch (error) {
      console.error("Google auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiRequest("POST", API_ENDPOINTS.AUTH.SEND_VERIFICATION_EMAIL, {
        email,
      });
      setMagicLinkSent(true);
    } catch (error) {
      console.error("Email auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLinkLogin = async () => {
    setIsLoading(true);
    const endpoint =
      initialView === "signup" ? API_ENDPOINTS.AUTH.SIGNUP : API_ENDPOINTS.AUTH.LOGIN;
    try {
      const response = await apiRequest("POST", endpoint, {
        email,
      });
      const data = await response.json();
      signIn(data.user);
      onAuthSuccess?.();
      onClose();
    } catch (error) {
      console.error("Magic link login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setIsEmailMode(false);
    setMagicLinkSent(false);
    setEmail("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetState}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground text-center text-2xl font-bold">
            {initialView === "signup" ? "Join Pure Engineering" : "Sign in to Pure Engineering"}
          </DialogTitle>
        </DialogHeader>

        <motion.div initial="hidden" animate="visible" exit="exit" className="space-y-6">
          {!isEmailMode ? (
            <>
              {/* Social Auth Options */}
              <div className="space-y-4">
                <Button
                  onClick={handleGitHubAuth}
                  disabled={isLoading}
                  size="lg"
                  className="w-full bg-[#24292e] text-white hover:bg-[#24292e]/90"
                >
                  <Github className="mr-2 h-5 w-5" />
                  Continue with GitHub
                </Button>

                <Button
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                  size="lg"
                  variant="outline"
                  className="w-full"
                >
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="border-border w-full border-t" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-background text-muted-foreground px-2">Or</span>
                </div>
              </div>

              {/* Email Option */}
              <Button
                onClick={() => setIsEmailMode(true)}
                variant="outline"
                size="lg"
                className="w-full"
              >
                <Mail className="mr-2 h-5 w-5" />
                Continue with Email
              </Button>
            </>
          ) : !magicLinkSent ? (
            <>
              {/* Email Form */}
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="text-base"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  size="lg"
                  className="w-full"
                >
                  {isLoading ? "Sending..." : "Send Magic Link"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              {/* Back to Social Auth */}
              <Button
                onClick={() => setIsEmailMode(false)}
                variant="ghost"
                size="sm"
                className="w-full"
              >
                <X className="mr-2 h-4 w-4" />
                Back to other options
              </Button>
            </>
          ) : (
            <div className="text-center">
              <h3 className="mb-4 text-xl font-semibold">Check your inbox</h3>
              <p className="text-muted-foreground mb-6">
                We&apos;ve sent a magic link to <strong>{email}</strong>. Click the link to sign in.
              </p>
              <Button onClick={handleMagicLinkLogin} size="lg" className="w-full">
                Continue (Simulate Link Click)
              </Button>
            </div>
          )}

          {/* Terms */}
          <p className="text-muted-foreground text-center text-xs leading-relaxed">
            By continuing, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
