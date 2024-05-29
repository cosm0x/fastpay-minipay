import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Transactions from "@/components/Transactions";

export default function Component() {
  return (
    <div className="flex flex-col gap-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-4xl">$1,329</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">+received so far</div>
        </CardContent>
      </Card>

      <Transactions />
    </div>
  );
}
