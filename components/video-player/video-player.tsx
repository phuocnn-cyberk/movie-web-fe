"use client";

import { useGetPaymentsByUser } from "@/hooks/subcriptions/useGetPaymentsByUser";
import { useAuthStore } from "@/stores/auth.store";
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
  const [debugInfo, setDebugInfo] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const { accessToken, user } = useAuthStore();
  const { data: payments } = useGetPaymentsByUser();
  const router = useRouter();

  // Check if user has active subscription
  const hasActiveSubscription = payments?.some(
    (payment) => payment.paymentStatus === "SUCCESS" && payment.pricingId !== "free"
  );

  const streamUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/movies/${movieId}/stream`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !accessToken) return;

    const loadVideo = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Test endpoint trước
        const testResponse = await fetch(streamUrl, {
          method: "HEAD",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!testResponse.ok) {
          // Debug info
          const debugMsg = `
DEBUG INFO:
- User ID: ${user?.userID || "N/A"}
- Has Active Subscription: ${hasActiveSubscription || false}
- Payments Count: ${payments?.length || 0}
- Payment Status: ${payments?.map((p) => `${p.pricingId}:${p.paymentStatus}`).join(", ") || "None"}
- HTTP Status: ${testResponse.status}
- Movie ID: ${movieId}
          `.trim();
          setDebugInfo(debugMsg);
          console.log("VideoPlayer Debug Info:", debugMsg);

          if (testResponse.status === 403) {
            if (hasActiveSubscription) {
              setErrorType("general");
              throw new Error("Lỗi hệ thống: Bạn đã có subscription nhưng vẫn bị chặn. Vui lòng liên hệ support.");
            } else {
              setErrorType("premium");
              throw new Error("Video này yêu cầu gói Premium để xem");
            }
          } else if (testResponse.status === 401) {
            setErrorType("auth");
            throw new Error("Vui lòng đăng nhập để xem video");
          } else {
            setErrorType("general");
            throw new Error(`HTTP ${testResponse.status} - Không thể truy cập video`);
          }
        }

        // Fetch video blob với authentication
        const response = await fetch(streamUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            if (hasActiveSubscription) {
              setErrorType("general");
              throw new Error("Lỗi hệ thống: Bạn đã có subscription nhưng vẫn bị chặn khi tải video.");
            } else {
              setErrorType("premium");
              throw new Error("Video này yêu cầu gói Premium để xem");
            }
          } else if (response.status === 401) {
            setErrorType("auth");
            throw new Error("Vui lòng đăng nhập để xem video");
          } else {
            setErrorType("general");
            throw new Error(`HTTP ${response.status} - Không thể tải video`);
          }
        }

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        video.src = blobUrl;

        video.addEventListener("loadstart", () => {
          setIsLoading(false);
        });

        video.addEventListener("error", () => {
          setError("Không thể phát video");
          setIsLoading(false);
        });

        video.addEventListener("canplay", () => {
          setIsLoading(false);
        });

        // Auto play when loaded
        video.addEventListener("canplaythrough", () => {
          video.play().catch(() => {
            console.log("Auto-play prevented");
          });
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Lỗi không xác định";
        setError(errorMessage);
        if (!errorMessage.includes("Premium") && !errorMessage.includes("đăng nhập")) {
          setErrorType("general");
        }
        setIsLoading(false);
      }
    };

    loadVideo();

    // Cleanup blob URL khi component unmount
    return () => {
      if (video && video.src) {
        URL.revokeObjectURL(video.src);
      }
    };
  }, [movieId, accessToken, streamUrl]);

  const handleUpgradeClick = () => {
    router.push("/subscriptions");
  };

  const handleLoginClick = () => {
    router.push("/sign-in");
  };

  if (error) {
    return (
      <div className={`relative flex h-full w-full items-center justify-center rounded-xl bg-black ${className}`}>
        <div className="max-w-md p-8 text-center">
          {errorType === "premium" ? (
            <div className="space-y-6">
              {/* Premium Required Icon */}
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

              {/* Premium Message */}
              <div>
                <h3 className="mb-2 text-2xl font-bold text-white">Nội dung Premium</h3>
                <p className="mb-4 text-gray-300">
                  Video này chỉ dành cho thành viên Premium. Nâng cấp tài khoản để thưởng thức toàn bộ thư viện phim và
                  chương trình chất lượng cao.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={handleUpgradeClick}
                  className="rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
                >
                  Nâng cấp Premium
                </button>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="rounded-lg border border-gray-600 bg-transparent px-6 py-3 text-white transition-colors hover:bg-gray-800"
                  >
                    Đóng
                  </button>
                )}
              </div>
            </div>
          ) : errorType === "auth" ? (
            <div className="space-y-6">
              {/* Auth Required Icon */}
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

              {/* Auth Message */}
              <div>
                <h3 className="mb-2 text-2xl font-bold text-white">Yêu cầu đăng nhập</h3>
                <p className="mb-4 text-gray-300">
                  Bạn cần đăng nhập để xem video này. Vui lòng đăng nhập hoặc tạo tài khoản mới.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={handleLoginClick}
                  className="rounded-lg bg-[#E50000] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#CC0000]"
                >
                  Đăng nhập
                </button>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="rounded-lg border border-gray-600 bg-transparent px-6 py-3 text-white transition-colors hover:bg-gray-800"
                  >
                    Đóng
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* General Error */}
              <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
                <strong>Lỗi:</strong> {error}
              </div>

              {/* Debug Info */}
              {debugInfo && (
                <details className="rounded border border-gray-400 bg-gray-100 p-3">
                  <summary className="cursor-pointer font-semibold text-gray-700">
                    🔍 Thông tin debug (nhấn để xem)
                  </summary>
                  <pre className="mt-2 text-xs whitespace-pre-wrap text-gray-600">{debugInfo}</pre>
                </details>
              )}

              {onClose && (
                <button
                  onClick={onClose}
                  className="rounded-lg bg-[#E50000] px-6 py-2 text-white transition-colors hover:bg-[#CC0000]"
                >
                  Đóng video
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
        poster="" // Remove poster to show loading state
      >
        <source type="video/mp4" />
        Trình duyệt không hỗ trợ video HTML5.
      </video>

      {/* Close button overlay */}
      {onClose && (
        <button
          onClick={onClose}
          className="bg-opacity-50 hover:bg-opacity-75 absolute top-4 right-4 z-20 rounded-full bg-black p-2 text-white transition-all"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;
