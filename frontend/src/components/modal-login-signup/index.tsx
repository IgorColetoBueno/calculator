import { useAuthSession } from "@/store/hooks/auth";
import { FormEvent, useCallback, useEffect, useState } from "react";
import Button from "../button";
import Input from "../input";
import Modal from "../modal";
import Typography from "../typography";

interface ModalLoginAndSignUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalLoginAndSignUp = ({ isOpen, onClose }: ModalLoginAndSignUpProps) => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const invertMode = useCallback(
    () => setMode(mode === "signin" ? "signup" : "signin"),
    [mode]
  );
  const { login, error, signup } = useAuthSession();

  const handleLogin = useCallback(async () => {
    try {
      setLoading(false);
      await login({ password, username });
      onClose();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [username, password, login]);

  const handleSignUp = useCallback(async () => {
    try {
      setLoading(false);
      await signup({ password, username });
      setMode("signin");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [username, password, signup]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (mode === "signin") {
        handleLogin();
      } else {
        handleSignUp();
      }
    },
    [mode, handleLogin, handleSignUp]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-5 min-w-[300px] flex flex-col">
          <Typography tag="p" variant="2xl" className="text-center">
            {mode === "signin" ? "Signin" : "Signup"}
          </Typography>
          <div className="space-y-2">
            <Input
              autoCapitalize="off"
              autoComplete="off"
              minLength={3}
              required
              id="username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              autoCapitalize="off"
              autoComplete="off"
              minLength={8}
              required
              id="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!!error && <Typography color="danger">{error}</Typography>}
          </div>
          <Button
            disabled={loading}
            type="submit"
            color="success"
            className="w-full"
          >
            {mode === "signin" ? "Signin" : "Signup"}
          </Button>
          <button type="button" className="text-center" onClick={invertMode}>
            <Typography
              tag="p"
              variant="sm"
              className="hover:text-gray-200 text-center"
            >
              {mode === "signup"
                ? "I already have an account"
                : "Create an account"}
            </Typography>
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalLoginAndSignUp;
