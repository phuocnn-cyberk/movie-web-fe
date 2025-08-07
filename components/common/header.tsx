"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { useNotification } from "@/hooks/notifications/useNotification";
import { ROUTES } from "@/lib/routes";
import defaultAvatar from "@/public/logos/default-avatar.svg";
import streamVibeLogo from "@/public/logos/stream-vibe-logo.svg";
import { useAuthStore } from "@/stores/auth.store";
import { Bell, CreditCard, HeadphonesIcon, Home, LogOut, Menu, Play, Search, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { isAuthenticated, actions, user } = useAuthStore();
  const { data: notifications } = useNotification();

  useCurrentUser();

  const handleSignOut = () => {
    actions.clearAuth();
  };

  const unreadCount = notifications?.filter((notification) => !notification.isRead).length || 0;

  const navItems = [
    {
      name: "Home",
      link: ROUTES.home,
      icon: <Home className="h-4 w-4" />,
    },
    {
      name: "Movies & Shows",
      link: ROUTES.moviesShows,
      icon: <Play className="h-4 w-4" />,
    },
    {
      name: "Support",
      link: ROUTES.support,
      icon: <HeadphonesIcon className="h-4 w-4" />,
    },
    {
      name: "Subscriptions",
      link: ROUTES.subscriptions,
      icon: <CreditCard className="h-4 w-4" />,
    },
  ];

  const isActiveRoute = (route: string) => {
    if (route === ROUTES.home) {
      return pathname === ROUTES.home;
    }
    return pathname.startsWith(route);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <nav className="mx-auto hidden max-w-screen-2xl items-center justify-between px-8 py-[30px] xl:flex 2xl:px-[162px]">
        <Link href="/" aria-label="Go to homepage" className="flex h-[60px] w-[199px] shrink-0 items-center">
          <Image src={streamVibeLogo} alt="StreamVibe Logo" className="my-auto w-full shrink-0 cursor-pointer" />
        </Link>

        <div className="flex items-center gap-[30px] rounded-xl border-4 border-[#1F1F1F] bg-[#0F0F0F] py-[10px] pr-[40px] pl-[10px]">
          {navItems.map((item, index) => (
            <div key={index} className="relative">
              {isActiveRoute(item.link) ? (
                <div className="rounded-lg border border-[#1A1A1A] bg-[#1A1A1A] px-6 py-[14px] whitespace-nowrap">
                  <span className="font-manrope text-[18px] font-medium text-white">{item.name}</span>
                </div>
              ) : (
                <Link href={item.link} className="block px-6 py-[14px]">
                  <span className="font-manrope text-[18px] font-normal whitespace-nowrap text-[#BFBFBF] transition-colors hover:text-white">
                    {item.name}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-[30px]">
          <Button className="h-8 w-8 cursor-pointer items-center justify-center bg-[#111111] hover:bg-black/80">
            <Search className="text-white" />
          </Button>

          <Link href={ROUTES.notifications} className="relative">
            <Button className="h-8 w-8 cursor-pointer items-center justify-center bg-[#111111] hover:bg-black/80">
              <Bell className="text-white" />
            </Button>
            {unreadCount > 0 && (
              <>
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></div>
                <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
                  <span className="text-xs font-bold text-white">{unreadCount > 9 ? "9+" : unreadCount}</span>
                </div>
              </>
            )}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-[34px] w-[34px] items-center justify-center" aria-label="Profile">
                {isAuthenticated ? (
                  <Image
                    src={user?.avatar || defaultAvatar.src}
                    alt="Profile"
                    className="h-6 w-6 rounded-full"
                    width={24}
                    height={24}
                  />
                ) : (
                  <User className="h-[25.5px] w-[25.5px] stroke-2 text-white" />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {isAuthenticated && (
                <DropdownMenuItem asChild>
                  <Link href={ROUTES.accountManagement}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Account Management</span>
                  </Link>
                </DropdownMenuItem>
              )}
              {isAuthenticated ? (
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href={ROUTES.signIn}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Login</span>
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      <nav className="relative mx-auto hidden max-w-6xl items-center justify-between px-8 py-6 lg:flex xl:hidden">
        <Link href="/" aria-label="Go to homepage" className="flex items-center">
          <Image src={streamVibeLogo} alt="StreamVibe Logo" className="h-12 w-auto cursor-pointer" />
        </Link>

        <div className="flex items-center gap-4 rounded-xl border-2 border-[#1F1F1F] bg-[#0F0F0F] px-4 py-2">
          {navItems.map((item, index) => (
            <div key={index} className="relative">
              {isActiveRoute(item.link) ? (
                <div className="rounded-lg border border-[#1A1A1A] bg-[#1A1A1A] px-4 py-2">
                  <span className="font-manrope text-sm font-medium whitespace-nowrap text-white">{item.name}</span>
                </div>
              ) : (
                <Link href={item.link} className="block px-4 py-2">
                  <span className="font-manrope text-sm font-normal whitespace-nowrap text-[#BFBFBF] transition-colors hover:text-white">
                    {item.name}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="flex h-8 w-8 items-center justify-center" aria-label="Search">
            <Search className="h-5 w-5 stroke-2 text-white" />
          </button>

          <Link href={ROUTES.notifications} className="relative">
            <button className="flex h-8 w-8 items-center justify-center" aria-label="Notifications">
              <Bell className="h-5 w-5 stroke-2 text-white" />
            </button>
            {unreadCount > 0 && (
              <>
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></div>
                <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
                  <span className="text-xs font-bold text-white">{unreadCount > 9 ? "9+" : unreadCount}</span>
                </div>
              </>
            )}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-8 w-8 items-center justify-center" aria-label="Profile">
                {isAuthenticated ? (
                  <Image
                    src={user?.avatar || defaultAvatar.src}
                    alt="Profile"
                    className="h-6 w-6 rounded-full"
                    width={24}
                    height={24}
                  />
                ) : (
                  <User className="h-5 w-5 stroke-2 text-white" />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {isAuthenticated && (
                <DropdownMenuItem asChild>
                  <Link href={ROUTES.accountManagement}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Account Management</span>
                  </Link>
                </DropdownMenuItem>
              )}
              {isAuthenticated ? (
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href={ROUTES.signIn}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Login</span>
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      <nav className="flex items-center justify-between px-4 py-4 lg:hidden">
        <Link href="/" aria-label="Go to homepage" className="flex items-center">
          <Image src={streamVibeLogo} alt="StreamVibe Logo" className="h-10 w-auto cursor-pointer" />
        </Link>

        <button
          onClick={toggleMobileMenu}
          className="flex h-10 w-10 items-center justify-center"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="absolute top-full right-0 left-0 border-t border-[#1F1F1F] bg-[#141414] shadow-lg lg:hidden">
          <div className="space-y-4 px-4 py-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="flex items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-[#1F1F1F]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className={`${isActiveRoute(item.link) ? "text-white" : "text-[#BFBFBF]"}`}>{item.icon}</div>
                <span
                  className={`font-manrope text-lg font-medium ${
                    isActiveRoute(item.link) ? "text-white" : "text-[#BFBFBF]"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}

            <div className="flex items-center gap-4 border-t border-[#1F1F1F] px-4 pt-4">
              <button className="flex items-center gap-2 rounded-lg bg-[#1F1F1F] px-4 py-2" aria-label="Search">
                <Search className="h-5 w-5 text-white" />
                <span className="font-medium text-white">Search</span>
              </button>

              <Link href={ROUTES.notifications} className="relative">
                <button
                  className="flex items-center gap-2 rounded-lg bg-[#1F1F1F] px-4 py-2"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5 text-white" />
                  <span className="font-medium text-white">Notifications</span>
                </button>
                {unreadCount > 0 && (
                  <>
                    <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
                      <span className="text-xs font-bold text-white">{unreadCount > 9 ? "9+" : unreadCount}</span>
                    </div>
                  </>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
