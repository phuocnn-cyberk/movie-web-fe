import { useDeleteRating, useRatingMovie, useUpdateRating } from "@/hooks/rating/useRatingMovie";
import { useAuthStore } from "@/stores/auth.store";
import { Rating } from "@/types/api";
import { useState } from "react";
import { useGetRatingMovieById } from "../rating/useGetRatingMovieById";

export const useMovieReviews = (movieId: number) => {
  const user = useAuthStore((state) => state.user);
  const { mutate: ratingMovie } = useRatingMovie(movieId);
  const { data: ratings } = useGetRatingMovieById(movieId);
  const { mutate: updateRating } = useUpdateRating(movieId);
  const { mutate: deleteRating } = useDeleteRating(movieId);

  const [newComment, setNewComment] = useState<string>("");
  const [newRating, setNewRating] = useState<number>(0);
  const [visibleReviewsCount, setVisibleReviewsCount] = useState<number>(4);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<Rating | null>(null);

  const handleSubmit = () => {
    if (newRating === 0 || newComment.trim() === "" || !user) return;
    ratingMovie({
      movieId,
      stars: newRating,
      comment: newComment,
      userId: user?.userID || 0,
      createdAt: new Date().toISOString(),
    });
    setNewRating(0);
    setNewComment("");
  };

  const handleEditClick = (review: Rating) => {
    setSelectedReview(review);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = (data: { stars: number; comment: string }) => {
    const ratingId = selectedReview?.ratingId;
    if (!ratingId) {
      console.error("No rating ID found in selectedReview:", selectedReview);
      return;
    }
    updateRating({
      ratingId: ratingId,
      data: {
        movieId: selectedReview.movieId,
        userId: selectedReview.userId,
        stars: data.stars,
        comment: data.comment,
        createdAt: selectedReview.createdAt,
      },
    });
    setIsEditDialogOpen(false);
    setSelectedReview(null);
  };

  const handleDeleteClick = (review: Rating) => {
    setSelectedReview(review);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteSubmit = () => {
    if (!selectedReview?.ratingId) return;
    deleteRating(selectedReview.ratingId);
    setIsDeleteDialogOpen(false);
    setSelectedReview(null);
  };

  const handleLoadMore = () => {
    setVisibleReviewsCount((prev) => prev + 4);
  };

  return {
    user,
    ratings,
    newComment,
    setNewComment,
    newRating,
    setNewRating,
    visibleReviewsCount,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    selectedReview,
    setSelectedReview,
    handleSubmit,
    handleEditClick,
    handleEditSubmit,
    handleDeleteClick,
    handleDeleteSubmit,
    handleLoadMore,
  };
};
