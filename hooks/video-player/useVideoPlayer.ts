import { useQuery } from "@tanstack/react-query";
import { useState, useCallback, useRef, useEffect } from "react";
import { getPlaybackLink, fetchVideoStream } from "@/services/api";
import { useAuthStore } from "@/stores/auth.store";
import { useGetPaymentsByUser } from "@/hooks/subcriptions/useGetPaymentsByUser";
import { PlaybackLinkDTO, VideoPlayerError } from "@/types/api";

interface UseVideoPlayerProps {
  movieId: number;
}

export const useVideoPlayer = ({ movieId }: UseVideoPlayerProps) => {
  const [error, setError] = useState<VideoPlayerError | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { accessToken } = useAuthStore();
  const { data: payments } = useGetPaymentsByUser();

  const hasActiveSubscription = payments?.some(
    (payment) => payment.paymentStatus === "SUCCESS" && payment.pricingId !== "free"
  );

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
        setError({
          type: "auth",
          message: "Please login to watch this video",
        });
      } else {
        setError({
          type: "general",
          message: "Cannot load video",
        });
      }
    }
  }, [playbackError, hasActiveSubscription]);

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
        setError({
          type: "auth",
          message: "Please login to watch this video",
        });
      } else {
        setError({
          type: "general",
          message: "Cannot load video",
        });
      }
    }
  }, [streamError, hasActiveSubscription]);

  const handleVideoEnd = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleVideoPlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handleVideoPause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoBlob || !playback || playback.type !== "direct") {
      return;
    }

    let blobUrl: string | null = null;

    const setupVideo = () => {
      blobUrl = URL.createObjectURL(videoBlob as Blob);
      video.src = blobUrl;

      const handleEnded = () => {
        handleVideoEnd();
      };

      const handlePlay = () => {
        handleVideoPlay();
      };

      const handlePause = () => {
        handleVideoPause();
      };

      const handleCanPlayThrough = () => {
        video.play().catch(() => {
        });
      };

      const handleError = () => {
        setError({
          type: "general",
          message: "Cannot play video",
        });
      };

      video.addEventListener("ended", handleEnded);
      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);
      video.addEventListener("canplaythrough", handleCanPlayThrough);
      video.addEventListener("error", handleError);

      return () => {
        video.removeEventListener("ended", handleEnded);
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("canplaythrough", handleCanPlayThrough);
        video.removeEventListener("error", handleError);
      };
    };

    const cleanup = setupVideo();

    return () => {
      cleanup?.();
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [videoBlob, playback, handleVideoEnd, handleVideoPlay, handleVideoPause]);

  useEffect(() => {
    if (!accessToken) {
      setError({
        type: "auth",
        message: "Please login to watch this video",
      });
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
