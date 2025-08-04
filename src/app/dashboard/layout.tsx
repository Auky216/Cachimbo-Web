// En tu layout.tsx
import DashboardLayout from "@/components/dashboard/DashboardLayout";

import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout>
      {children} // Contenido adicional si lo necesitas
    </DashboardLayout>
  );
}