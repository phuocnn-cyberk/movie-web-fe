"use client";

import { useGetPaymentsByUser } from "@/hooks/subcriptions/useGetPaymentsByUser";
import { ROUTES } from "@/lib/routes";
import { useAuthStore } from "@/stores/auth.store";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  movieId: number;
  onClose?: () => void;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ movieId, onClose, className = "" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<"general" | "premium" | "auth">("general");
  const videoRef = useRef<HTMLVideoElement>(null);
  const { accessToken } = useAuthStore();
  const { data: payments } = useGetPaymentsByUser();
  const router = useRouter();

  const hasActiveSubscription = payments?.some(
    (payment) => payment.paymentStatus === "SUCCESS" && payment.pricingId !== "free"
  );

  const streamUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/movies/${movieId}/stream`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!accessToken) {
      setErrorType("auth");
      setError("Please login to watch this video");
      setIsLoading(false);
      return;
    }

    const loadVideo = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(streamUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            if (hasActiveSubscription) {
              setErrorType("general");
              throw new Error("System error: You have a subscription but are still blocked when loading video.");
            } else {
              setErrorType("premium");
              throw new Error("This video requires a Premium subscription to watch");
            }
          } else if (response.status === 401) {
            setErrorType("auth");
            throw new Error("Please login to watch this video");
          } else {
            setErrorType("general");
            throw new Error(`HTTP ${response.status} - Cannot load video`);
          }
        }

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        video.src = blobUrl;

        video.addEventListener("loadstart", () => {
          setIsLoading(false);
        });

        video.addEventListener("error", () => {
          setError("Cannot play video");
          setIsLoading(false);
        });

        video.addEventListener("canplay", () => {
          setIsLoading(false);
        });

        video.addEventListener("canplaythrough", () => {
          video.play().catch(() => {
            console.log("Auto-play prevented");
          });
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        if (!errorMessage.includes("Premium") && !errorMessage.includes("đăng nhập")) {
          setErrorType("general");
        }
        setIsLoading(false);
      }
    };

    loadVideo();

    return () => {
      if (video && video.src) {
        URL.revokeObjectURL(video.src);
      }
    };
  }, [movieId, accessToken, streamUrl, hasActiveSubscription]);

  const handleUpgradeClick = () => {
    router.push(ROUTES.subscriptions);
  };

  const handleLoginClick = () => {
    router.push(ROUTES.signIn);
  };

  if (error) {
    return (
      <div className={`relative flex h-full w-full items-center justify-center rounded-xl bg-black ${className}`}>
        <div className="max-w-md p-8 text-center">
          {errorType === "premium" ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 p-4">
                  <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-2xl font-bold text-white">Premium Content</h3>
                <p className="mb-4 text-gray-300">
                  This content is only available to premium members. Upgrade your account to enjoy all the movies and
                  shows.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={handleUpgradeClick}
                  className="rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
                >
                  Upgrade Premium
                </button>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="rounded-lg border border-gray-600 bg-transparent px-6 py-3 text-white transition-colors hover:bg-gray-800"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          ) : errorType === "auth" ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="rounded-full bg-blue-500 p-4">
                  <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-2xl font-bold text-white">Login Required</h3>
                <p className="mb-4 text-gray-300">
                  You need to login to watch this video. Please login or create a new account.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={handleLoginClick}
                  className="rounded-lg bg-[#E50000] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#CC0000]"
                >
                  Login
                </button>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="rounded-lg border border-gray-600 bg-transparent px-6 py-3 text-white transition-colors hover:bg-gray-800"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
                <strong>Error:</strong> {error}
              </div>

              {onClose && (
                <button
                  onClick={onClose}
                  className="rounded-lg bg-[#E50000] px-6 py-2 text-white transition-colors hover:bg-[#CC0000]"
                >
                  Close
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full rounded-xl bg-black ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[#E50000]"></div>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        controls
        className="h-full w-full rounded-xl object-cover"
        preload="metadata"
        playsInline
        poster=""
      >
        <source type="video/mp4" />
        Browser does not support HTML5 video.
      </video>

      {onClose && (
        <button
          onClick={onClose}
          className="bg-opacity-50 hover:bg-opacity-75 absolute top-4 right-4 z-20 rounded-full bg-black p-2 text-white transition-all"
        >
          <X className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;
