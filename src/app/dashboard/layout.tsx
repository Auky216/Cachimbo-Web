import UnifiedDashboardLayout from "@/components/dashboard/DashboardLayout";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <UnifiedDashboardLayout>
      {children}
    </UnifiedDashboardLayout>
  );
}