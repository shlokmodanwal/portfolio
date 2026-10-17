import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <div
          className="section-label-line"
          style={{ marginBottom: "1rem", justifyContent: align === "center" ? "center" : "flex-start" }}
        >
          <span className="label">{label}</span>
        </div>
      )}
      <h2
        className="heading-sec"
        style={{ color: "var(--text-1)" }}
      >
        {title}
      </h2>
      {description && (
        <p className="body" style={{ marginTop: "1rem", maxWidth: "48ch" }}>
          {description}
        </p>
      )}
    </div>
  );
}
