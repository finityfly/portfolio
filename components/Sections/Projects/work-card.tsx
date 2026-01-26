"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

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
          "bg-card border border-border",
          "transition-all duration-300 ease-out",
          "hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5",
          "hover:-translate-y-1"
        )}
      >
        {/* Media Container - Fixed 16:9 aspect ratio */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
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
              "absolute inset-0 bg-foreground/0",
              "transition-colors duration-300",
              "group-hover:bg-foreground/5"
            )}
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3
            className={cn(
              "text-lg font-semibold text-foreground",
              "transition-colors duration-200",
              "group-hover:text-primary"
            )}
          >
            {title}
          </h3>
          
          <p className="mt-1 text-sm text-muted-foreground">
            {subtitle}
          </p>
          
          <p className="mt-3 text-sm leading-relaxed text-foreground/80 line-clamp-2">
            {description}
          </p>

          {/* Arrow indicator */}
          <div
            className={cn(
              "mt-4 flex items-center gap-1.5 text-sm font-medium text-muted-foreground",
              "transition-all duration-200",
              "group-hover:text-foreground group-hover:gap-2.5"
            )}
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
