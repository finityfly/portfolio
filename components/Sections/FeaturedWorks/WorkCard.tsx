"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useColorModeValue } from "@chakra-ui/react"

export type WorkCardProps = {
  title: string
  subtitle: string
  description: string
  mediaSrc: string
  mediaType?: "image" | "gif" | "video"
  href: string
}

export function WorkCard({
  title,
  subtitle,
  description,
  mediaSrc,
  mediaType = "image",
  href,
}: WorkCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current && mediaType === "video") {
      videoRef.current.play()
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current && mediaType === "video") {
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
  const bgColor = useColorModeValue("#ffffff", "#374151")
  const borderColor = useColorModeValue("#e5e7eb", "#4b5563")
  const hoverBorderColor = useColorModeValue("#14b8a6", "#67e8f9")
  const textColor = useColorModeValue("#111827", "#ffffff")
  const subtitleColor = useColorModeValue("#0d9488", "#67e8f9")
  const descriptionColor = useColorModeValue("#374151", "#d1d5db")
  const mutedColor = useColorModeValue("#6b7280", "#9ca3af")
  const mediaBg = useColorModeValue("#f3f4f6", "#1f2937")

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <article
        className={cn(
          "relative overflow-hidden rounded-xl",
          "transition-all duration-300 ease-out",
          "hover:shadow-lg hover:-translate-y-1"
        )}
        style={{
          backgroundColor: bgColor,
          border: `1px solid ${borderColor}`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = hoverBorderColor
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = borderColor
        }}
      >
        {/* Media Container - Fixed 16:9 aspect ratio */}
        <div 
          className="relative w-full overflow-hidden"
          style={{ 
            backgroundColor: mediaBg,
            paddingBottom: "56.25%", // 16:9 aspect ratio
          }}
        >
          <div className="absolute inset-0 h-full w-full">
            {mediaType === "video" ? (
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
                unoptimized={mediaType === "gif"}
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

        {/* Content */}
        <div className="p-5">
          <h3
            className={cn(
              "text-lg font-semibold",
              "transition-colors duration-200"
            )}
            style={{ 
              color: textColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = subtitleColor
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = textColor
            }}
          >
            {title}
          </h3>
          
          <p 
            className="mt-1 text-sm"
            style={{ color: subtitleColor }}
          >
            {subtitle}
          </p>
          
          <p 
            className="mt-3 text-sm leading-relaxed"
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
              "mt-4 flex items-center gap-1.5 text-sm font-medium",
              "transition-all duration-200",
              "group-hover:gap-2.5"
            )}
            style={{ color: mutedColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = textColor
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = mutedColor
            }}
          >
            <span>View Project</span>
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
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
