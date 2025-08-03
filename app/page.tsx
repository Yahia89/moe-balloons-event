'use client'

import { useState, useEffect, useRef } from 'react'
import ImageGallery from '../src/components/ImageGallery'

export default function Home() {
  // Mobile menu state management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
  const firstFocusableElementRef = useRef<HTMLAnchorElement>(null);
  const lastFocusableElementRef = useRef<HTMLAnchorElement>(null);

  // Toggle function for hamburger menu button (will be used in task 2)
  const toggleMobileMenu = () => {
    console.log('Hamburger button clicked! Current state:', isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close function for menu interactions (will be used in task 6)
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    // Return focus to hamburger button when menu closes
    if (hamburgerButtonRef.current) {
      hamburgerButtonRef.current.focus();
    }
  };

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        hamburgerButtonRef.current &&
        !hamburgerButtonRef.current.contains(event.target as Node)) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMobileMenuOpen]);

  // Focus management for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Focus the first focusable element when menu opens
      if (firstFocusableElementRef.current) {
        firstFocusableElementRef.current.focus();
      }
    }
  }, [isMobileMenuOpen]);

  // Scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;

      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      // Handle iOS Safari specific issues and prevent bounce scrolling
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.position = 'fixed';
      document.documentElement.style.width = '100%';
      document.documentElement.style.height = '100%';

      return () => {
        // Restore normal scrolling
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.documentElement.style.overflow = '';
        document.documentElement.style.position = '';
        document.documentElement.style.width = '';
        document.documentElement.style.height = '';

        // Restore scroll position (use requestAnimationFrame for better performance)
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
        });
      };
    }
  }, [isMobileMenuOpen]);

  // Focus trap within mobile menu
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isMobileMenuOpen) return;

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Shift + Tab - moving backwards
        if (document.activeElement === firstFocusableElementRef.current) {
          event.preventDefault();
          lastFocusableElementRef.current?.focus();
        }
      } else {
        // Tab - moving forwards
        if (document.activeElement === lastFocusableElementRef.current) {
          event.preventDefault();
          firstFocusableElementRef.current?.focus();
        }
      }
    }
  };

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
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="text-gray-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                <a href="#services" className="text-gray-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Services</a>
                <a href="#gallery" className="text-gray-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Gallery</a>
                <a href="#testimonials" className="text-gray-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Reviews</a>
                <a href="#contact" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all">Contact</a>
              </div>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden relative z-50">
              <button
                ref={hamburgerButtonRef}
                onClick={toggleMobileMenu}
                type="button"
                className="inline-flex items-center justify-center p-3 rounded-md text-gray-700 hover:text-pink-500 hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500 transition-colors cursor-pointer relative z-50 min-w-[44px] min-h-[44px]"
                aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation-menu"
                aria-haspopup="true"
                style={{ touchAction: 'manipulation' }}
              >
                <span className="sr-only">{isMobileMenuOpen ? "Close main menu" : "Open main menu"}</span>
                {/* Hamburger icon with smooth animation */}
                <div className="w-6 h-6 flex flex-col justify-center items-center relative">
                  <span
                    className={`block h-0.5 w-6 bg-current absolute transition-all duration-300 ease-in-out ${isMobileMenuOpen
                      ? 'rotate-45 translate-y-0'
                      : 'rotate-0 -translate-y-1.5'
                      }`}
                    style={{ transformOrigin: 'center' }}
                  ></span>
                  <span
                    className={`block h-0.5 w-6 bg-current absolute transition-all duration-300 ease-in-out ${isMobileMenuOpen
                      ? 'opacity-0 scale-75'
                      : 'opacity-100 scale-100'
                      }`}
                    style={{ transformOrigin: 'center' }}
                  ></span>
                  <span
                    className={`block h-0.5 w-6 bg-current absolute transition-all duration-300 ease-in-out ${isMobileMenuOpen
                      ? '-rotate-45 translate-y-0'
                      : 'rotate-0 translate-y-1.5'
                      }`}
                    style={{ transformOrigin: 'center' }}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <div
          ref={mobileMenuRef}
          id="mobile-navigation-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-heading"
          aria-hidden={!isMobileMenuOpen}
          onKeyDown={handleKeyDown}
          className={`md:hidden fixed inset-0 z-40 bg-white/95 transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            }`}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          }}
        >
          <div className="flex flex-col h-full pt-16">
            <div className="flex-1 px-4 py-8">
              <h2 id="mobile-menu-heading" className="sr-only">Mobile Navigation Menu</h2>
              <nav role="navigation" aria-label="Mobile navigation" className="space-y-6">
                <a
                  ref={firstFocusableElementRef}
                  href="#home"
                  onClick={closeMobileMenu}
                  className={`block text-2xl font-medium text-gray-700 hover:text-pink-500 focus:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 py-3 border-b border-gray-100 ${isMobileMenuOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                    }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? '100ms' : '0ms'
                  }}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  Home
                </a>
                <a
                  href="#services"
                  onClick={closeMobileMenu}
                  className={`block text-2xl font-medium text-gray-700 hover:text-pink-500 focus:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 py-3 border-b border-gray-100 ${isMobileMenuOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                    }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? '200ms' : '0ms'
                  }}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  Services
                </a>
                <a
                  href="#gallery"
                  onClick={closeMobileMenu}
                  className={`block text-2xl font-medium text-gray-700 hover:text-pink-500 focus:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 py-3 border-b border-gray-100 ${isMobileMenuOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                    }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? '300ms' : '0ms'
                  }}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  Gallery
                </a>
                <a
                  href="#testimonials"
                  onClick={closeMobileMenu}
                  className={`block text-2xl font-medium text-gray-700 hover:text-pink-500 focus:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 py-3 border-b border-gray-100 ${isMobileMenuOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                    }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? '400ms' : '0ms'
                  }}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  Reviews
                </a>
                <a
                  ref={lastFocusableElementRef}
                  href="#contact"
                  onClick={closeMobileMenu}
                  className={`block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-4 rounded-full text-xl font-medium text-center hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600 transition-all duration-300 mt-8 ${isMobileMenuOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                    }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? '500ms' : '0ms'
                  }}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  Contact
                </a>
              </nav>
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
              <div className="absolute -top-4 -right-4 text-6xl animate-bounce">🎈</div>
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
                icon: "🏣",
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

          <ImageGallery />
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
              Do not just take our word for it - hear from our satisfied customers
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
                <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>
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
              Let us Create Magic Together
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

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl">
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-pink-100 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-pink-100 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Event Type"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-pink-100 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your event..."
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-pink-100 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
                >
                  Send Message
                </button>
              </form>
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
              © 2025 Moe Balloons Event. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}