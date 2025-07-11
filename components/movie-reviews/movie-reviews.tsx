"use client";

import React from "react";
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

const mockReviews: Review[] = [
  {
    id: 1,
    userName: "Alex Thompson",
    userAvatar: "/images/avatars/user1.png",
    rating: 5,
    reviewText: "This movie is absolutely incredible! The storytelling, cinematography, and performances are all top-notch. A must-watch for anyone who appreciates great cinema.",
    date: "2 days ago"
  },
  {
    id: 2,
    userName: "Sarah Johnson",
    userAvatar: "/images/avatars/user2.png", 
    rating: 4,
    reviewText: "Really enjoyed this film. Great action sequences and solid character development. The plot keeps you engaged throughout the entire runtime.",
    date: "1 week ago"
  },
  {
    id: 3,
    userName: "Michael Chen",
    userAvatar: "/images/avatars/user3.png",
    rating: 5,
    reviewText: "One of the best movies I've seen this year. The visual effects are stunning and the story is emotionally engaging. Highly recommended!",
    date: "2 weeks ago"
  },
  {
    id: 4,
    userName: "Emily Davis",
    userAvatar: "/images/avatars/user4.png",
    rating: 4,
    reviewText: "Solid entertainment with great performances. The pacing is excellent and it never feels boring. Worth watching multiple times.",
    date: "3 weeks ago"
  }
];

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

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockReviews.map((review) => (
            <div 
              key={review.id}
              className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-8 hover:border-[#3A3A3A] transition-colors"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center">
                  <span className="text-white font-semibold text-[18px] font-[Manrope]">
                    {review.userName.split(' ').map(n => n[0]).join('')}
                  </span>
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