"use client";

import { useEffect, useState } from "react";
import { Rating } from "@/types/api";
import { getRatingsByMovie, addRating } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export const MovieReviews: React.FC<{ movieId: number }> = ({ movieId }) => {
  const [reviews, setReviews] = useState<Rating[]>([]);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    getRatingsByMovie(movieId).then(setReviews);
  }, [movieId]);

  const handleSubmit = async () => {
    if (!newComment.trim() || newRating === 0) return;
    const payload = {
      userId: 1, // TODO: thay bằng user từ auth
      movieId,
      rating: newRating,
      comment: newComment,
    };
    const newReview = await addRating(payload);
    setReviews([newReview, ...reviews]);
    setNewRating(0);
    setNewComment("");
  };

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-red-600 pl-3">
        Audience Reviews
      </h2>

      {/* Form thêm review */}
      <div className="mb-8 bg-[#1A1A1A] p-5 rounded-xl shadow-lg">
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`w-6 h-6 cursor-pointer transition ${
                newRating >= s
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-600 hover:text-gray-400"
              }`}
              onClick={() => setNewRating(s)}
            />
          ))}
        </div>
        <textarea
          className="w-full p-3 rounded-lg bg-[#2A2A2A] text-white mb-3 focus:ring-2 focus:ring-red-600 outline-none"
          rows={3}
          placeholder="Write your review..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          onClick={handleSubmit}
          className="bg-red-600 hover:bg-red-700 rounded-full px-5"
        >
          Submit Review
        </Button>
      </div>

      {/* Danh sách review */}
      <div className="space-y-5">
        {reviews.map((r) => (
          <div key={r.ratingId} className="bg-[#1A1A1A] p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-2">
              {[...Array(r.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-xs text-gray-400 ml-2">
                {new Date(r.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-200">{r.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
