import { UseAuthContext } from "../store/global";
import DashboardComponent from "@/components/dashboard";

export default function Dashboard() {
  return (
    <UseAuthContext>
      <DashboardComponent />
    </UseAuthContext>
  );
}
