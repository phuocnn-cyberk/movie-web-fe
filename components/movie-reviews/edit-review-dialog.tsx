"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Rating } from "@/types/api";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";

interface EditReviewDialogContextType {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { stars: number; comment: string }) => void;
  rating?: Rating;
}

const EditReviewDialogContext = React.createContext<EditReviewDialogContextType | null>(null);

const useEditReviewDialog = () => {
  const context = React.useContext(EditReviewDialogContext);
  if (!context) {
    throw new Error("useEditReviewDialog must be used within EditReviewDialog.Root");
  }
  return context;
};

interface RootProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { stars: number; comment: string }) => void;
  rating?: Rating;
}

const Root: React.FC<RootProps> = ({ children, isOpen, onClose, onSubmit, rating }) => {
  return (
    <EditReviewDialogContext.Provider value={{ isOpen, onClose, onSubmit, rating }}>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="max-h-[600px] w-[480px] gap-0 overflow-y-auto rounded-[24px] bg-white p-0"
          showCloseButton={false}
        >
          {children}
        </DialogContent>
      </Dialog>
    </EditReviewDialogContext.Provider>
  );
};

const Header: React.FC = () => {
  return (
    <DialogHeader className="px-6 pt-6">
      <DialogTitle className="text-helix-black text-left text-base leading-tight font-semibold">
        Edit Your Review
      </DialogTitle>
    </DialogHeader>
  );
};

const StarRatingSelector = ({ rating, onSelect }: { rating: number; onSelect: (rating: number) => void }) => {
  return (
    <div className="mb-4 flex cursor-pointer items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          onClick={() => onSelect(star)}
          className={`h-6 w-6 transition-all ${
            star <= rating ? "fill-[#E50000] text-[#E50000]" : "fill-[#262626] text-[#262626]"
          }`}
        />
      ))}
    </div>
  );
};

const Content: React.FC = () => {
  const { rating, onSubmit, onClose } = useEditReviewDialog();
  const [stars, setStars] = useState(rating?.stars || 0);
  const [comment, setComment] = useState(rating?.comment || "");

  useEffect(() => {
    if (rating) {
      setStars(rating.stars);
      setComment(rating.comment);
    }
  }, [rating]);

  const handleSubmit = () => {
    if (stars === 0 || comment.trim() === "") return;
    onSubmit({ stars, comment });
  };

  return (
    <div className="px-6 pb-6">
      <div className="pt-4">
        <p className="mb-3 text-sm font-medium text-gray-700">Rating</p>
        <StarRatingSelector rating={stars} onSelect={setStars} />

        <p className="mb-2 text-sm font-medium text-gray-700">Comment</p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your updated thoughts..."
          rows={4}
          className="w-full resize-none rounded-lg border border-gray-300 p-3 text-gray-900 focus:ring-1 focus:ring-[#E50000] focus:outline-none"
        />
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded-lg bg-[#E6E6E6] px-4 py-2 text-sm font-semibold text-[#193049] hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={stars === 0 || comment.trim() === ""}
          className="w-[120px] rounded-lg bg-[#E50000] px-4 py-2 text-sm font-semibold text-white hover:bg-[#CC0000] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export const EditReviewDialog = {
  Root,
  Header,
  Content,
};
