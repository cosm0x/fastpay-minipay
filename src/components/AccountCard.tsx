"use client";
import { useAccount } from "wagmi";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AccountCard = () => {
  const { address, isConnecting } = useAccount();

  const getTotalPayments = async () => {
    const { data } = await axios.get(
      `/api/user/${address}/listings/total-payments`
    );

    return data.payments;
  };

  const { isPending: isLoading, data: payments } = useQuery({
    queryKey: ["user", address],
    queryFn: getTotalPayments,
    enabled: !!address,
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-4xl">${payments}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">+received so far</div>
      </CardContent>
    </Card>
  );
};
export default AccountCard;
