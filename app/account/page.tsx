"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import Image from "next/image";
import { User as UserIcon, CreditCard, Headphones, Image as ImageIcon, Lock } from "lucide-react";
import {
  getProfile,
  updateProfile,
  uploadAvatar,
  changePassword,
  getMyPayments,
  getSupportsByUser,
} from "@/services/api";
import { useAuthStore } from "@/stores/auth.store";
import type { User, Payment, Support } from "@/types/api";

export default function AccountPage() {
  const { user, actions } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");

  const [userId, setUserId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [payments, setPayments] = useState<Payment[]>([]);
  const [supports, setSupports] = useState<Support[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    getProfile()
      .then((data: User) => {
        setUserId(data.userID || data.id || null);
        setName(data.name ?? "");
        setEmail(data.email ?? "");
        setPhone(data.phone ?? "");
        setAvatar(data.avatar || "/default-avatar.png");
        actions.setUser(data);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, [actions]);

  useEffect(() => {
    if (activeTab === "payments") {
      getMyPayments()
        .then((data) => setPayments(data))
        .catch((err) => console.error("Error fetching payment history:", err));
    }
    if (activeTab === "support" && userId) {
      getSupportsByUser(userId)
        .then((data) => setSupports(data))
        .catch((err) => console.error("Error fetching support history:", err));
    }
  }, [activeTab, userId]);

  const handleUpdateProfile = () => {
    updateProfile({ name, phone })
      .then(() => {
        alert("Profile updated successfully");
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Failed to update profile");
      });
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadAvatar(file)
      .then((res) => {
        alert("Avatar updated successfully");
        if (res.avatar) {
          setAvatar(res.avatar);
          actions.setUser({ ...(user as User), avatar: res.avatar });
        } else {
          const newUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/uploads/avatars/${file.name}`;
          setAvatar(newUrl);
          actions.setUser({ ...(user as User), avatar: newUrl });
        }
      })
      .catch((err) => {
        console.error("Avatar upload error:", err);
        alert("Failed to upload avatar");
      });
  };

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword) {
      alert("Please enter both old and new password");
      return;
    }
    changePassword({ oldPassword, newPassword })
      .then(() => {
        alert("Password changed successfully");
        setOldPassword("");
        setNewPassword("");
      })
      .catch((err) => {
        console.error("Password change error:", err);
        alert("Failed to change password");
      });
  };

  const menuItems = [
    { id: "profile", label: "Profile Information", icon: UserIcon },
    { id: "change-password", label: "Change Password", icon: Lock },
    { id: "payments", label: "Payment History", icon: CreditCard },
    { id: "support", label: "Support History", icon: Headphones },
  ];

  // Map planId -> planName
  const planNames: Record<number, string> = {
    1: "Basic Plan",
    2: "Premium Plan",
    3: "VIP Plan",
  };

  return (
    <div className="w-full min-h-screen flex flex-col dark:bg-[#202020]">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 text-white pt-[140px]">
        <h1 className="text-3xl font-bold mb-8">Account Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="bg-gray-900 rounded-lg p-6 flex flex-col items-center shadow-lg">
            <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-gray-700">
              <Image
                src={avatar || "/default-avatar.png"}
                alt="Avatar"
                fill
                className="object-cover"
                onError={() => setAvatar("/default-avatar.png")}
              />
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4 flex items-center gap-2"
              onClick={handleChooseFile}
            >
              <ImageIcon size={16} /> Change Avatar
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleUploadAvatar}
            />

            <h2 className="mt-4 font-bold text-lg">{name}</h2>
            <p className="text-gray-400 text-sm">User</p>

            <div className="mt-6 w-full space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className={`w-full flex items-center gap-3 px-5 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-red-600 text-white"
                        : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-2 bg-gray-900 rounded-lg p-8 shadow-lg">
            {activeTab === "profile" && (
              <div className="space-y-5">
                <div>
                  <label className="block mb-2 font-medium">Full Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Email</label>
                  <Input value={email} disabled />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Phone Number</label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <Button onClick={handleUpdateProfile} className="bg-red-600 hover:bg-red-700">
                  Update Profile
                </Button>
              </div>
            )}

            {activeTab === "change-password" && (
              <div className="space-y-5">
                <div>
                  <label className="block mb-2 font-medium">Old Password</label>
                  <Input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                </div>
                <div>
                  <label className="block mb-2 font-medium">New Password</label>
                  <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <Button onClick={handleChangePassword} className="bg-red-600 hover:bg-red-700">
                  Change Password
                </Button>
              </div>
            )}

            {activeTab === "payments" && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Payment History</h2>
                {payments.length === 0 ? (
                  <p>No transactions found</p>
                ) : (
                  <table className="w-full border-collapse border border-gray-700">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="border border-gray-700 px-4 py-2">Date</th>
                        <th className="border border-gray-700 px-4 py-2">Plan</th>
                        <th className="border border-gray-700 px-4 py-2">Amount</th>
                        <th className="border border-gray-700 px-4 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((p, i) => (
                        <tr key={i}>
                          <td className="border border-gray-700 px-4 py-2">
                            {new Date(p.paidAt).toLocaleString("en-GB")}
                          </td>
                          <td className="border border-gray-700 px-4 py-2">
                            {planNames[p.planId] || `Plan #${p.planId}`}
                          </td>
                          <td className="border border-gray-700 px-4 py-2">
                            {p.amount.toLocaleString()} VND
                          </td>
                          <td className="border border-gray-700 px-4 py-2">
                            {p.paymentStatus}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {activeTab === "support" && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Support History</h2>
                {supports.length === 0 ? (
                  <p>No support requests</p>
                ) : (
                  <table className="w-full border-collapse border border-gray-700">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="border border-gray-700 px-4 py-2">Support ID</th>
                        <th className="border border-gray-700 px-4 py-2">Message</th>
                        <th className="border border-gray-700 px-4 py-2">Date Sent</th>
                        <th className="border border-gray-700 px-4 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supports.map((s, i) => (
                        <tr key={i}>
                          <td className="border border-gray-700 px-4 py-2">{s.supportID}</td>
                          <td className="border border-gray-700 px-4 py-2">{s.message}</td>
                          <td className="border border-gray-700 px-4 py-2">
                            {new Date(s.createdAt).toLocaleString("en-GB")}
                          </td>
                          <td className="border border-gray-700 px-4 py-2">
                            {s.response ? "Replied" : "Pending"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
