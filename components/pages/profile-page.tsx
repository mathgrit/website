"use client"

import { motion } from "framer-motion"
import { User, Mail, Calendar, Trophy, Flame, Star, Edit } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"

export default function ProfilePage() {
  const { user } = useAuth()

  // Fungsi untuk memformat tanggal bergabung
  const formatJoinDate = (dateString?: string) => {
    if (!dateString) return "Not available";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  if (!user) {
    return <div>Please sign in to view your profile.</div>
  }

  const stats = [
    { label: "Total XP", value: (user?.xp || 0).toLocaleString(), icon: Trophy, color: "text-blue-600 dark:text-cyan-400" },
    { label: "Current Streak", value: `${user?.streak || 0} days`, icon: Flame, color: "text-orange-500" },
    { label: "Level", value: (user?.level || 1).toString(), icon: Star, color: "text-purple-500" },
    { label: "Member Since", value: formatJoinDate(user?.created_at), icon: Calendar, color: "text-green-500" },
  ]

  const badges = [
    { name: "First Steps", description: "Complete your first lesson", earned: true, color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
    { name: "Quiz Master", description: "Score 90% or higher on 5 quizzes", earned: true, color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
    { name: "Problem Solver", description: "Solve 10 contest problems", earned: false, color: "bg-gray-100 text-gray-800" },
    { name: "Streak Keeper", description: "Maintain a 7-day streak", earned: true, color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400" },
    { name: "Math Olympian", description: "Solve an IMO problem", earned: true, color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" },
    { name: "Calculus Expert", description: "Complete all calculus courses", earned: false, color: "bg-gray-100 text-gray-800" },
]

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
              {user?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <Button
              size="icon"
              variant="outline"
              className="absolute bottom-0 right-0 rounded-full w-8 h-8 bg-transparent"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{user?.full_name || user.email}</h1>
          <p className="text-gray-600 dark:text-gray-300 flex items-center justify-center">
            <Mail className="h-4 w-4 mr-2" />
            {user.email}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm border-gray-200 dark:border-[#415a77]/30 text-center">
                <CardContent className="p-6">
                  <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm border-gray-200 dark:border-[#415a77]/30">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        badge.earned ? "bg-yellow-50 dark:bg-yellow-900/20" : "bg-gray-50 dark:bg-gray-800/20"
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          badge.earned
                            ? "bg-yellow-400 text-yellow-900"
                            : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        <Trophy className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-sm font-medium ${badge.earned ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
                          {badge.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{badge.description}</p>
                      </div>
                      {badge.earned && <Badge className={badge.color}>Earned</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm border-gray-200 dark:border-[#415a77]/30">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-[#415a77]/20">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Receive updates about your progress</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-[#415a77]/20">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Privacy Settings</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Control your profile visibility</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-[#415a77]/20">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Change Password</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Update your account password</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-[#415a77]/30">
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}