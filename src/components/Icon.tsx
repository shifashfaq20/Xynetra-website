// Line icons only: 2px stroke, square terminals, straight lines & 45° angles,
// single color (currentColor — set to Ink or the owning accent by the caller).

type IconProps = { className?: string; size?: number; title?: string };

function base(size: number, className: string, title?: string) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
    className,
    role: title ? "img" : "presentation",
    "aria-hidden": title ? undefined : true,
  };
}

export function IconReminder({ className = "", size = 24, title }: IconProps) {
  return (
    <svg {...base(size, className, title)}>
      {title && <title>{title}</title>}
      <rect x="3" y="4" width="18" height="17" />
      <path d="M3 9h18M8 2v4M16 2v4" />
      <path d="M8 14l3 3 5-6" />
    </svg>
  );
}

export function IconChat({ className = "", size = 24, title }: IconProps) {
  return (
    <svg {...base(size, className, title)}>
      {title && <title>{title}</title>}
      <path d="M3 4h18v13H8l-5 4z" />
      <path d="M12 8l-2 3h4l-2 3" />
    </svg>
  );
}

export function IconGrowth({ className = "", size = 24, title }: IconProps) {
  return (
    <svg {...base(size, className, title)}>
      {title && <title>{title}</title>}
      <path d="M3 21V3M3 21h18" />
      <path d="M6 15l4-4 3 3 6-6" />
      <path d="M15 8h4v4" />
    </svg>
  );
}

export function IconSpeed({ className = "", size = 24, title }: IconProps) {
  return (
    <svg {...base(size, className, title)}>
      {title && <title>{title}</title>}
      <circle cx="12" cy="13" r="8" />
      <path d="M12 13V8M12 13l4 3M9 2h6" />
    </svg>
  );
}

export function IconCalendar({ className = "", size = 24, title }: IconProps) {
  return (
    <svg {...base(size, className, title)}>
      {title && <title>{title}</title>}
      <rect x="3" y="4" width="18" height="17" />
      <path d="M3 9h18M8 2v4M16 2v4M8 14h3M14 14h2M8 17h3" />
    </svg>
  );
}

export function IconMoney({ className = "", size = 24, title }: IconProps) {
  return (
    <svg {...base(size, className, title)}>
      {title && <title>{title}</title>}
      <path d="M3 6h18v12H3zM3 6l9 7 9-7" />
    </svg>
  );
}

export function IconCheck({ className = "", size = 24, title }: IconProps) {
  return (
    <svg {...base(size, className, title)}>
      {title && <title>{title}</title>}
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

export function IconArrow({ className = "", size = 24, title }: IconProps) {
  return (
    <svg {...base(size, className, title)}>
      {title && <title>{title}</title>}
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconWhatsApp({ className = "", size = 24, title }: IconProps) {
  return (
    <svg {...base(size, className, title)}>
      {title && <title>{title}</title>}
      <path d="M3 21l1.8-5A8 8 0 1 1 8 19.2z" />
      <path d="M8.5 8.5c0 3.5 3.5 7 7 7l1-2-2.5-1-1 1c-1.5-.5-2.5-1.5-3-3l1-1-1-2.5z" />
    </svg>
  );
}
