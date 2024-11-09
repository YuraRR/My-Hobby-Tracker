import React, { useState } from "react";
import GoogleLoginButton from "../ui/GoogleLoginButton";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { UserData } from "../../types/userTypes";
import { useActions } from "../../hooks/Usebindcreators";
import { toast } from "sonner";
import { modalProps } from "../../redux/slices/modalSlice";

const LoginModal = ({ closeModal }: modalProps) => {
  const { setUser } = useActions();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        const { displayName, email, photoURL, uid } = auth.currentUser;
        const userData: UserData = { displayName, email, photoURL, uid };
        setUser(userData);
        closeModal?.();
        toast.success("Authorized successful");
      }
      // setError(null);
    } catch (error: any) {
      toast.error(error.message);
      // setError(error.message);
    }
  };

  return (
    <div className="flex flex-col center gap-4">
      <h2 className="mt-2">Login to My Hobby Tracker</h2>
      {closeModal && <GoogleLoginButton onClose={closeModal} />}

      <form action="" onSubmit={handleLogin} className="flex flex-col center gap-3">
        <TextInput
          placeholder="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <TextInput
          placeholder="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required={true}
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginModal;
