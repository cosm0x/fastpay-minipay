"use client";

import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  Truck,
} from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CopyIcon } from "lucide-react";
import qr from "../../../../public/img/qr.png";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { formatDate } from "@/helpers";

export default function ListingPage({ params }: { params: { id: string } }) {
  const { address } = useAccount();
  const { toast } = useToast();

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

  const copyLink = () => {
    navigator.clipboard
      .writeText(`https://fastpay.xx/pay/${params?.id}`)
      .then(() => {
        toast({
          description: "Listing link copied",
          duration: 2000,
        });
      });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {listing?.title}
          </CardTitle>
          <CardDescription>
            Date: {formatDate(listing?.createdAt)}
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <CopyIcon className="w-3.5 h-3.5" onClick={() => copyLink()} />
          </Button>
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <MoreVertical className="h-3.5 w-3.5" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DialogTrigger asChild>
                  <DropdownMenuItem>Payments</DropdownMenuItem>
                </DialogTrigger>

                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit</DropdownMenuItem>

                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Listing Details</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {listing?.title} x <span>{listing?.quantity}</span>
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
              <span className="text-muted-foreground">
                Charge <span></span>
              </span>
              <span>${0.001 * listing?.rate}</span>
            </li>

            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">You'll receive</span>
              <span>
                ${(listing?.rate - 0.001 * listing?.rate) * listing?.quantity}
              </span>
            </li>
          </ul>
          <ul className="grid gap-3"></ul>

          <Separator className="my-2" />

          <div className="grid gap-3 w-[60%] mx-auto">
            <Image src={qr} alt="product qr code" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
