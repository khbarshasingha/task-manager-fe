import SignupComponent from "@/components/signup";
import { UseAuthContext } from "../store/global";

export default function Signup() {
  return (
    <UseAuthContext>
      <SignupComponent />
    </UseAuthContext>
  );
}
