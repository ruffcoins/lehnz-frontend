"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/features/shared/ui/button";
import { useUser } from "@/features/auth/context/UserContext";
import { useAuth } from "@/features/auth/hooks/useAuth";
import AuthModal from "@/features/auth/components/AuthModal";
import { User, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, isAuthenticated } = useUser();
  const { openAuthModal, closeAuthModal, handleAuthSuccess, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<"login" | "signup">("signup");

  const handleSignIn = () => {
    setAuthModalView("login");
    setIsAuthModalOpen(true);
  };

  const handleSignUp = () => {
    setAuthModalView("signup");
    setIsAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
    closeAuthModal();
  };

  return (
    <nav className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-100 border-b backdrop-blur">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-foreground text-xl font-bold">
              Pure Engineering
            </Link>
            <div className="hidden items-center gap-6 md:flex">
              <Link
                href="/explore"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                Explore
              </Link>
              <Link
                href="/reading-list"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                Reading List
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                Writers
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                About
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                    <User className="text-primary h-4 w-4" />
                  </div>
                  <span className="text-foreground text-sm font-medium">
                    Welcome, {user?.name || user?.email || "Guest"}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={handleSignIn}>
                  Sign in
                </Button>
                <Button size="sm" onClick={handleSignUp}>
                  Get started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleAuthModalClose}
        onAuthSuccess={handleAuthSuccess}
        initialView={authModalView}
      />
    </nav>
  );
}
