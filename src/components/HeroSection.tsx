'use client'

import Link from 'next/link'

interface HeroProps {
  title: string
  subtitle: string
  description: string
  ctaText?: string
  ctaLink?: string
  imageSrc?: string
}

export default function HeroSection({
  title,
  subtitle,
  description,
  ctaText = 'Subscribe',
  ctaLink = '/subscribe',
  imageSrc,
}: HeroProps) {
  return (
    <section className="bg-black text-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-400 text-sm uppercase tracking-wide mb-4">{subtitle}</p>
            <h1 className="text-5xl md:text-6xl font-serif italic mb-6 leading-tight">{title}</h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">{description}</p>
            <Link
              href={ctaLink}
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition"
            >
              {ctaText}
            </Link>
          </div>
          {imageSrc && (
            <div className="hidden md:block">
              <img
                src={imageSrc}
                alt={title}
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
