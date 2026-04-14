"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useColorModeValue } from "@chakra-ui/react";
import { cn } from "@/lib/utils";

export type WorkCardProps = {
  title: string;
  description: string;
  mediaSrc: string;
  mediaType?: "video" | "image";
  href: string;
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
}: WorkCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  // Auto-detect media type if not provided, prioritizing webm videos
  const detectedMediaType = mediaType || detectMediaType(mediaSrc);
  const isVideo = detectedMediaType === "video";

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
  const cardBg = "transparent";

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
          "relative overflow-hidden",
          "transition-all duration-300 ease-out",
          "flex flex-col"
        )}
        style={{
          backgroundColor: cardBg,
          border: `1px solid ${isHovered ? hoverBorderColor : borderColor}`,
          height: "100%",
          minHeight: "390px",
          borderRadius: "4px",
          transform: isHovered ? "translateY(-1px)" : "translateY(0)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="px-5 pt-5 pb-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-3">
            <h3
              className={cn("text-[1.15rem] font-semibold leading-tight")}
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
            className="text-[0.92rem] leading-relaxed"
            style={{
              color: descriptionColor,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "4.9em",
            }}
          >
            {cleanDescription}
          </p>
        </div>

        <div
          className="relative w-full overflow-hidden aspect-[4/3]"
          style={{
            backgroundColor: mediaBg,
            borderTop: `1px solid ${borderColor}`,
          }}
        >
          <div className="absolute inset-0 h-full w-full">
            {isVideo ? (
              <video
                src={mediaSrc}
                muted
                loop
                playsInline
                autoPlay
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
            ) : (
              <Image
                src={mediaSrc || "/placeholder.svg"}
                alt={title}
                fill
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
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default WorkCard;
