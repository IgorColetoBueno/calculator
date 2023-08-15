import { useAuthSession } from "@/store/hooks/auth";
import Button from "../button";
import Modal from "../modal";
import Typography from "../typography";

interface ModalLoggedInProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalLoggedIn = ({ isOpen, onClose }: ModalLoggedInProps) => {
  const { logout, user, deleteAccount, error } = useAuthSession();

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleDeleteAccount = () => {
    deleteAccount();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-5 min-w-[300px] flex flex-col">
        <Typography tag="p" variant="2xl" className="text-center">
          {user?.username}
        </Typography>
        <Button
          onClick={handleLogout}
          type="submit"
          color="secondary"
          className="w-full"
        >
          Logout
        </Button>
        <Button
          onClick={handleDeleteAccount}
          type="submit"
          color="danger"
          className="w-full"
        >
          Delete account
        </Button>
        {!!error && <Typography color="danger">{error}</Typography>}
      </div>
    </Modal>
  );
};

export default ModalLoggedIn;
