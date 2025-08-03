"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface Review {
  id: number;
  userName: string;
  userAvatar: string;
  rating: number;
  reviewText: string;
  date: string;
}

interface MovieReviewsProps {
  movieId: string;
}

const initialMockReviews: Review[] = [
  {
    id: 1,
    userName: "Alex Thompson",
    userAvatar: "/images/avatars/user1.png",
    rating: 5,
    reviewText: "This movie is absolutely incredible!",
    date: "2 days ago",
  },
  {
    id: 2,
    userName: "Sarah Johnson",
    userAvatar: "/images/avatars/user2.png",
    rating: 4,
    reviewText: "Really enjoyed this film.",
    date: "1 week ago",
  },
];

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

export const MovieReviews: React.FC<MovieReviewsProps> = () => {
  const [reviews, setReviews] = useState<Review[]>(initialMockReviews);
  const [newRating, setNewRating] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>("");

  const handleSubmit = () => {
    if (newRating === 0 || newComment.trim() === "") return;

    const newReview: Review = {
      id: Date.now(),
      userName: "Current User", // Replace with auth user
      userAvatar: "/images/avatars/default.png",
      rating: newRating,
      reviewText: newComment,
      date: "Just now",
    };

    setReviews([newReview, ...reviews]);
    setNewRating(0);
    setNewComment("");
  };

  return (
    <section className="w-full py-10">
      <div className="w-full">
        {/* Section Header */}
        <div className="mb-12 flex items-center justify-between">
          <h2 className="font-[Manrope] text-[38px] font-bold text-white">Reviews</h2>
          <button className="font-[Manrope] text-[18px] font-semibold text-[#E50000] transition-colors hover:text-[#CC0000]">
            View All Reviews
          </button>
        </div>

        {/* Submit Review Form */}
        <div className="mb-12 rounded-xl border border-[#262626] bg-[#1A1A1A] p-6">
          <h3 className="mb-4 font-[Manrope] text-xl font-semibold text-white">Write a Review</h3>
          <StarRatingSelector rating={newRating} onSelect={setNewRating} />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full rounded-lg border border-[#262626] bg-[#0F0F0F] p-4 font-[Manrope] text-white focus:ring-1 focus:ring-[#E50000] focus:outline-none"
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSubmit}
              className="rounded-lg bg-[#E50000] px-6 py-2 font-[Manrope] font-semibold text-white transition hover:bg-[#CC0000]"
              disabled={newRating === 0 || newComment.trim() === ""}
            >
              Submit Review
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border border-[#262626] bg-[#1A1A1A] p-8 transition-colors hover:border-[#3A3A3A]"
            >
              {/* User Info */}
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#262626]">
                  <Image
                    src={review.userAvatar}
                    alt={review.userName}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-[Manrope] text-[18px] font-semibold text-white">{review.userName}</h3>
                  <div className="flex items-center gap-3">
                    <StarRating rating={review.rating} />
                    <span className="font-[Manrope] text-[14px] text-[#999999]">{review.date}</span>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="font-[Manrope] text-[16px] leading-relaxed text-[#999999]">{review.reviewText}</p>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 flex justify-center">
          <button className="rounded-lg border border-[#262626] bg-[#1A1A1A] px-8 py-4 font-[Manrope] text-[16px] font-semibold text-white transition-colors hover:border-[#3A3A3A]">
            Load More Reviews
          </button>
        </div>
      </div>
    </section>
  );
};
