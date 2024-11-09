import { FormEvent, useState } from "react";
import GoogleLoginButton from "../ui/GoogleLoginButton";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import registerWithEmail from "../../firebase/auth/registerWithEmail";
import createUser from "../../firebase/auth/createUser";
import { UserData } from "../../types/userTypes";
import { auth } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { modalProps } from "../../redux/slices/modalSlice";
import { useActions } from "../../hooks/Usebindcreators";

const RegisterModal = ({ closeModal }: modalProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ type: string; message: string }[]>([]);
  const { openModal } = useActions();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const userOrError = await registerWithEmail(email, password);

    if (typeof userOrError === "string") {
      const errorMessage = getErrorMessage(userOrError);
      if (errorMessage) {
        setErrors((prev) => [
          ...prev,
          {
            type: "email",
            message: errorMessage,
          },
        ]);
      }
    } else if (userOrError && auth.currentUser) {
      await updateProfile(userOrError, { displayName: username });

      const { displayName, email, photoURL, uid } = auth.currentUser;

      const userData: UserData = { displayName, email, photoURL, uid };
      createUser(userData);
      openModal && openModal({ modalId: "selectHobbies", size: "xl" });
    } else {
      console.log("Error registering user. Please try again.");
    }
  };

  const getErrorMessage = (error: string) => {
    switch (error) {
      case "Firebase: Error (auth/email-already-in-use).":
        return "Email already in use";
      case "Firebase: Error (auth/invalid-email).":
        return "Invalid email";
      case "Firebase: Error (auth/operation-not-allowed).":
        return "Operation not allowed";
      case "Firebase: Error (auth/weak-password).":
        return "Password should be at least 6 characters";
      default:
        return "An unknown error occurred. Please try again.";
    }
  };

  return (
    <div className="flex flex-col center gap-4">
      <h2 className="mt-2">Sign up for My Hobby Tracker</h2>
      {closeModal && <GoogleLoginButton onClose={closeModal} />}

      <form onSubmit={handleSubmit} className="flex flex-col center gap-4">
        <TextInput
          placeholder="Username"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
        <TextInput
          placeholder="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.find((err) => err.type === "email")?.message || ""}
          autoComplete="email"
          required
        />
        <TextInput
          placeholder="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          error={errors.find((err) => err.type === "password")?.message || ""}
          autoComplete="new-password"
          required
        />

        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default RegisterModal;
