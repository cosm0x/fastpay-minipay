import { useAccount } from "wagmi";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Payment from "./Payment";

const Payments = () => {
  const { address, isConnecting } = useAccount();

  const getPayments = async () => {
    const { data } = await axios.get(`/api/user/${address}/listings/payments`);

    return data;
  };

  const { isPending: isLoading, data: payments } = useQuery({
    queryKey: ["user", address],
    queryFn: getPayments,
    enabled: !!address,
  });

  return (
    <div className="flex flex-col gap-y-3">
      <Payment />

      <Payment />

      <Payment />
    </div>
  );
};
export default Payments;
