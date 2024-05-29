import Container from "./Container";
import ToggleMode from "./ToggleMode";

const Navbar = () => {
  return (
    <nav className="border-b border-b-gray-100 dark:border-b-card py-1">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold">FastPay</h3>
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
