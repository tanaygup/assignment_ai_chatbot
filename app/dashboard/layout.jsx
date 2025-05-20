import { SideNav } from "@/components/dashboard/side-nav";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-background">
      <SideNav />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto py-8 px-4">{children}</div>
      </main>
    </div>
  );
}