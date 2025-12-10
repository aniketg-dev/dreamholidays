import { auth } from "@/auth";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminLayout({ children }) {
  const session = await auth();

  // If not authenticated, show children (login page)
  if (!session) {
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav session={session} />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
