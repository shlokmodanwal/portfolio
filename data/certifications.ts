// ================================================================
// Certifications Data
// ================================================================

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;          // "YYYY-MM"
  expiryDate?: string;   // "YYYY-MM" — optional
  category: "cloud" | "ai-ml" | "web" | "devops" | "database" | "general" | "other";
  description?: string;  // short description shown on card
  credentialUrl?: string; // link to verify online
  /** Path to certificate image under /public/certs/ — e.g. "/certs/aws.jpg" */
  imageUrl?: string;
  /** Path to certificate PDF under /public/certs/ — e.g. "/certs/aws.pdf" */
  pdfUrl?: string;
  featured?: boolean;
}

export const certificates: Certificate[] = [
  // ── Real Certificates ──────────────────────────────────────────
  {
    id: "team-horizon-leader",
    title: "Team Horizon – Team Leader",
    issuer: "Team Horizon",
    date: "2025-01",
    category: "general",
    description: "Recognized as Team Leader at Team Horizon, demonstrating leadership, coordination, and project management skills in a collaborative team environment.",
    imageUrl: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1792071907/Team_Horizon_-_Shlok_Team_leader_s4yzt5.png",
    featured: true,
  },
  {
    id: "arthavya-achievement",
    title: "Arthavya – Certificate of Achievement",
    issuer: "Arthavya",
    date: "2025-01",
    category: "general",
    description: "Certificate of Achievement awarded at Arthavya in recognition of outstanding performance and contribution.",
    imageUrl: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1792085325/Arthavya_Certificate_of_Achievement_kw8urx.png",
    featured: true,
  },
  {
    id: "editorial-board-appreciation",
    title: "Editorial Board – Certificate of Appreciation",
    issuer: "Editorial Board",
    date: "2025-01",
    category: "general",
    description: "Certificate of Appreciation from the Editorial Board recognizing significant contributions to editorial and publishing work.",
    imageUrl: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1792085317/Editorial_Board_Certificate_of_Appreciation_phytzb.png",
    featured: false,
  },
  {
    id: "achievement-cert",
    title: "Certificate of Achievement",
    issuer: "MMMUT",
    date: "2024-12",
    category: "general",
    description: "Certificate of Achievement awarded for exceptional performance and dedication.",
    imageUrl: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1792085317/certificate_full_corrected_nl7rcx.jpg",
    featured: false,
  },
  {
    id: "vertex-ai-prompt-design",
    title: "Prompt Design in Vertex AI",
    issuer: "Google Cloud",
    date: "2025-01",
    category: "ai-ml",
    description: "Google Cloud skill badge for designing effective prompts in Vertex AI, covering prompt engineering techniques and generative AI best practices.",
    imageUrl: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1791969512/prompt-design-in-vertex-ai-skill-badge_x3ueot.png",
    featured: true,
  },
  {
    id: "viksit-bharat-vbyld",
    title: "Viksit Bharat Young Leaders Dialogue",
    issuer: "Government of India",
    date: "2027-01",
    category: "general",
    description: "Selected participant at the Viksit Bharat Young Leaders Dialogue (VBYLD) 2027, a national-level leadership and governance program.",
    imageUrl: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1791969513/Viksit_Bharat_Young_Leaders_Dialogue_VBYLD_2027_Certificate_Shlok_zgontz.png",
    featured: true,
  },
  {
    id: "cisco-packet-tracer",
    title: "Getting Started with Cisco Packet Tracer",
    issuer: "Cisco Networking Academy",
    date: "2024-06",
    category: "other",
    description: "Hands-on introduction to Cisco Packet Tracer for network simulation, topology design, and troubleshooting.",
    imageUrl: "https://res.cloudinary.com/dwdx4kjgx/image/upload/f_jpg,pg_1/v1791969513/Getting_Started_with_Cisco_Packet_Tracer_certificate_shlok107611-gmail-com_68434e0b-ae5c-4b79-93cf-d35e7648b279_tooeu7.pdf",
    pdfUrl: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1791969513/Getting_Started_with_Cisco_Packet_Tracer_certificate_shlok107611-gmail-com_68434e0b-ae5c-4b79-93cf-d35e7648b279_tooeu7.pdf",
    featured: true,
  },
  {
    id: "edgeminds-main",
    title: "EdgeMinds Certification",
    issuer: "EdgeMinds",
    date: "2024-08",
    category: "general",
    description: "Certification from EdgeMinds recognizing skills and competencies in technology and innovation.",
    imageUrl: "https://res.cloudinary.com/dwdx4kjgx/image/upload/f_jpg,pg_1/v1791969513/Certificate_Shlok_EDGEMINDS84988924_dx17kc.pdf",
    pdfUrl: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1791969513/Certificate_Shlok_EDGEMINDS84988924_dx17kc.pdf",
  },
  {
    id: "edgeminds-research",
    title: "EdgeMinds Research Certification",
    issuer: "EdgeMinds",
    date: "2024-09",
    category: "general",
    description: "Research-track certification from EdgeMinds covering analytical thinking and applied research methodologies.",
    imageUrl: "https://res.cloudinary.com/dwdx4kjgx/image/upload/f_jpg,pg_1/v1791969512/Certificate_Shlok_EMRES81653194_oedg2t.pdf",
    pdfUrl: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1791969512/Certificate_Shlok_EMRES81653194_oedg2t.pdf",
  },
  {
    id: "ipr-certification",
    title: "Intellectual Property Rights (IPR)",
    issuer: "SWAYAM / NPTEL",
    date: "2024-04",
    category: "general",
    description: "Comprehensive course covering patents, trademarks, copyrights, and the legal framework for intellectual property protection in India.",
    imageUrl: "https://res.cloudinary.com/dwdx4kjgx/image/upload/f_jpg,pg_1/v1791969513/ipr_result_izwbgf.pdf",
    pdfUrl: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1791969513/ipr_result_izwbgf.pdf",
  },
  {
    id: "constitution-env-governance",
    title: "Constitution of India & Environmental Governance",
    issuer: "SWAYAM / NPTEL",
    date: "2024-05",
    category: "general",
    description: "Course on India's constitutional framework for environmental governance, administrative processes, and adjudicatory mechanisms.",
    imageUrl: "https://res.cloudinary.com/dwdx4kjgx/image/upload/f_jpg,pg_1/v1791969513/Constitution_of_India_and_Environmental_Governance__Administrative_and_Adjudicatory_Process_xkh8yn.pdf",
    pdfUrl: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1791969513/Constitution_of_India_and_Environmental_Governance__Administrative_and_Adjudicatory_Process_xkh8yn.pdf",
  },
];
