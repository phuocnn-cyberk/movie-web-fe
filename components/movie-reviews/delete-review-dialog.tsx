import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React from "react";

interface DeleteReviewDialogContextType {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteReviewDialogContext = React.createContext<DeleteReviewDialogContextType | null>(null);

const useDeleteReviewDialog = () => {
  const context = React.useContext(DeleteReviewDialogContext);
  if (!context) {
    throw new Error("useDeleteReviewDialog must be used within DeleteReviewDialog.Root");
  }
  return context;
};

interface RootProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const Root: React.FC<RootProps> = ({ children, isOpen, onClose, onDelete }) => {
  return (
    <DeleteReviewDialogContext.Provider value={{ isOpen, onClose, onDelete }}>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="max-h-[600px] w-[480px] gap-0 overflow-y-auto rounded-[24px] bg-white p-0"
          showCloseButton={false}
        >
          {children}
        </DialogContent>
      </Dialog>
    </DeleteReviewDialogContext.Provider>
  );
};

const Header: React.FC = () => {
  return (
    <DialogHeader className="px-6 pt-6">
      <DialogTitle className="text-helix-black text-left text-base leading-tight font-semibold">
        Delete this review?
      </DialogTitle>
    </DialogHeader>
  );
};

const Description: React.FC = () => {
  return (
    <div className="px-6 pt-4">
      <p className="text-sm leading-6 font-normal text-[#8A8A8A]">
        This will permanently delete the review. It&apos;ll be removed from the list and no longer available to users.
        <br />
        This action cannot be undone.
      </p>
    </div>
  );
};

const Actions: React.FC = () => {
  const { onClose, onDelete } = useDeleteReviewDialog();

  return (
    <div className="flex items-center justify-end gap-5 p-6">
      <button
        onClick={onClose}
        className="rounded-lg bg-[#E6E6E6] px-4 py-2 text-sm font-semibold text-[#193049] hover:bg-gray-200"
      >
        Cancel
      </button>
      <button
        onClick={onDelete}
        className="w-[100px] rounded-lg bg-[#E2281E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#C41E1E]"
      >
        Delete
      </button>
    </div>
  );
};

export const DeleteReviewDialog = {
  Root,
  Header,
  Description,
  Actions,
};
