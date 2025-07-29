"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

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
    date: "2 days ago"
  },
  {
    id: 2,
    userName: "Sarah Johnson",
    userAvatar: "/images/avatars/user2.png",
    rating: 4,
    reviewText: "Really enjoyed this film.",
    date: "1 week ago"
  }
];

const StarRatingSelector = ({
  rating,
  onSelect
}: {
  rating: number;
  onSelect: (rating: number) => void;
}) => {
  return (
    <div className="flex items-center gap-1 mb-2 cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          onClick={() => onSelect(star)}
          className={`w-5 h-5 transition-all ${
            star <= rating
              ? "fill-[#E50000] text-[#E50000]"
              : "fill-[#262626] text-[#262626]"
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
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-[#E50000] text-[#E50000]"
              : "fill-[#262626] text-[#262626]"
          }`}
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
      date: "Just now"
    };

    setReviews([newReview, ...reviews]);
    setNewRating(0);
    setNewComment("");
  };

  return (
    <section className="w-full py-10">
      <div className="w-full">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-[38px] font-bold text-white font-[Manrope]">
            Reviews
          </h2>
          <button className="text-[#E50000] font-semibold text-[18px] font-[Manrope] hover:text-[#CC0000] transition-colors">
            View All Reviews
          </button>
        </div>

        {/* Submit Review Form */}
        <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-6 mb-12">
          <h3 className="text-white text-xl font-semibold mb-4 font-[Manrope]">
            Write a Review
          </h3>
          <StarRatingSelector rating={newRating} onSelect={setNewRating} />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full p-4 rounded-lg bg-[#0F0F0F] text-white border border-[#262626] focus:outline-none focus:ring-1 focus:ring-[#E50000] font-[Manrope]"
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmit}
              className="bg-[#E50000] hover:bg-[#CC0000] text-white font-semibold px-6 py-2 rounded-lg font-[Manrope] transition"
              disabled={newRating === 0 || newComment.trim() === ""}
            >
              Submit Review
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-8 hover:border-[#3A3A3A] transition-colors"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center overflow-hidden">
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-[18px] font-[Manrope] mb-1">
                    {review.userName}
                  </h3>
                  <div className="flex items-center gap-3">
                    <StarRating rating={review.rating} />
                    <span className="text-[#999999] text-[14px] font-[Manrope]">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-[#999999] text-[16px] leading-relaxed font-[Manrope]">
                {review.reviewText}
              </p>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <button className="bg-[#1A1A1A] border border-[#262626] text-white px-8 py-4 rounded-lg hover:border-[#3A3A3A] transition-colors font-semibold text-[16px] font-[Manrope]">
            Load More Reviews
          </button>
        </div>
      </div>
    </section>
  );
};
