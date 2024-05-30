import Transaction from "@/components/Transaction";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Page = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>My Listings</CardTitle>
        <CardDescription>Manage your listings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-4">
          <Transaction />
          <Transaction />
          <Transaction />
        </div>
      </CardContent>
    </Card>
  );
};
export default Page;
