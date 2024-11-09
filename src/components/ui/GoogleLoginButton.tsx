import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useActions } from "../../hooks/Usebindcreators";
import createUser from "../../firebase/auth/createUser";
import { UserData } from "../../types/userTypes";
import { toast } from "sonner";

interface GoogleLoginButtonProps {
  onClose: () => void;
}

const GoogleLoginButton = ({ onClose }: GoogleLoginButtonProps) => {
  const { setUser } = useActions();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      if (auth.currentUser) {
        const { displayName, email, uid } = auth.currentUser;
        const userData: UserData = { displayName, email, uid };
        console.log(userData);

        setUser(userData);
        createUser(userData);
        onClose();
        toast.success("Authorized successful");
      } else {
        console.error("No user is currently signed in.");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };
  return (
    <button onClick={handleLogin} className="flex center gap-2 border-2 rounded-full border-gray-500 px-4">
      <span>Sign in with Google</span>
      <img src="/Icons/icon-google.svg" alt="google-auth" className="w-12 rounded-full p-3" />
    </button>
  );
};

export default GoogleLoginButton;
