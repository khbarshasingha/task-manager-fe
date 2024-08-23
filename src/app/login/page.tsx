import LoginComponent from "@/components/login";
import { UseAuthContext } from "../store/global";

export default function Login() {
  return (
    <UseAuthContext>
      <LoginComponent />
    </UseAuthContext>
  );
}
