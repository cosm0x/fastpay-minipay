"use client";

import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

export const Create = () => {
  const { address } = useAccount();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [listing, setListing] = useState({
    title: "",
    rate: 0,
    quantity: 1,
    description: "",
  });

  const handleInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setListing((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const increment = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (listing.quantity >= 1) {
      setListing((prev) => ({
        ...prev,
        quantity: prev.quantity + 1,
      }));
    }
  };

  const decrement = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    listing.quantity > 1 &&
      setListing((prev) => ({
        ...prev,
        quantity: prev.quantity - 1,
      }));
  };

  const createListing = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    const { data } = await axios.post("/api/create-listing", {
      ...listing,
      seller: address,
    });
    return data;
  };

  const { mutate, data, isPending } = useMutation({
    mutationFn: createListing,
    onSuccess: ({ uid }) => {
      toast({
        title: "Success",
        description: "Listing created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["links"] });
      queryClient.invalidateQueries({ queryKey: ["tnxs"] });
      router.push(`/listings/${uid}`);
    },
  });

  return (
    <div className="relative flex-col items-start gap-8 md:flex">
      <form
        className="grid w-full items-start gap-6"
        onSubmit={(e) => mutate(e)}
      >
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Create a listing
          </legend>

          <div className="grid gap-3">
            <Label htmlFor="temperature">Title</Label>
            <Input
              id="temperature"
              type="text"
              placeholder="Ankara textile"
              name="title"
              onChange={(e) => handleInput(e)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="rate">Price</Label>
            <Input
              id="rate"
              type="number"
              placeholder="200"
              name="rate"
              onChange={(e) => handleInput(e)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="quantity">Quantity</Label>
            <div className="flex items-center gap-x-3">
              <Input
                id="quantity"
                type="number"
                placeholder="5"
                name="quantity"
                value={listing?.quantity}
                onChange={(e) => handleInput(e)}
              />

              <div className="flex items-center justify-between gap-x-2">
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
          </div>

          <div className="grid gap-3">
            <Label htmlFor="content">Description</Label>
            <Textarea
              id="content"
              placeholder="You are a..."
              className="min-h-4"
              name="description"
              onChange={(e) => handleInput(e)}
            />
          </div>

          <div className="grid gap-3">
            <Button disabled={isPending} size="lg">
              {isPending && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create listing
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Create;
