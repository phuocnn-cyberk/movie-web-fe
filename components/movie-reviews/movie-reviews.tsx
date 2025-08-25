"use client";

import { useMovieReviews } from "@/hooks/reviews/useMovieReviews";
import { ROUTES } from "@/lib/routes";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteReviewDialog } from "./delete-review-dialog";
import { EditReviewDialog } from "./edit-review-dialog";

interface MovieReviewsProps {
  movieId: number;
}

const StarRatingSelector = ({ rating, onSelect }: { rating: number; onSelect: (rating: number) => void }) => {
  return (
    <div className="mb-2 flex cursor-pointer items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          onClick={() => onSelect(star)}
          className={`h-5 w-5 transition-all ${
            star <= rating ? "fill-[#E50000] text-[#E50000]" : "fill-[#262626] text-[#262626]"
          }`}
        />
      ))}
    </div>
  );
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? "fill-[#E50000] text-[#E50000]" : "fill-[#262626] text-[#262626]"}`}
        />
      ))}
    </div>
  );
};

export const MovieReviews: React.FC<MovieReviewsProps> = ({ movieId }) => {
  const {
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
  } = useMovieReviews(movieId);

  return (
    <section className="w-full py-10">
      <div className="w-full">
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E50000] to-[#B91C1C] shadow-xl">
              <span className="text-2xl font-bold text-white">⭐</span>
            </div>
            <div>
              <h2 className="font-[Manrope] text-4xl font-bold text-white">
                Reviews
                {ratings && ratings.length > 0 && (
                  <span className="ml-3 rounded-xl bg-[#E50000]/20 px-3 py-1 text-xl font-semibold text-[#E50000]">
                    {ratings.length}
                  </span>
                )}
              </h2>
              <p className="mt-2 text-lg text-[#999999]">
                {ratings && ratings.length > 0
                  ? `See what ${ratings.length} ${ratings.length === 1 ? "viewer thinks" : "viewers think"} about this movie`
                  : "Be the first to share your thoughts about this movie"}
              </p>
            </div>
          </div>

          {ratings && ratings.length > 0 && (
            <div className="hidden items-center gap-6 rounded-2xl bg-[#1A1A1A] p-4 shadow-lg sm:flex">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#E50000]">
                  {(ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length).toFixed(1)}
                </div>
                <div className="text-xs text-[#999999]">Average</div>
              </div>
              <div className="h-8 w-px bg-[#262626]" />
              <div className="flex flex-col gap-1">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = ratings.filter((r) => r.stars === star).length;
                  const percentage = (count / ratings.length) * 100;
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="w-3 text-[#999999]">{star}</span>
                      <div className="h-1 w-16 overflow-hidden rounded-full bg-[#262626]">
                        <div
                          className="h-full bg-[#E50000] transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-6 text-[#666666]">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="relative mb-16 overflow-hidden rounded-2xl border border-[#262626] bg-gradient-to-br from-[#1A1A1A] via-[#1F1F1F] to-[#0F0F0F] p-8 shadow-xl">
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_40%,rgba(229,0,0,0.4),transparent_70%)]" />
          </div>

          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#E50000] to-[#B91C1C] shadow-lg">
                <span className="text-xl font-bold text-white">✍️</span>
              </div>
              <div>
                <h3 className="font-[Manrope] text-2xl font-bold text-white">Write Your Review</h3>
                <p className="text-sm text-[#999999]">Share your experience and help others discover great content</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-3 block text-sm font-semibold text-white">Your Rating</label>
              <div className="flex items-center gap-4">
                <StarRatingSelector rating={newRating} onSelect={setNewRating} />
                {newRating > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[#E50000]">{newRating}.0</span>
                    <span className="text-sm text-[#999999]">
                      {newRating <= 2 && "Poor"}
                      {newRating === 3 && "Fair"}
                      {newRating === 4 && "Good"}
                      {newRating === 5 && "Excellent"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-3 block text-sm font-semibold text-white">Your Review</label>
              <div className="relative">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts about this movie... What did you like or dislike? Would you recommend it to others?"
                  rows={5}
                  className="w-full resize-none rounded-xl border border-[#262626] bg-[#0F0F0F] p-4 font-[Manrope] text-white placeholder-[#666666] transition-all focus:border-[#E50000] focus:ring-2 focus:ring-[#E50000]/20 focus:outline-none"
                />
                <div className="absolute right-3 bottom-3 text-xs text-[#666666]">{newComment.length}/500</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-[#666666]">
                <span>💡 </span>
                <span>Your review helps others make better choices!</span>
              </div>
              <button
                onClick={handleSubmit}
                disabled={newRating === 0 || newComment.trim() === ""}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#E50000] to-[#CC0000] px-8 py-3 font-[Manrope] text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#E50000]/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Submit Review</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#CC0000] to-[#B91C1C] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {ratings?.slice(0, visibleReviewsCount).map((review, index) => (
            <div
              key={`${review.movieId}-${review.userId}-${review.createdAt}-${index}`}
              className="group relative overflow-hidden rounded-2xl border border-[#262626] bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] p-6 shadow-lg transition-all duration-300 hover:border-[#E50000]/30 hover:shadow-xl hover:shadow-[#E50000]/10"
            >
              <div className="absolute inset-0 opacity-5">
                <div className="h-full w-full bg-[radial-gradient(circle_at_50%_120%,rgba(229,0,0,0.3),transparent_50%)]" />
              </div>

              <div className="absolute -top-2 -right-2 h-16 w-16">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#E50000] to-[#B91C1C] text-xs font-bold text-white opacity-80">
                  #{index + 1}
                </div>
              </div>

              <div className="relative z-10">
                <div className="mb-5 flex items-start gap-4">
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-[#E50000]/20 bg-gradient-to-br from-[#262626] to-[#1A1A1A] shadow-lg">
                      <Image
                        src={user?.avatar || "/logos/default-avatar.svg"}
                        alt={user?.name || "User"}
                        width={56}
                        height={56}
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-[#1A1A1A] bg-green-500 shadow-sm" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <h3 className="truncate font-[Manrope] text-lg font-bold text-white">
                        {user?.name || "Anonymous User"}
                      </h3>
                      <div className="rounded-full bg-[#E50000]/20 px-2 py-1">
                        <span className="text-xs font-medium text-[#E50000]">Verified</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                      <div className="flex items-center gap-1">
                        <StarRating rating={review.stars} />
                        <span className="ml-2 text-sm font-semibold text-[#E50000]">{review.stars}.0</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#999999]">
                        <span>•</span>
                        <time dateTime={review.createdAt}>
                          {new Date(review.createdAt).toLocaleDateString("vi-VN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <blockquote className="relative">
                    <div className="absolute -top-2 -left-2 text-4xl font-bold text-[#E50000]/20">&quot;</div>
                    <p className="pr-4 pl-6 font-[Manrope] text-base leading-relaxed text-[#CCCCCC]">
                      {review.comment}
                    </p>
                    <div className="absolute -right-2 -bottom-2 rotate-180 text-4xl font-bold text-[#E50000]/20">
                      &quot;
                    </div>
                  </blockquote>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-[#666666]">
                    <Link href={ROUTES.support}>Helpful?</Link>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(review)}
                      className="group/btn relative overflow-hidden rounded-lg bg-gradient-to-r from-[#E50000] to-[#CC0000] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#E50000]/30"
                    >
                      <span className="relative z-10">Edit</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#CC0000] to-[#B91C1C] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(review)}
                      className="group/btn relative overflow-hidden rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/30"
                    >
                      <span className="relative z-10">Delete</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {ratings && ratings.length > visibleReviewsCount && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="group relative overflow-hidden rounded-2xl border border-[#262626] bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] px-10 py-5 font-[Manrope] text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#E50000]/50 hover:shadow-2xl hover:shadow-[#E50000]/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#E50000]/10 to-[#CC0000]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative z-10 flex items-center gap-3">
                <span>Load More Reviews</span>
                <div className="flex items-center gap-1">
                  <span className="rounded-full bg-[#E50000] px-2 py-1 text-sm font-bold">
                    {ratings.length - visibleReviewsCount}
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-y-[-2px]">⬇️</span>
                </div>
              </span>
            </button>
          </div>
        )}

        <EditReviewDialog.Root
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedReview(null);
          }}
          onSubmit={handleEditSubmit}
          rating={selectedReview || undefined}
        >
          <EditReviewDialog.Header />
          <EditReviewDialog.Content />
        </EditReviewDialog.Root>

        <DeleteReviewDialog.Root
          isOpen={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setSelectedReview(null);
          }}
          onDelete={handleDeleteSubmit}
        >
          <DeleteReviewDialog.Header />
          <DeleteReviewDialog.Description />
          <DeleteReviewDialog.Actions />
        </DeleteReviewDialog.Root>
      </div>
    </section>
  );
};
