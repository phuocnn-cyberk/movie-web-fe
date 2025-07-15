"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Footer } from "@/components/common/footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn } from "@/hooks/auth/useSignIn";
import { ROUTES } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signInMutation = useSignIn();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInMutation.mutateAsync({ email, password });
      toast.success("Sign in successful");
      router.push(ROUTES.home);
    } catch {
      toast.error("Sign in failed");
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
          <h1 className="mb-8 text-3xl font-bold text-white">Sign in</h1>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              className="border-white/20 bg-transparent p-6 text-lg text-white shadow-none focus-visible:ring-0"
              style={{
                WebkitBoxShadow: "0 0 0 30px rgba(0,0,0,0.75) inset",
                WebkitTextFillColor: "white",
              }}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
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
              disabled={signInMutation.isPending}
            >
              {signInMutation.isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <div className="mt-4 flex items-center justify-between text-sm text-zinc-400">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                className="border-zinc-400 data-[state=checked]:bg-zinc-700 data-[state=checked]:text-black"
              />
              <Label htmlFor="remember" className="cursor-pointer select-none">
                Remember me
              </Label>
            </div>
            <Link href="#" className="hover:underline">
              Need help?
            </Link>
          </div>
          <div className="mt-12 text-zinc-400">
            New to StreamVibe?{" "}
            <Link href={ROUTES.signUp} className="font-semibold text-white hover:underline">
              Sign up now.
            </Link>
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            This page is protected by Google reCAPTCHA to ensure you&apos;re not a bot.{" "}
            <button className="text-blue-600 hover:underline">Learn more.</button>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
