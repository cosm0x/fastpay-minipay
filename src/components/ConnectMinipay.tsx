"use client";
import { useEffect } from "react";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

const ConnectMinipay = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { connect } = useConnect();

  useEffect(() => {
    connect({ connector: injected() });
  }, []);
  return <div>{children}</div>;
};
export default ConnectMinipay;
