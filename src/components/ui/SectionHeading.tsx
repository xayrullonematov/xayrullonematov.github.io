import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  index?: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  index,
  label,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-14 md:mb-20",
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      <Reveal>
        <div
          className={cn(
            "mb-5 flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          {index && (
            <span className="mono text-[11px] tracking-[0.18em] text-accent">
              {index}
            </span>
          )}
          <span className="mono text-[11px] tracking-[0.18em] text-muted uppercase">
            {label}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display text-[clamp(2.25rem,5.5vw,4rem)] text-balance">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
