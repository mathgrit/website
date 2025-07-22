// Lokasi: app/about/page.tsx

"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Github, Twitter, Users, Target, Lightbulb, Rocket } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Angga Nurohman, Ph.D.",
      role: "Founder & Lead Developer",
      bio: "Passionate about creating innovative educational technology that makes learning mathematics enjoyable and accessible.",
      avatar: "/placeholder-user.jpg", // Menggunakan placeholder yang ada
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#",
      },
    },
    {
      name: "Dr. Agyl Ridwan Hakim",
      role: "Head of Curriculum",
      bio: "Mathematics educator with 15+ years of experience in developing engaging math curricula for students of all levels.",
      avatar: "/placeholder-user.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Jaki Kurniawan, M. Pd.",
      role: "UX/UI Designer",
      bio: "Creative designer focused on building intuitive and beautiful interfaces that enhance the learning experience.",
      avatar: "/placeholder-user.jpg",
      social: {
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Willy Moch. Shabirin Karmana, M. Pd.",
      role: "Data Scientist",
      bio: "Leverages machine learning and analytics to personalize learning paths and improve student outcomes.",
      avatar: "/placeholder-user.jpg",
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#",
      },
    },
    {
      name: "Faizal, M.M.",
      role: "Data Scientist",
      bio: "Leverages machine learning and analytics to personalize learning paths and improve student outcomes.",
      avatar: "/placeholder-user.jpg",
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#",
      },
    },
  ]

  const milestones = [
    {
      year: "2023",
      title: "The Idea",
      description:
        "Recognizing the need for more engaging math education, our founder began developing the concept for MathGrit.",
      icon: Lightbulb,
    },
    {
      year: "2024",
      title: "First Prototype",
      description:
        "After months of research and development, we launched our first working prototype with basic algebra lessons.",
      icon: Rocket,
    },
    {
      year: "2025",
      title: "Public Launch",
      description:
        "MathGrit officially launched to the public with a comprehensive curriculum covering multiple math topics.",
      icon: Users,
    },
    {
      year: "Future",
      title: "Global Expansion",
      description:
        "Our vision is to make MathGrit available worldwide, supporting multiple languages and educational systems.",
      icon: Target,
    },
  ]

  return (
    // Menggunakan gaya latar belakang yang konsisten dengan layout utama
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission: To Make Mathematics{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Accessible and Engaging
              </span>{" "}
              for Everyone
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              We are a passionate team of educators, developers, and mathematicians dedicated to building the future of
              math education.
            </p>
            <div className="relative">
              <img
                src="/placeholder.jpg" // Menggunakan placeholder yang ada
                alt="Mathematics learning illustration showing collaboration and innovation"
                className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </motion.section>

        {/* Our Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet the Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our diverse team brings together expertise in education, technology, and design to create the best
              possible learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm dark:bg-[#1b263b]/80 border-gray-200 dark:border-[#415a77]/30">
                  <CardHeader className="text-center pb-4 pt-6">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-white">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</CardTitle>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 mx-auto">
                      {member.role}
                    </Badge>
                  </CardHeader>
                  <CardContent className="text-center px-6 pb-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">{member.bio}</p>
                    <div className="flex justify-center space-x-2">
                      {member.social.linkedin && (
                        <Button asChild size="sm" variant="outline" className="w-10 h-10 p-0 rounded-full bg-transparent">
                           <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="h-4 w-4" /></a>
                        </Button>
                      )}
                      {member.social.github && (
                        <Button asChild size="sm" variant="outline" className="w-10 h-10 p-0 rounded-full bg-transparent">
                           <a href={member.social.github} target="_blank" rel="noopener noreferrer"><Github className="h-4 w-4" /></a>
                        </Button>
                      )}
                      {member.social.twitter && (
                        <Button asChild size="sm" variant="outline" className="w-10 h-10 p-0 rounded-full bg-transparent">
                           <a href={member.social.twitter} target="_blank" rel="noopener noreferrer"><Twitter className="h-4 w-4" /></a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Our Story Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">The Story of MathGrit</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From a simple idea to a comprehensive learning platform, here's how MathGrit came to life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Timeline */}
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <milestone.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700">
                        {milestone.year}
                      </Badge>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Story Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <Card className="overflow-hidden bg-white/80 backdrop-blur-sm dark:bg-[#1b263b]/80 border-gray-200 dark:border-[#415a77]/30">
                <CardContent className="p-0">
                  <img
                    src="/placeholder.jpg" // Menggunakan placeholder yang ada
                    alt="MathGrit journey and growth illustration"
                    className="w-full h-auto"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}