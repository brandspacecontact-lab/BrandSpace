import { formatMetric, type Project } from "@/data/portfolio";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { cn } from "@/lib/utils";

/** Revenue growth · ROAS · lead/conversion growth for a project. */
export function MetricsRow({
  project,
  compact,
  tone = "light",
}: {
  project: Project;
  compact?: boolean;
  tone?: "light" | "dark";
}) {
  const { revenue, roas, leads, status } = project.metrics;
  const items = [revenue, roas, leads];
  return (
    <div>
      <dl className={cn("grid grid-cols-3", compact ? "gap-4" : "gap-6 sm:gap-10")}>
        {items.map((m) => (
          <div key={m.label} className={cn("flex flex-col border-t pt-4", tone === "light" ? "border-paper/15" : "border-ink/15")}>
            <dt className={cn("order-2 mt-2 text-[0.7rem] font-semibold uppercase leading-tight tracking-[0.14em]", tone === "light" ? "text-paper/60" : "text-ink/65")}>
              {m.label}
            </dt>
            <dd
              className={cn(
                "font-display-tight order-1 font-semibold tabular-nums",
                compact ? "text-[clamp(1.6rem,2.6vw,2.2rem)]" : "text-[clamp(2.2rem,4.4vw,3.6rem)]",
                tone === "light" ? "text-green" : "text-ink",
              )}
            >
              {formatMetric(m)}
            </dd>
            {!compact && (
              <dd className={cn("order-3 mt-2 text-sm leading-snug", tone === "light" ? "text-paper/60" : "text-ink/65")}>{m.context}</dd>
            )}
          </div>
        ))}
      </dl>
      <PlaceholderNote status={status} tone={tone} className="mt-4" />
    </div>
  );
}
