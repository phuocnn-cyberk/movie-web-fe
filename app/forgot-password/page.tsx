"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Footer } from "@/components/common/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import { useResetPassword } from "@/hooks/auth/useResetPassword";
import { ROUTES } from "@/lib/routes";
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<"enter-email" | "enter-otp">("enter-email");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const forgotPasswordMutation = useForgotPassword();
  const resetPasswordMutation = useResetPassword();

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPasswordMutation.mutateAsync(email);
      toast.success("OTP has been sent to your email");
      setStep("enter-otp");
    } catch {
      toast.error("Failed to send OTP. Please check your email and try again.");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await resetPasswordMutation.mutateAsync({ email, otp, newPassword });
      toast.success("Password has been reset successfully");
      router.push(ROUTES.signIn);
    } catch {
      toast.error("Failed to reset password. Please check your OTP and try again.");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <Image src="/images/login-bg.png" alt="Background" layout="fill" objectFit="cover" className="opacity-50" />
      </div>

      <header className="container mx-auto px-12 py-6">
        <Link href="/">
          <Image
            src="/logos/stream-vibe-logo.svg"
            alt="StreamVibe"
            width={100}
            height={100}
            className="h-20 w-auto cursor-pointer"
          />
        </Link>
      </header>

      <main className="flex flex-grow items-center justify-center px-4">
        <div className="my-16 w-full max-w-md rounded-md bg-black/75 p-12 md:p-16">
          {step === "enter-email" ? (
            <>
              <h1 className="mb-2 text-3xl font-bold text-white">Forgot Password</h1>
              <p className="mb-8 text-zinc-400">Enter your email to receive an OTP code.</p>
              <form className="flex flex-col gap-6" onSubmit={handleSendEmail}>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  required
                  className="border-white/20 bg-transparent p-6 text-lg text-white shadow-none focus-visible:ring-0"
                  style={{
                    WebkitBoxShadow: "0 0 0 30px rgba(0,0,0,0.75) inset",
                    WebkitTextFillColor: "white",
                  }}
                />
                <Button
                  type="submit"
                  variant="destructive"
                  className="mt-6 h-12 w-full !bg-[#e50914] text-base font-bold"
                  disabled={forgotPasswordMutation.isPending}
                >
                  {forgotPasswordMutation.isPending ? "Sending..." : "Send OTP"}
                </Button>
              </form>
              <div className="mt-12 text-zinc-400">
                Remember your password?{" "}
                <Link href={ROUTES.signIn} className="font-semibold text-white hover:underline">
                  Sign in now.
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="mb-2 text-3xl font-bold text-white">Reset Password</h1>
              <p className="mb-8 text-zinc-400">
                An OTP has been sent to <strong>{email}</strong>. Please enter it below.
              </p>
              <form className="flex flex-col gap-6" onSubmit={handleResetPassword}>
                <Input
                  type="text"
                  placeholder="OTP Code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  autoComplete="off"
                  required
                  className="border-white/20 bg-transparent p-6 text-lg text-white shadow-none focus-visible:ring-0"
                  style={{
                    WebkitBoxShadow: "0 0 0 30px rgba(0,0,0,0.75) inset",
                    WebkitTextFillColor: "white",
                  }}
                />
                <Input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  className="border-white/20 bg-transparent p-6 text-lg text-white shadow-none focus-visible:ring-0"
                  style={{
                    WebkitBoxShadow: "0 0 0 30px rgba(0,0,0,0.75) inset",
                    WebkitTextFillColor: "white",
                  }}
                />
                <Input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  className="border-white/20 bg-transparent p-6 text-lg text-white shadow-none focus-visible:ring-0"
                  style={{
                    WebkitBoxShadow: "0 0 0 30px rgba(0,0,0,0.75) inset",
                    WebkitTextFillColor: "white",
                  }}
                />
                <Button
                  type="submit"
                  variant="destructive"
                  className="mt-6 h-12 w-full !bg-[#e50914] text-base font-bold"
                  disabled={resetPasswordMutation.isPending}
                >
                  {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
              <div className="mt-12 text-zinc-400">
                Didn&apos;t receive the code?{" "}
                <button onClick={() => setStep("enter-email")} className="font-semibold text-white hover:underline">
                  Try a different email.
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
