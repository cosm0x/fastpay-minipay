import { createConfig, http } from "wagmi";
import { celo, celoAlfajores } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const apiKey = process.env.NEXT_PUBLIC_INFURA_API_KEY as string;

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string;

export const config = getDefaultConfig({
  appName: "ProHub",
  projectId,
  chains: [celoAlfajores],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

// export const config = createConfig({
//   chains: [celoAlfajores],
//   connectors: [injected()],
//   transports: {
//     //@ts-ignore
//     [celo.id]: http(`https://celo-alfajores.infura.io/v3/${apiKey}`),
//   },
// });
