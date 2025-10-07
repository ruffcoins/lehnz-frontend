import { ChevronLeft } from "lucide-react";
import React from "react";
import { Label } from "@/features/shared/ui/label";
import { Input } from "@/features/shared/ui/input";
import Link from "next/link";
import { Button } from "@/features/shared/ui/button";

const EnterEmail = () => {
  return (
    <div className="flex h-screen w-screen flex-col bg-slate-100">
      <div className="flex w-full items-center justify-start gap-4 px-12 py-4">
        <ChevronLeft className="h-8 w-8" />
        <h4 className="text-primary text-2xl font-medium uppercase">Pure Engineering</h4>
      </div>
      <div className="w-full grow">
        <div className="mx-auto flex max-w-lg flex-col pt-20">
          <h1 className="text-center text-4xl font-semibold">Create your account</h1>
          <div className="mt-10 rounded bg-white px-8 py-10 drop-shadow">
            <form>
              <Label className="mb-1.5 text-xs font-normal text-slate-500" htmlFor="email">
                Your email address
              </Label>
              <Input type="email" placeholder="Type your email address" />

              <p className="mt-8 text-center text-sm">
                By clicking Agree and Continue, you agree to our{" "}
                <Link
                  className="text-primary hover:text-primary/80 underline"
                  href="/terms-of-service"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  className="text-primary hover:text-primary/80 underline"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </Link>
                .
              </p>

              <Button size="lg" className="mt-4 w-full text-lg">
                Agree and Continue
              </Button>
            </form>
          </div>

          <p className="mt-6 px-4 text-center text-sm">
            Sign up now, and publishing is free forever. Once you start charging for subscriptions,
            we take 10% in addition to credit card transaction fees.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnterEmail;
