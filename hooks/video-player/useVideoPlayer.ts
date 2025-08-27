import { useQuery } from "@tanstack/react-query";
import { useState, useCallback, useRef, useEffect } from "react";
import { getPlaybackLink, fetchVideoStream, getWatchHistory, updateWatchProgress } from "@/services/api";
import { useAuthStore } from "@/stores/auth.store";
import { useGetPaymentsByUser } from "@/hooks/subcriptions/useGetPaymentsByUser";
import { PlaybackLinkDTO, VideoPlayerError, WatchHistory } from "@/types/api";
import type { RefObject } from "react";

interface UseVideoPlayerProps {
  movieId: number;
  iframeRef?: RefObject<HTMLIFrameElement> | null;
}

export const useVideoPlayer = ({ movieId, iframeRef = null }: UseVideoPlayerProps) => {
  const [error, setError] = useState<VideoPlayerError | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { accessToken } = useAuthStore();
  const { data: payments } = useGetPaymentsByUser();

  const hasActiveSubscription = payments?.some(
    (payment) => payment.paymentStatus === "SUCCESS" && payment.pricingId !== "free"
  );

  // playback link
  const {
    data: playback,
    isLoading: isPlaybackLoading,
    error: playbackError,
  } = useQuery<PlaybackLinkDTO, Error>({
    queryKey: ["playback", movieId],
    queryFn: () => getPlaybackLink(String(movieId)),
    enabled: !!accessToken && !!movieId,
    retry: false,
  });

  // video blob (for direct)
  const {
    data: videoBlob,
    isLoading: isStreamLoading,
    error: streamError,
  } = useQuery<Blob, Error>({
    queryKey: ["videoStream", movieId],
    queryFn: () => fetchVideoStream(movieId),
    enabled: !!playback && playback.type === "direct" && !!accessToken,
    retry: false,
  });

  // throttle: chỉ gửi progress mỗi N ms
  const lastUpdateRef = useRef<number>(0);
  const UPDATE_INTERVAL_MS = 5_000;

  // lấy % đã xem từ BE để hiển thị (ko resume time nữa vì bỏ lastPosition)
  useEffect(() => {
    if (!movieId) return;

    getWatchHistory()
      .then((history: WatchHistory[]) => {
        const item = history.find((h) => h.movieId === movieId);
        if (!item) return;

        console.log(`User đã xem: ${item.watchedPercent?.toFixed(2) || 0}%`);
      })
      .catch(() => {
        // ignore
      });
  }, [movieId]);

  // handle playback / stream errors
  useEffect(() => {
    if (playbackError) {
      const status = (playbackError as any)?.response?.status;
      if (status === 403) {
        setError({
          type: hasActiveSubscription ? "general" : "premium",
          message: hasActiveSubscription
            ? "System error: You have a subscription but are still blocked when loading video."
            : "This video requires a Premium subscription to watch",
        });
      } else if (status === 401) {
        setError({ type: "auth", message: "Please login to watch this video" });
      } else {
        setError({ type: "general", message: "Cannot load video" });
      }
    }
  }, [playbackError, hasActiveSubscription]);

  useEffect(() => {
    if (streamError) {
      const status = streamError?.message?.includes("403") ? 403 :
                     streamError?.message?.includes("401") ? 401 : 500;
      if (status === 403) {
        setError({
          type: hasActiveSubscription ? "general" : "premium",
          message: hasActiveSubscription
            ? "System error: You have a subscription but are still blocked when loading video."
            : "This video requires a Premium subscription to watch",
        });
      } else if (status === 401) {
        setError({ type: "auth", message: "Please login to watch this video" });
      } else {
        setError({ type: "general", message: "Cannot load video" });
      }
    }
  }, [streamError, hasActiveSubscription]);

  const handleVideoEnd = useCallback(() => setIsPlaying(false), []);
  const handleVideoPlay = useCallback(() => setIsPlaying(true), []);
  const handleVideoPause = useCallback(() => setIsPlaying(false), []);

  // SETUP HTML5 <video> (direct)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoBlob || !playback || playback.type !== "direct") {
      return;
    }

    let blobUrl: string | null = null;

    const setupVideo = () => {
      blobUrl = URL.createObjectURL(videoBlob as Blob);
      video.src = blobUrl;

      const handleEnded = () => handleVideoEnd();
      const handlePlay = () => handleVideoPlay();
      const handlePause = () => handleVideoPause();
      const handleCanPlayThrough = () => {
        video.play().catch(() => {});
      };
      const handleError = () => {
        setError({ type: "general", message: "Cannot play video" });
      };

      const handleProgressUpdate = () => {
        if (!video.duration || !movieId) return;
        const now = Date.now();
        if (now - lastUpdateRef.current < UPDATE_INTERVAL_MS) return;
        lastUpdateRef.current = now;

        const percent = (video.currentTime / video.duration) * 100;
        updateWatchProgress(movieId, { percent }).catch(() => {});
      };

      video.addEventListener("ended", handleEnded);
      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);
      video.addEventListener("canplaythrough", handleCanPlayThrough);
      video.addEventListener("error", handleError);
      video.addEventListener("timeupdate", handleProgressUpdate);
      video.addEventListener("seeked", handleProgressUpdate);

      return () => {
        video.removeEventListener("ended", handleEnded);
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("canplaythrough", handleCanPlayThrough);
        video.removeEventListener("error", handleError);
        video.removeEventListener("timeupdate", handleProgressUpdate);
        video.removeEventListener("seeked", handleProgressUpdate);
      };
    };

    const cleanup = setupVideo();

    return () => {
      cleanup?.();
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [videoBlob, playback, movieId, handleVideoEnd, handleVideoPlay, handleVideoPause]);

  // SETUP Bunny-embed (iframe) message handling
  useEffect(() => {
    if (!playback || playback.type !== "bunny-embed" || !iframeRef) return;

    let allowedOrigin = "*";
    try {
      allowedOrigin = new URL(playback.url).origin;
    } catch (err) {
      allowedOrigin = "*";
    }

    const handleMessage = (event: MessageEvent) => {
      if (allowedOrigin !== "*" && event.origin !== allowedOrigin) return;
      const data = event.data;
      if (!data || typeof data !== "object") return;

      const currentTime =
        (data.currentTime as number) ?? (data.playerCurrentTime as number) ?? (data.time as number) ?? null;
      const duration =
        (data.duration as number) ?? (data.playerDuration as number) ?? (data.total as number) ?? null;

      if (currentTime == null || duration == null) {
        const payload = (data.payload && typeof data.payload === "object") ? data.payload : null;
        if (payload) {
          const ct = (payload.currentTime as number) ?? (payload.time as number) ?? null;
          const d = (payload.duration as number) ?? null;
          if (ct != null && d != null) {
            const now = Date.now();
            if (now - lastUpdateRef.current < UPDATE_INTERVAL_MS) return;
            lastUpdateRef.current = now;

            const percent = (ct / d) * 100;
            updateWatchProgress(movieId, { percent }).catch(() => {});
          }
        }
        return;
      }

      const now = Date.now();
      if (now - lastUpdateRef.current < UPDATE_INTERVAL_MS) return;
      lastUpdateRef.current = now;

      const percent = (currentTime / duration) * 100;
      updateWatchProgress(movieId, { percent }).catch(() => {});
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [playback, iframeRef, movieId]);

  // if auth missing
  useEffect(() => {
    if (!accessToken) {
      setError({ type: "auth", message: "Please login to watch this video" });
    } else {
      setError(null);
    }
  }, [accessToken]);

  const isLoading = isPlaybackLoading || isStreamLoading;

  return {
    playback: playback as PlaybackLinkDTO | undefined,
    videoRef,
    isLoading,
    error,
    hasActiveSubscription,
    isPlaying,
    handleVideoEnd,
    handleVideoPlay,
    handleVideoPause,
  };
};
