"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/lib/routes";
import streamVibeLogo from "@/public/logos/stream-vibe-logo.svg";
import { useAuthStore } from "@/stores/auth.store";
import { Bell, Heart, History, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  getNotifications,
  Notification,
  markNotificationAsRead,
} from "@/services/api";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { isAuthenticated, user, actions, accessToken } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSignOut = () => {
    actions.clearAuth();
  };

  const navItems = [
    { name: "Home", link: ROUTES.home },
    { name: "Movies & Shows", link: ROUTES.moviesShows },
    { name: "Support", link: ROUTES.support },
    { name: "Subscriptions", link: ROUTES.subscriptions },
  ];

  const isActiveRoute = (route: string) => {
    if (route === ROUTES.home) return pathname === ROUTES.home;
    return pathname.startsWith(route);
  };

  // Lấy thông báo khi login
  useEffect(() => {
    if (isAuthenticated && accessToken && user?.userID) {
      setLoading(true);
      getNotifications(user.userID)
        .then((res) => setNotifications(res))
        .catch((err) => console.error("Get notifications error:", err))
        .finally(() => setLoading(false));
    } else {
      setNotifications([]);
    }
  }, [isAuthenticated, accessToken, user?.userID]);

  const handleMarkRead = async (id: number) => {
    if (!isAuthenticated || !accessToken) {
      console.warn("Bạn cần đăng nhập để thao tác.");
      return;
    }
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error(`Không thể đánh dấu đã đọc cho ID ${id}:`, err);
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <nav className="mx-auto hidden max-w-screen-2xl items-center justify-between px-8 py-[30px] xl:flex 2xl:px-[162px]">
        {/* Logo */}
        <Link href="/" className="flex h-[60px] w-[199px] items-center">
          <Image
            src={streamVibeLogo}
            alt="StreamVibe Logo"
            className="w-full cursor-pointer"
          />
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-[30px] rounded-xl border-4 border-[#1F1F1F] bg-[#0F0F0F] py-[10px] pr-[40px] pl-[10px]">
          {navItems.map((item) => (
            <div key={item.link}>
              {isActiveRoute(item.link) ? (
                <div className="rounded-lg bg-[#1A1A1A] px-6 py-[14px]">
                  <span className="text-[18px] font-medium text-white">
                    {item.name}
                  </span>
                </div>
              ) : (
                <Link
                  href={item.link}
                  className="block px-6 py-[14px] text-[#BFBFBF] hover:text-white"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-[30px]">
          <Link href={ROUTES.favorites}>
            <Heart className="h-[25.5px] w-[25.5px] text-white" />
          </Link>
          <Link href={ROUTES.watchHistory}>
            <History className="h-[25.5px] w-[25.5px] text-white" />
          </Link>

          {/* Bell - Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative">
                <Bell className="h-[25.5px] w-[23.55px] text-white" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              sideOffset={8}
              className="w-72 max-h-96 overflow-y-auto"
            >
              {!isAuthenticated ? (
                <DropdownMenuItem key="need-login" className="text-gray-500">
                  Bạn cần đăng nhập để xem thông báo
                </DropdownMenuItem>
              ) : loading ? (
                <DropdownMenuItem key="loading" className="text-gray-500">
                  Đang tải thông báo...
                </DropdownMenuItem>
              ) : notifications.length > 0 ? (
                notifications.map((n) => (
                  <DropdownMenuItem
                    key={n.id}
                    onClick={() => handleMarkRead(n.id)}
                    className="flex flex-col items-start cursor-pointer"
                  >
                    <p className="font-semibold">{n.title}</p>
                    <p className="text-xs text-gray-500">{n.message}</p>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem key="empty">
                  Không có thông báo
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Avatar / Login */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-[34px] w-[34px] items-center justify-center">
                {isAuthenticated ? (
                  <Image
                    src={user?.avatar || "/logos/default-avatar.svg"}
                    alt="Profile"
                    className="h-6 w-6 rounded-full"
                    width={24}
                    height={24}
                  />
                ) : (
                  <User className="h-[25.5px] w-[25.5px] text-white" />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {isAuthenticated ? (
                <>
                  <DropdownMenuItem key="account" asChild>
                    <Link href={ROUTES.account}>
                      <Settings className="mr-2 h-4 w-4" />
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem key="logout" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem key="login" asChild>
                  <Link href={ROUTES.signIn}>
                    <User className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};
