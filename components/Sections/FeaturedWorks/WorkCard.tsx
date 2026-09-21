
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useColorModeValue } from "@chakra-ui/react";
import { cn } from "@/lib/utils";

export type WorkCardProps = {
  title: string;
  description: string;
  mediaSrc: string;
  mediaType?: "video" | "image";
  href: string;
  featured?: boolean;
};

// Helper function to detect media type from file extension
const detectMediaType = (src: string): "video" | "image" => {
  const lowerSrc = src.toLowerCase();
  if (lowerSrc.endsWith(".webm")) {
    return "video";
  }
  // Support jpg, jpeg, png, svg, gif as images
  if (lowerSrc.match(/\.(jpg|jpeg|png|svg|gif)$/)) {
    return "image";
  }
  // Default to image if unknown
  return "image";
};

export function WorkCard({
  title,
  description,
  mediaSrc,
  mediaType,
  href,
  featured = false,
}: WorkCardProps) {
  // Auto-detect media type if not provided, prioritizing webm videos
  const detectedMediaType = mediaType || detectMediaType(mediaSrc);
  const isVideo = detectedMediaType === "video";

  // Videos are heavy (multi-MB, continuous decode); defer mounting until
  // the card is about to scroll into view, then keep it mounted but pause
  // decode whenever it scrolls back out — several concurrently-playing
  // videos is real, ongoing CPU/GPU cost on weak devices.
  const [mediaRef, mediaInView] = useInView({ rootMargin: "200px 0px" });
  const [everInView, setEverInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (mediaInView) {
      setEverInView(true);
    }
  }, [mediaInView]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    if (mediaInView) {
      void video.play();
    } else {
      video.pause();
    }
  }, [mediaInView]);

  // Strip HTML tags from description for display
  const stripHtml = (html: string) => {
    if (typeof window === "undefined") {
      // Server-side: use regex to strip HTML tags
      return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ");
    }
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const cleanDescription = stripHtml(description);

  const borderColor = useColorModeValue("#C7D2C0", "#2B3528");
  const hoverBorderColor = useColorModeValue("#8EA187", "#4B5E45");
  const titleColor = "var(--chakra-colors-accent)";
  const descriptionColor = "var(--chakra-colors-body)";
  const mediaBg = useColorModeValue("#ECEFE8", "#0F110C");
  const dividerColor = useColorModeValue("#C7D2C0", "#2B3528");

  const mediaEl = isVideo ? (
    everInView ? (
      <video
        ref={videoRef}
        src={mediaSrc}
        muted
        loop
        playsInline
        preload="metadata"
        className={cn(
          "h-full w-full block",
          "transition-transform duration-500 ease-out",
          "group-hover:scale-[1.02]"
        )}
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    ) : null
  ) : (
    <Image
      src={mediaSrc || "/placeholder.svg"}
      alt={title}
      fill
      sizes={featured ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 50vw"}
      className={cn(
        "transition-transform duration-500 ease-out",
        "group-hover:scale-[1.02]"
      )}
      style={{
        objectFit: "cover",
        objectPosition: "center",
      }}
      unoptimized={mediaSrc.toLowerCase().endsWith(".gif")}
    />
  );

  if (featured) {
    return (
      <Link
        href={href}
        passHref
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <article
          className={cn(
            "relative overflow-hidden flex flex-col md:flex-row",
            "border-[1px] border-[color:var(--card-border)] rounded-[4px]",
            "hover:border-[color:var(--card-border-hover)] hover:-translate-y-px",
            "transition-[border-color,transform] duration-300 ease-out"
          )}
          style={{
            "--card-border": borderColor,
            "--card-border-hover": hoverBorderColor,
            backgroundColor: "transparent",
            minHeight: "300px",
            boxShadow: "inset 3px 0 0 0 var(--chakra-colors-accent)",
          } as React.CSSProperties}
        >
          {/* Text pane */}
          <div className="px-5 pt-5 pb-5 flex flex-col gap-2.5 md:w-2/5">
            <h3
              className="text-[1.15rem] font-semibold leading-tight"
              style={{ color: titleColor }}
            >
              {title}
            </h3>
            <p
              className="text-[0.92rem] leading-relaxed"
              style={{
                color: descriptionColor,
                display: "-webkit-box",
                WebkitLineClamp: 5,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {cleanDescription}
            </p>
            <span
              className="mt-auto pt-1 text-xs tracking-wide opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ color: titleColor, textTransform: "lowercase" }}
            >
              view project →
            </span>
          </div>

          {/* Separator: horizontal on mobile, vertical on desktop */}
          <div
            className="block md:hidden w-full flex-shrink-0"
            style={{ height: "1px", backgroundColor: dividerColor }}
          />
          <div
            className="hidden md:block self-stretch flex-shrink-0"
            style={{ width: "1px", backgroundColor: dividerColor }}
          />

          {/* Media pane */}
          <div
            ref={mediaRef}
            className="relative w-full overflow-hidden aspect-[4/3] md:aspect-auto md:flex-1"
            style={{ backgroundColor: mediaBg }}
          >
            <div className="absolute inset-0 h-full w-full">
              {mediaEl}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      passHref
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <article
        className={cn(
          "relative overflow-hidden flex flex-col",
          "border-[1px] border-[color:var(--card-border)] rounded-[4px]",
          "hover:border-[color:var(--card-border-hover)] hover:-translate-y-px",
          "transition-[border-color,transform] duration-300 ease-out"
        )}
        style={{
          "--card-border": borderColor,
          "--card-border-hover": hoverBorderColor,
          backgroundColor: "transparent",
          height: "100%",
        } as React.CSSProperties}
      >
        <div className="px-5 pt-4 pb-3 flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-3">
            <h3
              className={cn("text-[1.05rem] font-semibold leading-tight")}
              style={{
                color: titleColor,
              }}
            >
              {title}
            </h3>
            <span
              className={cn(
                "text-xs tracking-wide whitespace-nowrap",
                "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              )}
              style={{ color: titleColor, textTransform: "lowercase" }}
            >
              view project →
            </span>
          </div>

          <p
            className="text-[0.85rem] leading-relaxed"
            style={{
              color: descriptionColor,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {cleanDescription}
          </p>
        </div>

        <div
          ref={mediaRef}
          className="relative w-full overflow-hidden aspect-[4/3]"
          style={{
            backgroundColor: mediaBg,
            borderTop: `1px solid ${dividerColor}`,
          }}
        >
          <div className="absolute inset-0 h-full w-full">
            {mediaEl}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default WorkCard;
