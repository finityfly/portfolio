"use client"

import { WorkCard, type WorkCardProps } from "./work-card"

// Sample data - replace with your actual works data
const works: WorkCardProps[] = [
  {
    title: "AI Dashboard",
    subtitle: "Machine Learning Platform",
    description:
      "A comprehensive dashboard for monitoring and managing machine learning models with real-time analytics and deployment tools.",
    mediaSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    mediaType: "image",
    href: "https://github.com",
  },
  {
    title: "E-Commerce Platform",
    subtitle: "Full-Stack Web Application",
    description:
      "Modern e-commerce solution built with Next.js, featuring cart functionality, payment processing, and inventory management.",
    mediaSrc: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop",
    mediaType: "image",
    href: "https://github.com",
  },
  {
    title: "Mobile Fitness App",
    subtitle: "React Native · iOS & Android",
    description:
      "Cross-platform fitness tracking application with workout plans, progress tracking, and social features for motivation.",
    mediaSrc: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=450&fit=crop",
    mediaType: "image",
    href: "https://github.com",
  },
  {
    title: "Data Visualization Tool",
    subtitle: "Interactive Charts & Graphs",
    description:
      "Real-time data visualization platform with customizable dashboards and export capabilities for business intelligence.",
    mediaSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    mediaType: "image",
    href: "https://github.com",
  },
]

type FeaturedWorksProps = {
  works?: WorkCardProps[]
  title?: string
}

export function FeaturedWorks({
  works: customWorks,
  title = "What I've been up to",
}: FeaturedWorksProps) {
  const displayWorks = customWorks || works

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-10">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayWorks.map((work, index) => (
          <WorkCard key={`${work.title}-${index}`} {...work} />
        ))}
      </div>
    </section>
  )
}
