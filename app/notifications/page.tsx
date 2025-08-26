"use client";

import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useMarkNotificationAsRead } from "@/hooks/notifications/useMarkNotificationAsRead";
import { useNotification } from "@/hooks/notifications/useNotification";
import { AlertCircle, Bell, CheckCircle, Clock } from "lucide-react";

export default function NotificationsPage() {
  const { data, isLoading, error } = useNotification();
  const { mutate: markNotificationAsRead } = useMarkNotificationAsRead();

  const handleMarkNotificationAsRead = (notificationId: number) => {
    markNotificationAsRead(notificationId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden dark:bg-[#202020]">
        <Header />
        <main className="w-full pt-[120px] dark:bg-[#0F0F0F]">
          <div className="container mx-auto px-4 py-8">
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-white"></div>
                <p className="text-lg text-white">Loading...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden dark:bg-[#202020]">
        <Header />
        <main className="w-full pt-[120px] dark:bg-[#0F0F0F]">
          <div className="container mx-auto px-4 py-8">
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
                <h2 className="mb-2 text-xl font-semibold text-white">Error</h2>
                <p className="text-gray-400">{error.message}</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden dark:bg-[#202020]">
      <Header />
      <main className="min-h-screen w-full bg-[#0F0F0F] pt-[120px]">
        <div className="container mx-auto max-w-[1200px] px-4 py-8">
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <Bell className="h-8 w-8 text-white" />
              <h1 className="text-3xl font-bold text-white">Notifications</h1>
            </div>
            <p className="text-lg text-gray-400">Latest updates about movies, programs and your account</p>
          </div>

          <div className="space-y-4">
            {data && data.length > 0 ? (
              data.map((notification) => (
                <Card key={notification.notificationId}>
                  <CardHeader className="py-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {notification.isRead ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-white">{notification.title}</CardTitle>
                          <div className="mt-2 flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-400">
                              {new Date(notification.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            {!notification.isRead && (
                              <Badge variant="secondary" className="bg-red-500 text-white">
                                New
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="leading-relaxed text-gray-300">{notification.message}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end py-3">
                    <Button
                      className="cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
                      variant="outline"
                      onClick={() => handleMarkNotificationAsRead(notification.notificationId)}
                    >
                      Mark as read
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card className="border-gray-800 bg-black">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="mb-4 h-16 w-16 text-gray-500" />
                  <h3 className="mb-2 text-xl font-semibold text-white">No notifications</h3>
                  <p className="text-center text-gray-400">
                    You have no notifications. We will notify you when there are new updates.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
