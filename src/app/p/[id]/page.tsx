"use client";
import { useState } from "react";
import axios from "axios";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useReadContract,
  useWriteContract,
} from "wagmi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import cusd from "@/constants/cusd";
import fastpay from "@/constants/fastpay";
import Container from "../../../components/ui/Container";

export default function ListingPage({ params }: { params: { id: string } }) {
  const { address } = useAccount();
  const { toast } = useToast();
  // to control quantity input
  const [quantity, setQuantity] = useState(1);

  const getListing = async () => {
    const { data } = await axios.get(
      `/api/user/${address}/listings/${params?.id}`
    );

    return data;
  };

  const { isPending, data: listing } = useQuery({
    queryKey: ["listing"],
    queryFn: getListing,
    enabled: !!address,
  });

  // increase quantity
  const increment = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    quantity <= listing?.quantity && setQuantity(quantity + 1);
  };

  // decrease quantity
  const decrement = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    quantity > 1 && setQuantity(quantity - 1);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {listing?.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Listing Details</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {listing?.title} x <span>{quantity}</span>
              </span>
              <span>${listing?.rate}</span>
            </li>
          </ul>

          <Separator className="my-2" />
          <div className="font-semibold">Description</div>
          <p className="text-muted-foreground">{listing?.description}</p>

          <Separator className="my-2" />

          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Total</span>
              <span>${listing?.rate * quantity}</span>
            </li>
          </ul>
          <ul className="grid gap-3"></ul>

          <div className="flex items-center justify-end mt-4">
            <div className="flex items-center justify-between gap-x-2 w-[50%]">
              <Button
                variant="outline"
                size="icon"
                className="flex justify-center items-center flex-1"
                onClick={(e) => decrement(e)}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="flex justify-center items-center flex-1"
                onClick={(e) => increment(e)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger className="flex justify-end mt-6">
              <Button size="lg">Make payment</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
