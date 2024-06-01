"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider as Wagmi } from "wagmi";
import { config } from "@/lib/wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
const queryClient = new QueryClient();

export default function WagmiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Wagmi config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </Wagmi>
  );
}
