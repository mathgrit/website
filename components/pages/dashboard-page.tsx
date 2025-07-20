"use client"

import { motion } from "framer-motion"
import { Trophy, Flame, Star, BookOpen, Brain, Target, CheckCircle, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useProgress } from "@/contexts/progress-context"

export default function DashboardPage() {
  const { user } = useAuth()
  const { progress } = useProgress()

  // Data dummy untuk bagian yang belum terhubung ke database
  const recentActivity = [
    { type: "lesson", title: "Completed: Limits and Derivatives", time: "2 hours ago", xp: 50 },
    { type: "quiz", title: "Quiz: Polynomial Operations", time: "1 day ago", xp: 30 },
    { type: "problem", title: "Solved: IMO 2023 Problem 1", time: "2 days ago", xp: 100 },
  ]
  const achievements = [
    { name: "First Steps", description: "Complete your first lesson", earned: true },
    { name: "Quiz Master", description: "Score 90% or higher on 5 quizzes", earned: true },
    { name: "Problem Solver", description: "Solve 10 contest problems", earned: false },
  ]
  const recommendations = [
    { id: "discrete-math", title: "Discrete Mathematics", progress: 30, difficulty: "Advanced" },
    { id: "statistics", title: "Statistics and Probability", progress: 20, difficulty: "Beginner" },
    { id: "geometry-intro", title: "Euclidean Geometry", progress: 45, difficulty: "Intermediate" },
  ]

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading your dashboard...</p>
      </div>
    )
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "lesson": return BookOpen
      case "quiz": return Brain
      case "problem": return Target
      default: return Star
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800"
      case "Intermediate": return "bg-yellow-100 text-yellow-800"
      case "Advanced": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen pt-8 pb-12 dark:bg-[#0d1b2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Welcome back, {user.full_name || user.email}! 👋</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">Ready to continue your mathematical journey?</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Card className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Total XP</p>
                    <p className="text-3xl font-bold">{(user.xp || 0).toLocaleString()}</p>
                  </div>
                  <Trophy className="h-12 w-12 text-blue-100" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Card className="bg-gradient-to-r from-orange-500 to-red-400 text-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100">Current Streak</p>
                    <p className="text-3xl font-bold">{(user.streak || 0)} days</p>
                  </div>
                  <Flame className="h-12 w-12 text-orange-100" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <Card className="bg-gradient-to-r from-purple-500 to-pink-400 text-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Level</p>
                    <p className="text-3xl font-bold">{user.level || 1}</p>
                  </div>
                  <Star className="h-12 w-12 text-purple-100" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <Card className="bg-gradient-to-r from-green-500 to-teal-400 text-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Courses</p>
                    <p className="text-3xl font-bold">{Object.keys(progress).length}</p>
                  </div>
                  <BookOpen className="h-12 w-12 text-green-100" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Continue Learning Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Continue Learning</CardTitle>
              <CardDescription className="text-blue-100">Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Algebra II: Quadratic Equations</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>75%</span>
                  </div>
                  <Progress 
                    value={75} 
                    className="h-2 bg-white/20 [&>div]:bg-gradient-to-r [&>div]:from-cyan-400 [&>div]:to-blue-500" 
                  />
                </div>
              </div>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                Continue Lesson
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
            <Card className="shadow-md dark:bg-[#1b263b]/80 dark:border-[#415a77]/30">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">My Progress</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Your learning achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
                    <p className="text-gray-600 dark:text-gray-300">Lessons Completed</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">88%</p>
                    <p className="text-gray-600 dark:text-gray-300">Average Score</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                    <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{(user.xp || 0).toLocaleString()}</p>
                    <p className="text-gray-600 dark:text-gray-300">Points Earned</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
            <Card className="shadow-md dark:bg-[#1b263b]/80 dark:border-[#415a77]/30">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Your latest learning activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const IconComponent = getActivityIcon(activity.type);
                  return (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-[#415a77]/20 hover:bg-gray-100 dark:hover:bg-[#415a77]/30 transition-colors">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <IconComponent className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{activity.time}</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">+{activity.xp} XP</Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recommendations and Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
            <Card className="shadow-md dark:bg-[#1b263b]/80 dark:border-[#415a77]/30">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Recommended For You</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Continue your math journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((course) => (
                  <Link key={course.id} href={`/lessons/${course.id}`}>
                    <div className="p-4 border border-gray-200 dark:border-[#415a77]/30 rounded-lg hover:bg-gray-50 dark:hover:bg-[#415a77]/20 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{course.title}</h4>
                        <Badge className={getDifficultyColor(course.difficulty)}>{course.difficulty}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }}>
            <Card className="shadow-md dark:bg-[#1b263b]/80 dark:border-[#415a77]/30">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Your learning milestones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${achievement.earned ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700" : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"}`}>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${achievement.earned ? "bg-green-100 dark:bg-green-900/50" : "bg-gray-100 dark:bg-gray-700"}`}>
                        <Trophy className={`h-5 w-5 ${achievement.earned ? "text-green-600 dark:text-green-400" : "text-gray-400"}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${achievement.earned ? "text-green-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
                          {achievement.name}
                        </h4>
                        <p className={`text-sm ${achievement.earned ? "text-green-700 dark:text-green-300" : "text-gray-500 dark:text-gray-400"}`}>
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.earned && <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Earned</Badge>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}