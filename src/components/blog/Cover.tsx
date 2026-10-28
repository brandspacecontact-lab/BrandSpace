import { Photo as PhotoImage } from "@/components/ui/Photo";
import type { Photo } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Editorial photograph with a light BrandSpace grade: a faint green-ink
 * tint, a soft floor shadow and a hairline grid fading in from one corner.
 * The photo always stays the hero; the grade eases off on hover.
 */
export function Cover({
  photo,
  sizes,
  className,
  eager,
  priority,
  label,
}: {
  photo: Photo;
  sizes: string;
  className?: string;
  eager?: boolean;
  priority?: boolean;
  /** Small category tag in the top-left corner. */
  label?: string;
}) {
  return (
    <div className={cn("relative isolate overflow-hidden bg-ink-3", className)}>
      <div className="absolute inset-0">
        <PhotoImage
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          loading={eager || priority ? "eager" : undefined}
          fetchPriority={priority ? "high" : undefined}
          className="cover-img object-cover"
          style={photo.position ? { objectPosition: photo.position } : undefined}
        />
      </div>
      <span aria-hidden className="cover-tint pointer-events-none absolute inset-0" />
      <span aria-hidden className="cover-grid pointer-events-none absolute inset-0" />
      {label && (
        <span className="cover-label absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-paper backdrop-blur-md sm:left-4 sm:top-4">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green" />
          {label}
        </span>
      )}
    </div>
  );
}
