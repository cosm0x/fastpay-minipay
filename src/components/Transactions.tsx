import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Payments</CardTitle>
        <CardDescription>Recent payments from your listings.</CardDescription>
      </CardHeader>
      <CardContent>
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

            <TableRow>
              <TableCell className="table-cell">2023-06-23 17:32 </TableCell>
              <TableCell className="table-cell">
                <Badge className="text-xs" variant="secondary">
                  Fulfilled
                </Badge>
              </TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>

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
      </CardContent>
    </Card>
  );
}
