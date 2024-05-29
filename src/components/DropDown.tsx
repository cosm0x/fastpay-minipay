import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  AvatarIcon,
  HamburgerMenuIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

const DropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size="icon" variant="ghost">
          <HamburgerMenuIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[200px]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <li className="flex items-center gap-x-2">
            <AvatarIcon /> <span>Sign In</span>
          </li>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <li className="flex items-center gap-x-2">
            <PersonIcon /> <span>Sign Up</span>
          </li>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DropDown;
