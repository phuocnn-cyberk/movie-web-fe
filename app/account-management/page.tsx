"use client";

import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import defaultAvatar from "@/public/logos/default-avatar.svg";
import { useAuthStore } from "@/stores/auth.store";
import { CreditCard, HelpCircle, Lock, User } from "lucide-react";
import { BillingTab } from "./billing-tab";
import { ProfileTab } from "./profile-tab";
import { SecurityTab } from "./security-tab";
import { SupportTab } from "./support-tab";

export default function AccountPage() {
  const { user } = useAuthStore();

  // Sử dụng useCurrentUser để đảm bảo user data được cập nhật
  useCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container mx-auto flex-1 px-4 py-8 pt-30">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your profile, security settings, and view your account history.
            </p>
          </div>

          <Tabs defaultValue="profile" orientation="vertical" className="h-full w-full">
            <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-4">
              <div className="lg:col-span-1">
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-6 flex flex-col items-center text-center">
                      <Avatar className="mb-4 h-20 w-20">
                        <AvatarImage src={user?.avatar || defaultAvatar.src} alt="Profile picture" />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-semibold">{user?.name}</h3>
                      <p className="text-muted-foreground text-sm">{user?.email}</p>
                    </div>

                    <TabsList className="bg-muted/50 grid h-auto w-full flex-1 grid-rows-4">
                      <TabsTrigger
                        value="profile"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground justify-start gap-2 py-3"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </TabsTrigger>
                      <TabsTrigger
                        value="change-password"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground justify-start gap-2 py-3"
                      >
                        <Lock className="h-4 w-4" />
                        Security
                      </TabsTrigger>
                      <TabsTrigger
                        value="payments"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground justify-start gap-2 py-3"
                      >
                        <CreditCard className="h-4 w-4" />
                        Billing
                      </TabsTrigger>
                      <TabsTrigger
                        value="support"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground justify-start gap-2 py-3"
                      >
                        <HelpCircle className="h-4 w-4" />
                        Support
                      </TabsTrigger>
                    </TabsList>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-3">
                <Card className="h-full">
                  <CardContent className="h-full p-6">
                    <TabsContent value="profile" className="mt-0 h-full">
                      <ProfileTab />
                    </TabsContent>

                    <TabsContent value="change-password" className="mt-0 h-full">
                      <SecurityTab />
                    </TabsContent>

                    <TabsContent value="payments" className="mt-0 h-full">
                      <BillingTab />
                    </TabsContent>

                    <TabsContent value="support" className="mt-0 h-full">
                      <SupportTab />
                    </TabsContent>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
