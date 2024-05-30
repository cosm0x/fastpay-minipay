import { Bird, Rabbit, Turtle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Component() {
  return (
    <div className="relative flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Create a listing
          </legend>

          <div className="grid gap-3">
            <Label htmlFor="temperature">Title</Label>
            <Input
              id="temperature"
              type="number"
              placeholder="Ankara textile"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" placeholder="200" />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="content">Description</Label>
            <Textarea
              id="content"
              placeholder="You are a..."
              className="min-h-4"
            />
          </div>

          <div className="grid gap-3">
            <Button> Create listing</Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
