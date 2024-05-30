import { Down } from "@/icons";
import { Badge } from "./ui/badge";

const Transaction = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between border bg-card p-3 rounded-md">
        <div className="flex gap-x-2 justify-start items-center">
          <div className="flex flex-col items-start justify-start gap-x-2 ">
            <small className=" ">Ankara Fabrics</small>
          </div>
        </div>
        <div className="flex flex-col items-center gap-x-2">
          <div className="flex items-center gap-x-2">
            <Badge className="text-xs" variant="secondary">
              Fulfilled
            </Badge>
            <p>$100</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Transaction;
