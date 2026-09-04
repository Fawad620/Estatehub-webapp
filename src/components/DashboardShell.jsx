import DashboardHeader from "./DashboardHeader";
import Footer from "./Footer";
import { getSession } from "../utils/auth";
import SupportChatbot from "./SupportChatbot";

export default function DashboardShell({ role, children }) {
  const session = getSession();

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f9fc]">
      <DashboardHeader role={role} name={session?.fullName} />
      <main className="flex-1">{children}</main>
      <SupportChatbot role={role} />
      <Footer />
    </div>
  );
}
