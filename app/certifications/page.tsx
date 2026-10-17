import type { Metadata } from "next";
import { CertificationsClient } from "./CertificationsClient";

export const metadata: Metadata = {
  title: "Certifications | Shlok Modanwal",
  description: "Professional certifications and credentials earned by Shlok Modanwal in cloud, AI/ML, web development and more.",
};

export default function CertificationsPage() {
  return <CertificationsClient />;
}
