"use client"

import { motion } from "framer-motion"
import Link from "next/link" // <-- PERUBAHAN: Menggunakan Link dari Next.js
import { BookOpen, Brain, Trophy, Star, ChevronRight, Users, Award, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ParallaxBackground from "@/components/parallax-background"

export default function HomePage() {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Lessons",
      description: "Master concepts through step-by-step guided learning with visual explanations.",
      link: "/lessons",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: Brain,
      title: "Practice Quizzes",
      description: "Test your knowledge with adaptive quizzes that adjust to your skill level.",
      link: "/quizzes",
      color: "from-purple-500 to-pink-400",
    },
    {
      icon: Trophy,
      title: "Contest Problems",
      description: "Challenge yourself with problems from IMO, Putnam, AIME, and more.",
      link: "/problems",
      color: "from-orange-500 to-red-400",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "MIT Student",
      content: "MathGrit helped me ace my calculus finals. The step-by-step solutions are incredible!",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "High School Teacher",
      content: "I recommend MathGrit to all my students. The gamification keeps them engaged.",
      rating: 5,
    },
    {
      name: "Elena Rodriguez",
      role: "Competition Mathematician",
      content: "The contest problems section is a goldmine for olympiad preparation.",
      rating: 5,
    },
  ]

  const stats = [
    { icon: Users, value: "50K+", label: "Active Learners" },
    { icon: BookOpen, value: "200+", label: "Courses" },
    { icon: Award, value: "95%", label: "Success Rate" },
    { icon: TrendingUp, value: "4.9/5", label: "User Rating" },
  ]

  return (
    <div className="relative overflow-hidden">
      <ParallaxBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Master Mathematics Through{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Immersive Learning
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of students mastering mathematics through interactive lessons, adaptive quizzes, and
              challenging contest problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signin"> {/* <-- PERUBAHAN: to -> href */}
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-lg px-8 py-3"
                >
                  Start Learning
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/problems"> {/* <-- PERUBAHAN: to -> href */}
                <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-2 bg-transparent">
                  Explore Problems
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50 dark:bg-[#1b263b]/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and resources you need to master mathematics.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link href={feature.link}> {/* <-- PERUBAHAN: to -> href */}
                  <Card className="h-full bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm border-gray-200 dark:border-[#415a77]/30 hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-8">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">{feature.description}</p>
                      <div className="flex items-center text-blue-600 dark:text-cyan-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        Learn More
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white/50 dark:bg-[#1b263b]/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">What Our Students Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of successful learners who've transformed their math skills.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm border-gray-200 dark:border-[#415a77]/30">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Transform Your Math Skills?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join MathGrit today and start your journey to mathematical mastery.
            </p>
            <Link href="/signup"> {/* <-- PERUBAHAN: to -> href */}
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-lg px-8 py-3"
              >
                Get Started Free
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}