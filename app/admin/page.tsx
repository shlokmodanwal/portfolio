import type { Metadata } from "next";
import { AdminClient } from "./AdminClient";

export const metadata: Metadata = {
  title: "Admin Panel | Shlok Modanwal",
  description: "Admin panel for managing portfolio content.",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return <AdminClient />;
}
