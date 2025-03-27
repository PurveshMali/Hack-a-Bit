
import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import previewImage from "../assets/img/image.png";

gsap.registerPlugin(ScrollTrigger)

const LandingPage = () => {
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const statsRef = useRef(null)
  const testimonialsRef = useRef(null)
  const ctaRef = useRef(null)

  // Lighting effects
  const lightingEffectsRef = useRef(null)

  useEffect(() => {
    // Hero animations
    gsap.fromTo(
      heroRef.current.querySelectorAll(".animate-hero"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
    )

    // Features animations
    gsap.fromTo(
      featuresRef.current.querySelectorAll(".feature-card"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
      },
    )

    // Stats animations
    gsap.fromTo(
      statsRef.current.querySelectorAll(".stat-item"),
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
      },
    )

    // Testimonials animations
    gsap.fromTo(
      testimonialsRef.current.querySelectorAll(".testimonial-card"),
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 80%",
        },
      },
    )

    // CTA animations
    gsap.fromTo(
      ctaRef.current.querySelectorAll(".animate-cta"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
        },
      },
    )

    // Lighting effects animation
    const lights = lightingEffectsRef.current.querySelectorAll(".light")

    lights.forEach((light) => {
      gsap.to(light, {
        x: `random(-20, 20)`,
        y: `random(-20, 20)`,
        opacity: `random(0.3, 0.7)`,
        scale: `random(0.8, 1.2)`,
        duration: `random(3, 6)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth",
          })
        }
      })
    })

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Lighting effects */}
      <div ref={lightingEffectsRef} className="fixed inset-0 pointer-events-none z-0 opacity-50 flex items-top justify-center">
        <div className="light absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-pink-500 blur-[100px] opacity-30"></div>
        <div className="light absolute top-3/4 left-1/3 w-80 h-80 rounded-full bg-blue-500 blur-[100px] opacity-30"></div>
        <div className="light absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-green-500 blur-[100px] opacity-30"></div>
        <div className="light absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-yellow-500 blur-[100px] opacity-30"></div>
        <h1 className="text-9xl font-bold mx-10 my-15 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 opacity-50">Be Among Us</h1>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center my-25">
            <h1 className="animate-hero text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-green-500">
              Streamlining Complaint Management with Ease!
            </h1>
            <p className="animate-hero text-sm md:text-base font-sans text-gray-400 max-w-3xl mx-auto mb-10">
            Say goodbye to long queues and delayed responses! Our platform empowers you to raise complaints effortlessly, track their status in real time, and get quick resolutions.
            </p>
            <div className="animate-hero flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Link
                to="/signup"    
                className="px-8 py-3 rounded-md bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-medium text-lg transition-all transform hover:scale-105"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="px-8 py-3 rounded-md bg-gray-800 hover:bg-gray-700 text-white font-medium text-lg transition-all"
              >
                Learn More
              </a>
            </div>
            <div className="animate-hero relative mx-auto max-w-5xl">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-blue-500/20 to-green-500/20 rounded-xl blur-xl"></div>
              <div className="relative bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-800">
                <img src={previewImage} alt="Dashboard Preview" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-green-500">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to track and improve your academic performance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Seamless Complaint Registration",
                description:
                  "Easily file complaints with a single click. Our intuitive form ensures you provide all necessary details for a quick resolution.",
                icon: (
                  <svg
                    className="w-10 h-10 text-pink-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                ),
              },
              {
                title: "Smart Analytics & Insights",
                description: "View interactive pie charts and real-time data on the number of complaints raised and resolved, helping you track trends efficiently.",
                icon: (
                  <svg
                    className="w-10 h-10 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                ),
              },
              {
                title: " Secure Authentication & Session Management",
                description:
                  "Your data is protected with secure login and session handling, ensuring a safe and uninterrupted experience.",
                icon: (
                  <svg
                    className="w-10 h-10 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                ),
              },
              {
                title: "Automated Report Generation",
                description:
                  "Generate validated PDFs of your complaints with one click, making documentation simple and accessible anytime.",
                icon: (
                  <svg
                    className="w-10 h-10 text-yellow-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                ),
              },
              {
                title: "Futuristic & Smooth UI",
                description:
                  "Experience a visually stunning UI with GSAP animations and a sleek black-pink-green-yellow-orange-blue theme for a modern feel.",
                icon: (
                  <svg
                    className="w-10 h-10 text-pink-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    ></path>
                  </svg>
                ),
              },
              {
                title: "Personalized Dashboard & Settings",
                description:
                  "Manage your profile, customize settings, and navigate through a well-structured dashboard tailored to your needs.",
                icon: (
                  <svg
                    className="w-10 h-10 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "95%", label: "Student Satisfaction" },
              { value: "87%", label: "Grade Improvement" },
              { value: "50K+", label: "Active Users" },
              { value: "200+", label: "Educational Institutions" },
            ].map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <div className="text-3xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-green-500">
                  {stat.value}
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" ref={testimonialsRef} className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-green-500">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of students who have transformed their academic journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Computer Science Student",
                content:
                  "StudentPerform helped me organize my study schedule and track my progress. My GPA improved from 3.2 to 3.8 in just one semester!",
                avatar: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Sarah Williams",
                role: "Biology Major",
                content:
                  "The analytics and insights helped me identify my weak areas and focus my study time more effectively. I'm now confident going into exams.",
                avatar: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Michael Chen",
                role: "Engineering Student",
                content:
                  "The personalized recommendations were spot on! I discovered study techniques that work perfectly for my learning style.",
                avatar: "/placeholder.svg?height=100&width=100",
              },
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">{testimonial.content}</p>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-500/20 via-blue-500/20 to-green-500/20 backdrop-blur-sm relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="animate-cta text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Academic Journey?</h2>
          <p className="animate-cta text-xl text-gray-300 mb-8">
            Join thousands of students who have already improved their grades and study habits.
          </p>
          <div className="animate-cta">
            <Link
              to="/signup"
              className="px-8 py-3 rounded-md bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-medium text-lg transition-all transform hover:scale-105"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LandingPage

