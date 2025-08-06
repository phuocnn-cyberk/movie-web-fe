"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetSupportsByUser } from "@/hooks/support/useSupport";
import { useAuthStore } from "@/stores/auth.store";
import { SupportData } from "@/types/api";
import { HelpCircle } from "lucide-react";

export function SupportTab() {
  const { user } = useAuthStore();
  const { data: supports } = useGetSupportsByUser(user?.userID || 0);

  return (
    <Card className="py-6">
      <CardHeader>
        <CardTitle>Support History</CardTitle>
        <CardDescription>View your support requests and their current status.</CardDescription>
      </CardHeader>
      <CardContent>
        {supports?.length === 0 ? (
          <div className="py-8 text-center">
            <HelpCircle className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground">No support requests found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Support ID</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {supports?.map((support: SupportData, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{support.supportID}</TableCell>
                    <TableCell className="max-w-xs truncate">{support.message}</TableCell>
                    <TableCell>{new Date(support.createdAt).toLocaleDateString("en-GB")}</TableCell>
                    <TableCell>
                      <Badge variant={support.response ? "default" : "secondary"}>
                        {support.response ? "Replied" : "Pending"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
