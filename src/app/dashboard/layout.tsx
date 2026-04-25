import { RealtimeSync } from "~/components/dashboard/RealtimeSync";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RealtimeSync />
      {children}
    </>
  );
}
