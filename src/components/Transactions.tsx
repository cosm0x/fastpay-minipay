import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { useAccount } from "wagmi";
import axios from "axios";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Transactions() {
  const { address } = useAccount();

  const getTransactions = async () => {
    const { data } = await axios.get(`/api/user/${address}/listings/payments`);
    console.log(data);
    return data;
  };

  const { isPending, data: transactions } = useQuery({
    queryKey: ["txns", address],
    queryFn: getTransactions,
    enabled: !!address,
  });

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Payments</CardTitle>
        <CardDescription>Recent payments from your listings.</CardDescription>
      </CardHeader>
      <CardContent>
        {transactions?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sm:table-cell">Date</TableHead>
                <TableHead className="sm:table-cell">Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="table-cell">2023-06-23 17:32 </TableCell>
                <TableCell className="table-cell">
                  <Badge className="text-xs" variant="secondary">
                    Fulfilled
                  </Badge>
                </TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <Card className="sm:col-span-2">
            <CardHeader className="pb-3">
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                No listing found.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild variant={"secondary"}>
                <Link href={`/listings/create`}>Create New Listing</Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
