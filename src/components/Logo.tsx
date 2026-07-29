// import Image from "next/image";
// import Link from "next/link";

// // Uses only the supplied asset files — never redrawn, recolored, or effected.
// // Primary (black-on-white) is default; reversed (white) for Ink/accent surfaces.
// type Variant = "primary" | "reversed";

// export function Logo({
//   variant = "primary",
//   className = "",
//   width = 150,
//   href = "/",
//   priority = false,
// }: {
//   variant?: Variant;
//   className?: string;
//   width?: number;
//   href?: string | null;
//   priority?: boolean;
// }) {
//   const src =
//     variant === "reversed"
//       ? "/brand/logo/xynetra-logo-reversed.svg"
//       : "/brand/logo/xynetra-logo-primary.svg";

//   // Source lockup is roughly square-ish; keep intrinsic ratio ~1:1.
//   const img = (
//     <Image
//       src={src}
//       alt="Xynetra"
//       width={width}
//       height={width}
//       priority={priority}
//       className={className}
//       style={{ width, height: "auto" }}
//     />
//   );

//   if (href === null) return img;
//   return (
//     <Link href={href} aria-label="Xynetra home" className="inline-block">
//       {img}
//     </Link>
//   );
// }

// // X mark alone — only for favicon/app-icon scale placements.
// export function XMark({
//   variant = "primary",
//   size = 40,
//   className = "",
// }: {
//   variant?: Variant;
//   size?: number;
//   className?: string;
// }) {
//   const src =
//     variant === "reversed"
//       ? "/brand/mark/xynetra-xmark-white.svg"
//       : "/brand/mark/xynetra-xmark-black.svg";
//   return (
//     <Image
//       src={src}
//       alt="Xynetra"
//       width={size}
//       height={size}
//       className={className}
//     />
//   );
// }



// import Image from "next/image";
// import Link from "next/link";

// // Uses only the supplied asset files — never redrawn, recolored, or effected.
// // Primary (black-on-white) is default; reversed (white) for Ink/accent surfaces.
// type Variant = "primary" | "reversed";

// export function Logo({
//   variant = "primary",
//   className = "",
//   width = 110,
//   href = "/",
//   priority = false,
// }: {
//   variant?: Variant;
//   className?: string;
//   width?: number;
//   href?: string | null;
//   priority?: boolean;
// }) {
//   const src =
//     variant === "reversed"
//       ? "/brand/logo/xynetra-logo-reversed.svg"
//       : "/brand/logo/xynetra-logo-primary.svg";

//   // Shorter height: ~60% of width so the logo sits lower/compact
//   const logoHeight = Math.round(width * 0.6);

//   const img = (
//     <Image
//       src={src}
//       alt="Xynetra"
//       width={width}
//       height={logoHeight}
//       priority={priority}
//       className={className}
//       style={{ width, height: logoHeight }}
//     />
//   );

//   if (href === null) return img;
//   return (
//     <Link href={href} aria-label="Xynetra home" className="inline-block">
//       {img}
//     </Link>
//   );
// }

// // X mark alone — only for favicon/app-icon scale placements.
// export function XMark({
//   variant = "primary",
//   size = 36,
//   className = "",
// }: {
//   variant?: Variant;
//   size?: number;
//   className?: string;
// }) {
//   const src =
//     variant === "reversed"
//       ? "/brand/mark/xynetra-xmark-white.svg"
//       : "/brand/mark/xynetra-xmark-black.svg";
//   return (
//     <Image
//       src={src}
//       alt="Xynetra"
//       width={size}
//       height={size}
//       className={className}
//     />
//   );
// }



import Image from "next/image";
import Link from "next/link";

type Variant = "primary" | "reversed";

export function Logo({
  variant = "primary",
  className = "",
  width = 65,
  href = "/",
  priority = false,
}: {
  variant?: Variant;
  className?: string;
  width?: number;
  href?: string | null;
  priority?: boolean;
}) {
  const src =
    variant === "reversed"
      ? "/brand/logo/xynetra-logo-reversed.svg"
      : "/brand/logo/xynetra-logo-primary.svg";

  // Much shorter so it fits inside navbar with breathing room
  const logoHeight = Math.round(width * 0.45);

  const img = (
    <Image
      src={src}
      alt="Xynetra"
      width={width}
      height={logoHeight}
      priority={priority}
      className={className}
      style={{ width, height: logoHeight, display: "block" }}
    />
  );

  if (href === null) return img;

  return (
    <Link
      href={href}
      aria-label="Xynetra home"
      className="inline-flex items-center py-3"
    >
      {img}
    </Link>
  );
}

export function XMark({
  variant = "primary",
  size = 32,
  className = "",
}: {
  variant?: Variant;
  size?: number;
  className?: string;
}) {
  const src =
    variant === "reversed"
      ? "/brand/mark/xynetra-xmark-white.svg"
      : "/brand/mark/xynetra-xmark-black.svg";
  return (
    <Image
      src={src}
      alt="Xynetra"
      width={size}
      height={size}
      className={`inline-flex items-center ${className}`}
      style={{ display: "block" }}
    />
  );
}