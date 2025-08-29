"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { useUploadAvatar } from "@/hooks/auth/useUploadAvatar";
import defaultAvatar from "@/public/logos/default-avatar.svg";
import { updateProfile } from "@/services/api";
import { useAuthStore } from "@/stores/auth.store";
import { Upload, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

export function ProfileTab() {
  const { user } = useAuthStore();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadAvatarMutation = useUploadAvatar();
  const { refetch: refetchUser } = useCurrentUser();

  React.useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File is too large. Please select a file smaller than 5MB");
        return;
      }

      setSelectedFile(file);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUploadAvatar = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    try {
      await uploadAvatarMutation.mutateAsync(selectedFile);
      toast.success("Upload avatar successfully!");

      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await refetchUser();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload avatar failed");
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    if (phoneError) {
      setPhoneError(null);
    }
  };

  const handleUpdateProfile = async () => {
    const phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    if (phone && !phoneRegex.test(phone)) {
      setPhoneError("Phone number is not valid.");
      toast.error("Phone number is not valid.");
      return;
    }
    setPhoneError(null);

    try {
      const response = await updateProfile({ name, phone });
      if (response) {
        toast.success("Profile updated successfully");
        setName(response.name || "");
        setPhone(response.phone || "");
        await refetchUser();
      }
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <Card className="py-6">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your personal information and contact details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" value={phone} onChange={handlePhoneChange} />
            {phoneError && <p className="mt-1 text-sm text-red-500">{phoneError}</p>}
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="avatar">Avatar</Label>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16">
                <AvatarImage src={previewUrl || user?.avatar || defaultAvatar.src} alt="Avatar preview" />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              {selectedFile && (
                <button
                  onClick={handleRemoveFile}
                  className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Input
                ref={fileInputRef}
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="w-fit">
                <Upload className="mr-2 h-4 w-4" />
                Choose File
              </Button>
              {selectedFile && (
                <Button
                  onClick={handleUploadAvatar}
                  disabled={uploadAvatarMutation.isPending}
                  className="w-fit bg-green-600 hover:bg-green-700"
                >
                  {uploadAvatarMutation.isPending ? "Uploading..." : "Upload Avatar"}
                </Button>
              )}
            </div>
          </div>
          {selectedFile && (
            <p className="text-sm text-gray-500">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" value={user?.email || ""} disabled className="bg-muted" />
          <p className="text-muted-foreground text-xs">Email address cannot be changed. Contact support if needed.</p>
        </div>
        <Button onClick={handleUpdateProfile} className="w-full md:w-auto">
          Update Profile
        </Button>
      </CardContent>
    </Card>
  );
}
