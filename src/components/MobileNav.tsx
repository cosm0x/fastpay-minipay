"use client";

import Link from "next/link";
import { ChevronRight, Close, Cog, Home, Up } from "../icons";
import { useState } from "react";

const MobileNav = () => {
  const [isOpen, setIsopen] = useState(false);

  return (
    <nav className="fixed bottom-0 z-10 rounded-t-2xl  backdrop-blur-sm w-full p-4 lg:hidden">
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } mb-7  flex-col justify-center items-center rounded-lg gap-y-2 bg-white/80 backdrop-blur-sm z-20`}
      >
        <Link
          href="/single-links/create"
          className="px-3 py-4 bg-gray-50 w-full rounded-md border"
          onClick={() => setIsopen(false)}
        >
          <div className="flex items-center justify-between">
            <p>One-time Payment Link</p>
            <ChevronRight />
          </div>
        </Link>

        <Link
          href="/donation-links/create"
          className="px-3 py-4 bg-gray-50 w-full rounded-md border"
          onClick={() => setIsopen(false)}
        >
          <div className="flex items-center justify-between">
            <p>Donation Link</p>
            <ChevronRight />
          </div>
        </Link>
      </div>

      <div className="text-foreground flex justify-between items-center border rounded-lg px-5">
        <Link
          href={"/"}
          className="flex flex-col items-center justify-center p-2"
        >
          <Home />
          <small>Account</small>
        </Link>
        <Link
          href="/listings/create"
          className="bg-gray-700 h-16 w-16 rounded-full flex items-center justify-center -translate-y-4 shadow-lg"
        >
          <Up />
        </Link>
        <Link
          href={"/listings"}
          className="flex flex-col items-center justify-center p-2"
        >
          <Cog />
          <small className="text-blue-300">Listings</small>
        </Link>
      </div>
    </nav>
  );
};
export default MobileNav;
