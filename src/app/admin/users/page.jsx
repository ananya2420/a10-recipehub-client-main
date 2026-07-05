import ManageUsers from "@/app/components/ManageUsers";
import Sidebar from "@/app/components/Sidebar";


export default function UsersPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <ManageUsers />
      </main>
    </div>
  );
}