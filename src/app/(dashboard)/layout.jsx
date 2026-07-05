import Sidebar from "@/app/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar user={{ name: "Abc", email: "ab@gmail.com" }} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}