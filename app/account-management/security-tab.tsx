"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword } from "@/services/api";
import { useState } from "react";
import { toast } from "sonner";

export function SecurityTab() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      const response = await changePassword({ oldPassword, newPassword });
      if (response) {
        toast.success("Password changed successfully");
        setOldPassword("");
        setNewPassword("");
      }
    } catch {
      toast.error("Failed to change password");
    }
  };

  return (
    <Card className="py-6">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Update your password to keep your account secure.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="old-password">Current Password</Label>
          <Input
            id="old-password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <p className="text-muted-foreground text-xs">Password must be at least 8 characters long.</p>
        </div>
        <Button
          onClick={handleChangePassword}
          className="w-full cursor-pointer md:w-auto"
          disabled={!oldPassword || !newPassword}
        >
          Change Password
        </Button>
      </CardContent>
    </Card>
  );
}
