"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Calendar, FileText, ChevronDown, ChevronUp, Save, Bookmark, BookmarkMinus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import LatexRenderer from "@/components/ui/latex-renderer"
import { BlockMath } from "react-katex"

import { contestData } from "@/data" // Mengambil data dari struktur baru
import type { Contest, Problem } from "@/data/types"

export default function ProblemsPage() {
  // --- PERUBAHAN: State untuk filter dan search ---
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCompetition, setSelectedCompetition] = useState("All")
  const [selectedYear, setSelectedYear] = useState("All")
  // ----------------------------------------------
  
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null)
  const [expandedSolutions, setExpandedSolutions] = useState<Set<string>>(new Set())
  const [bookmarkedProblems, setBookmarkedProblems] = useState<Set<string>>(new Set())

  const contests = contestData
  
  // --- PERUBAHAN: Data untuk opsi dropdown ---
  const competitionNames = ["All", ...new Set(contests.map(c => c.name))]
  const years = ["All", ...new Set(contests.map(c => c.year.toString()))].sort((a, b) => {
    if (a === "All") return -1;
    if (b === "All") return 1;
    return Number(b) - Number(a);
  });
  // ----------------------------------------------

  // --- PERUBAHAN: Logika untuk memfilter kontes ---
  const filteredContests = contests.filter(contest => {
    const matchesSearch = contest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contest.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompetition = selectedCompetition === "All" || contest.name === selectedCompetition;
    const matchesYear = selectedYear === "All" || contest.year.toString() === selectedYear;

    return matchesSearch && matchesCompetition && matchesYear;
  });
  // ------------------------------------------------

  const toggleBookmark = (problemId: string) => {
    setBookmarkedProblems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(problemId)) newSet.delete(problemId)
      else newSet.add(problemId)
      return newSet
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "High School": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "Undergraduate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "Graduate": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  const toggleSolution = (problemId: string) => {
    setExpandedSolutions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(problemId)) newSet.delete(problemId)
      else newSet.add(problemId)
      return newSet
    })
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Contest Problems</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Challenge yourself with problems from prestigious mathematics competitions around the world.
          </p>
        </motion.div>

        {/* --- PERUBAHAN: UI untuk Search dan Filter --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 p-6 bg-white/50 dark:bg-[#1b263b]/50 backdrop-blur-sm rounded-lg border dark:border-[#415a77]/30"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search contests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:col-span-1">
              <Select value={selectedCompetition} onValueChange={setSelectedCompetition}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by competition..." />
                </SelectTrigger>
                <SelectContent>
                  {competitionNames.map(name => (
                    <SelectItem key={name} value={name}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-1">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by year..." />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>
        {/* ------------------------------------------- */}

        {/* Contest Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* PERUBAHAN: Menggunakan filteredContests */}
          {filteredContests.map((contest, index) => (
            <motion.div
              key={contest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card
                className="h-full bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm border-gray-200 dark:border-[#415a77]/30 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedContest(contest)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getDifficultyColor(contest.difficulty)}>{contest.difficulty}</Badge>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {contest.year}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {contest.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{contest.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <FileText className="h-4 w-4 mr-1" />
                      {contest.problemCount} problems
                    </div>
                    <Trophy className="h-5 w-5 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* --- PERUBAHAN: Pesan jika tidak ada hasil --- */}
        {filteredContests.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No contests found matching your criteria.</p>
          </motion.div>
        )}
        {/* --------------------------------------------- */}


        {/* Contest Modal */}
        <Dialog open={!!selectedContest} onOpenChange={() => setSelectedContest(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedContest?.name} {selectedContest?.year}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{selectedContest?.description}</p>
                </div>
                <Button variant="outline" size="sm" className="ml-4 bg-transparent">
                  <Save className="h-4 w-4 mr-2" />
                  Save Progress
                </Button>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-6">
              {selectedContest?.problems.map((problem, index) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="bg-white/50 dark:bg-[#1b263b]/50 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Problem {problem.problemNumber}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                              <div key={i} className={`w-2 h-2 rounded-full mr-1 ${i < problem.difficulty ? "bg-yellow-400" : "bg-gray-300 dark:bg-gray-600"}`} />
                            ))}
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => toggleBookmark(problem.id)}>
                            {bookmarkedProblems.has(problem.id) ? <BookmarkMinus className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        <LatexRenderer>{problem.statement}</LatexRenderer>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => toggleSolution(problem.id)} className="mb-4">
                        {expandedSolutions.has(problem.id) ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
                        {expandedSolutions.has(problem.id) ? "Hide Solution" : "Show Solution"}
                      </Button>
                      <AnimatePresence>
                        {expandedSolutions.has(problem.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500"
                          >
                            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Solution:</h4>
                            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                               <BlockMath math={problem.solution} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}