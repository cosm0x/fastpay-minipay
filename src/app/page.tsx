"use client";

import Transactions from "@/components/Transactions";
import AccountCard from "@/components/AccountCard";
import { Button } from "../components/ui/button";
import Link from "next/link";

export default function Component() {
  return (
    <div className="flex flex-col gap-y-6">
      <h3>Easy listings, Fast payments!</h3>

      <Button size="sm" className="w-fit">
        <Link href="/user">Launch app</Link>
      </Button>
    </div>
  );
}
