"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetPaymentsByUser } from "@/hooks/subcriptions/useGetPaymentsByUser";
import { CreditCard } from "lucide-react";

export function BillingTab() {
  const { data: payments } = useGetPaymentsByUser();

  return (
    <Card className="py-6">
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <CardDescription>View your past transactions and subscription history.</CardDescription>
      </CardHeader>
      <CardContent>
        {payments?.length === 0 ? (
          <div className="py-8 text-center">
            <CreditCard className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments?.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {new Date(payment.paidAt).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell>{`Plan #${payment.planId}`}</TableCell>
                    <TableCell>{payment.amount.toLocaleString()} $</TableCell>
                    <TableCell>
                      <Badge variant={payment.paymentStatus === "Completed" ? "default" : "destructive"}>
                        {payment.paymentStatus}
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
