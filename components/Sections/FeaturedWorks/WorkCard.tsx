"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useColorModeValue, useToken } from "@chakra-ui/react"

export type WorkCardProps = {
  title: string
  subtitle: string
  description: string
  mediaSrc: string
  mediaType?: "video" | "image"
  href: string
}

// Helper function to detect media type from file extension
const detectMediaType = (src: string): "video" | "image" => {
  const lowerSrc = src.toLowerCase()
  if (lowerSrc.endsWith(".webm")) {
    return "video"
  }
  // Support jpg, jpeg, png, svg, gif as images
  if (lowerSrc.match(/\.(jpg|jpeg|png|svg|gif)$/)) {
    return "image"
  }
  // Default to image if unknown
  return "image"
}

export function WorkCard({
  title,
  subtitle,
  description,
  mediaSrc,
  mediaType,
  href,
}: WorkCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-detect media type if not provided, prioritizing webm videos
  const detectedMediaType = mediaType || detectMediaType(mediaSrc)
  const isVideo = detectedMediaType === "video"

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current && isVideo) {
      videoRef.current.play()
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current && isVideo) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  // Strip HTML tags from description for display
  const stripHtml = (html: string) => {
    if (typeof window === "undefined") {
      // Server-side: use regex to strip HTML tags
      return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")
    }
    const tmp = document.createElement("DIV")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
  }

  const cleanDescription = stripHtml(description)

  // Get colors based on Chakra UI color mode
  const emphasis = useColorModeValue("teal.500", "cyan.200")
  const emphasisColor = useToken("colors", emphasis)
  const bgColor = useColorModeValue("#ffffff", "#374151")
  const borderColor = useColorModeValue("#e5e7eb", "#4b5563")
  const hoverBorderColor = useColorModeValue("#14b8a6", "#67e8f9")
  const textColor = useColorModeValue("#111827", "#ffffff")
  const descriptionColor = useColorModeValue("#374151", "#d1d5db")
  const mutedColor = useColorModeValue("#6b7280", "#9ca3af")
  const mediaBg = useColorModeValue("#f3f4f6", "#1f2937")

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <article
        className={cn(
          "relative overflow-hidden rounded-xl",
          "transition-all duration-300 ease-out",
          "hover:shadow-lg hover:-translate-y-1",
          "flex flex-col"
        )}
        style={{
          backgroundColor: bgColor,
          border: `1px solid ${borderColor}`,
          height: "100%",
          minHeight: "300px", // Fixed minimum height to prevent mismatches
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = hoverBorderColor
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = borderColor
        }}
      >
        {/* Media Container - Takes up ~65% of card height using flex */}
        <div 
          className="relative w-full overflow-hidden flex-shrink-0"
          style={{ 
            backgroundColor: mediaBg,
            flex: "0 0 65%", // 65% of card height for image
          }}
        >
          <div className="absolute inset-0 h-full w-full">
            {isVideo ? (
              <video
                ref={videoRef}
                src={mediaSrc}
                muted
                loop
                playsInline
                className={cn(
                  "h-full w-full object-cover",
                  "transition-transform duration-500 ease-out",
                  "group-hover:scale-105"
                )}
              />
            ) : (
              <Image
                src={mediaSrc || "/placeholder.svg"}
                alt={title}
                fill
                className={cn(
                  "object-cover",
                  "transition-transform duration-500 ease-out",
                  "group-hover:scale-105"
                )}
                unoptimized={mediaSrc.toLowerCase().endsWith(".gif")}
              />
            )}
            
            {/* Subtle overlay on hover */}
            <div
              className={cn(
                "absolute inset-0",
                "transition-colors duration-300",
                "group-hover:bg-white/5"
              )}
            />
          </div>
        </div>

        {/* Content - Compressed to ~35% of card height using flex */}
        <div 
          className="px-5 py-3 flex flex-col flex-shrink-0"
          style={{
            flex: "0 0 35%", // 35% of card height for text content
          }}
        >
          <h3
            className={cn(
              "text-base font-semibold leading-tight mb-1.5",
              "line-clamp-1"
            )}
            style={{ 
              color: emphasisColor, // Use emphasis color for title
            }}
          >
            {title}
          </h3>
          
          <p 
            className="text-xs leading-snug mb-2 flex-1"
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

          {/* Arrow indicator */}
          <div
            className={cn(
              "flex items-center gap-1.5 text-xs font-medium",
              "transition-all duration-200",
              "group-hover:gap-2"
            )}
            style={{ 
              color: mutedColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = textColor
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = mutedColor
            }}
          >
            <span>View Project</span>
            <svg
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default WorkCard
