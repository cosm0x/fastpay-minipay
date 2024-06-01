import { Down } from "@/icons";
import { Badge } from "./ui/badge";
import Link from "next/link";

const Transaction = ({ listing }) => {
  console.log(listing);
  return (
    <Link href={`/listings/${listing?.id}`} className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between border bg-card p-3 rounded-md">
        <div className="flex gap-x-2 justify-start items-center">
          <div className="flex flex-col items-start justify-start gap-x-2 ">
            <small className=" ">{listing?.title}</small>
          </div>
        </div>
        <div className="flex flex-col items-center gap-x-2">
          <div className="flex items-center gap-x-2">
            <Badge className="text-xs" variant="secondary">
              Fulfilled
            </Badge>
            <p>${listing?.rate * listing?.quantity}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Transaction;
