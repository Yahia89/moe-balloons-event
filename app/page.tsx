import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Moe Balloons Event - Premium Balloon Decorations & Event Planning',
  description: 'Transform your special events with stunning balloon decorations. Professional balloon arches, centerpieces, and custom designs for weddings, birthdays, corporate events, and more.',
  keywords: 'balloon decorations, event planning, balloon arches, wedding decorations, birthday parties, corporate events, balloon artist',
  openGraph: {
    title: 'Moe Balloons Event - Premium Balloon Decorations',
    description: 'Professional balloon decorations and event planning services',
    images: ['/og-image.jpg'],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Moe Balloons Event
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="text-gray-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                <a href="#services" className="text-gray-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Services</a>
                <a href="#gallery" className="text-gray-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Gallery</a>
                <a href="#testimonials" className="text-gray-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Reviews</a>
                <a href="#contact" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="relative inline-block">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                Make Every Event
                <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Magical
                </span>
              </h1>
              <div className="absolute -top-4 -right-4 text-4xl animate-bounce">🎈</div>
            </div>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Professional balloon decorations and event planning services that transform ordinary moments into extraordinary memories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105">
                Get Free Quote
              </a>
              <a href="#gallery" className="border-2 border-pink-500 text-pink-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-500 hover:text-white transition-all">
                View Gallery
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From intimate gatherings to grand celebrations, we create stunning balloon decorations for every occasion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "💒",
                title: "Wedding Decorations",
                description: "Elegant balloon arches, centerpieces, and romantic setups for your special day"
              },
              {
                icon: "🎂",
                title: "Birthday Parties",
                description: "Fun and colorful balloon arrangements that make birthdays unforgettable"
              },
              {
                icon: "🏢",
                title: "Corporate Events",
                description: "Professional balloon displays for grand openings, conferences, and company celebrations"
              },
              {
                icon: "🎓",
                title: "Graduations",
                description: "Celebrate achievements with custom balloon decorations in school colors"
              },
              {
                icon: "👶",
                title: "Baby Showers",
                description: "Sweet and gentle balloon designs perfect for welcoming new arrivals"
              },
              {
                icon: "🎉",
                title: "Custom Events",
                description: "Unique balloon creations tailored to your specific theme and vision"
              }
            ].map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl hover:shadow-xl transition-all transform hover:scale-105">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Work
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take a look at some of our recent balloon decoration projects
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="relative group overflow-hidden rounded-2xl aspect-square bg-gradient-to-br from-pink-200 to-purple-200">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-semibold">Event Project {item}</h4>
                    <p className="text-sm opacity-90">Beautiful balloon decoration</p>
                  </div>
                </div>
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  🎈
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                event: "Wedding",
                text: "Absolutely stunning! The balloon arch was the perfect backdrop for our wedding photos. Moe's attention to detail is incredible.",
                rating: 5
              },
              {
                name: "Mike Chen",
                event: "Corporate Event",
                text: "Professional, creative, and on-time. The balloon decorations made our product launch truly memorable.",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                event: "Birthday Party",
                text: "My daughter's unicorn-themed party was magical thanks to Moe's beautiful balloon creations. Highly recommended!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-pink-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Create Magic Together
            </h2>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Ready to transform your event? Get in touch for a free consultation and quote
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-4">📞</span>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-pink-100">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">📧</span>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-pink-100">hello@moeballoonsevent.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">📍</span>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-pink-100">Serving the Greater Metro Area</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Moe Balloons Event
            </h3>
            <p className="text-gray-400 mb-6">
              Creating magical moments with beautiful balloon decorations
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <span className="text-2xl">📘</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <span className="text-2xl">📷</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <span className="text-2xl">🐦</span>
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 Moe Balloons Event. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}