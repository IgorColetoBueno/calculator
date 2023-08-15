"use client";
import { useAuthSession } from "@/store/hooks/auth";
import { useState } from "react";
import ModalLoginAndSignUp from "../modal-login-signup";
import Typography from "../typography";
import ModalLoggedIn from "../modal-logged-in";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  const { user } = useAuthSession();
  const [modalAuthOpen, setModalAuthOpen] = useState(false);
  const [modalLoggedInOpen, setModalLoggedInOpen] = useState(false);

  return (
    <header className="bg-orange-600">
      <nav className="flex flex-1 items-center max-w-6xl mx-auto p-3 justify-between">
        <div>
          <Typography tag="h1" variant="3xl">
            Calculator
          </Typography>
        </div>
        {!user && (
          <button onClick={() => setModalAuthOpen(true)}>
            <Typography variant="sm" className="hover:text-gray-200">
              Login
            </Typography>
          </button>
        )}
        {!!user && (
          <button onClick={() => setModalLoggedInOpen(true)}>
            <Typography variant="sm" className="hover:text-gray-200">
              {user.username}
            </Typography>
          </button>
        )}
      </nav>
      <ModalLoginAndSignUp
        isOpen={modalAuthOpen}
        onClose={() => setModalAuthOpen(false)}
      />
      <ModalLoggedIn
        isOpen={modalLoggedInOpen}
        onClose={() => setModalLoggedInOpen(false)}
      />
    </header>
  );
};

export default Navbar;
