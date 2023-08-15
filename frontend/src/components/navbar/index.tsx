import Typography from "../typography";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  return (
    <header className="bg-orange-600">
      <nav className="flex flex-1 items-center max-w-6xl mx-auto py-4 justify-between">
        <div>
          <Typography tag="h1" variant="3xl">
            Calculator
          </Typography>
        </div>
        <div>user</div>
      </nav>
    </header>
  );
};

export default Navbar;
