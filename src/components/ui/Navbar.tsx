import Link from "next/link";
import Container from "./Container";
import ToggleMode from "./ToggleMode";

const Navbar = () => {
  return (
    <nav className="border-b border-b-gray-100 dark:border-b-card py-1">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <Link href="/" className="font-bold">
              FastPay
            </Link>
          </div>

          <div className="flex items-center">
            <ToggleMode />
          </div>
        </div>
      </Container>
    </nav>
  );
};
export default Navbar;
