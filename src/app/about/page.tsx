'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <HeroSection
        subtitle="Learn about us"
        title="Our story"
        description="We believe in the power of storytelling and the importance of sharing knowledge. Our platform empowers creators to share their insights with the world."
      />

      <section className="bg-black py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-serif italic mb-6">Who we are</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We are a community of designers, creators, and innovators who believe that great content deserves
                a beautiful home. Our blogging platform was built with care and attention to detail.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Every feature has been thoughtfully designed to help you share your story in the most compelling
                way possible.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-serif italic mb-6">What we do</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We provide a platform for creators to publish their work, engage with readers, and build a
                community around their ideas.
              </p>
              <p className="text-gray-300 leading-relaxed">
                From drafting your first post to building a loyal audience, we are here to support your journey.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-serif italic mb-6">Get in touch</h2>
              <p className="text-gray-300 mb-6">
                Have questions or ideas? We would love to hear from you.
              </p>
              <div className="flex gap-6">
                <a href="https://twitter.com" className="text-gray-400 hover:text-white transition">
                  Twitter
                </a>
                <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition">
                  LinkedIn
                </a>
                <a href="mailto:contact@example.com" className="text-gray-400 hover:text-white transition">
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
