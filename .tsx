"use client"

import { useState, useEffect } from "react"
import { Calendar, CheckCircle, MessageSquare, Plus, Star, Award, BarChart2, Users, Settings, LogOut, Search, Bell, Filter, Clock, Trash2, Edit, Share2, X, Menu } from 'lucide-react'

export default function GoalTracker() {
  // State for responsive design
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCreatingGoal, setIsCreatingGoal] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  // Sample data
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Complete Website Redesign",
      description: "Overhaul the company website with new branding and improved UX",
      progress: 65,
      dueDate: "May 20, 2025",
      category: "Work",
      team: true,
      milestones: [
        { id: 1, title: "Design mockups approved", completed: true },
        { id: 2, title: "Homepage implementation", completed: true },
        { id: 3, title: "Product pages implementation", completed: false },
        { id: 4, title: "Mobile responsiveness", completed: false },
      ],
      comments: [
        {
          id: 1,
          user: "Alex Kim",
          avatar: "/placeholder.svg?height=32&width=32",
          text: "The new color scheme looks amazing!",
          date: "2 days ago",
        },
        {
          id: 2,
          user: "Jordan Lee",
          avatar: "/placeholder.svg?height=32&width=32",
          text: "Can we discuss the product page layout?",
          date: "Yesterday",
        },
      ],
    },
    {
      id: 2,
      title: "Run Half Marathon",
      description: "Train and complete my first half marathon race",
      progress: 40,
      dueDate: "June 15, 2025",
      category: "Personal",
      team: false,
      milestones: [
        { id: 1, title: "Run 5km without stopping", completed: true },
        { id: 2, title: "Run 10km under 60 minutes", completed: false },
        { id: 3, title: "Complete 15km training run", completed: false },
      ],
      comments: [
        {
          id: 1,
          user: "Morgan Smith",
          avatar: "/placeholder.svg?height=32&width=32",
          text: "You're making great progress! Keep it up!",
          date: "3 days ago",
        },
      ],
    },
    {
      id: 3,
      title: "Learn React Advanced Concepts",
      description: "Master Hooks, Context API, and Redux",
      progress: 85,
      dueDate: "May 10, 2025",
      category: "Learning",
      team: false,
      milestones: [
        { id: 1, title: "Complete Hooks tutorial", completed: true },
        { id: 2, title: "Build project with Context API", completed: true },
        { id: 3, title: "Master Redux fundamentals", completed: true },
        { id: 4, title: "Create complex state management app", completed: false },
      ],
      comments: [],
    },
    {
      id: 4,
      title: "Save for Vacation",
      description: "Save $3,000 for summer trip to Europe",
      progress: 30,
      dueDate: "July 30, 2025",
      category: "Finance",
      team: false,
      milestones: [
        { id: 1, title: "Save first $1,000", completed: true },
        { id: 2, title: "Research affordable accommodations", completed: true },
        { id: 3, title: "Save remaining $2,000", completed: false },
        { id: 4, title: "Book flights and hotels", completed: false },
      ],
      comments: [
        {
          id: 1,
          user: "You",
          avatar: "/placeholder.svg?height=32&width=32",
          text: "Found some great deals on accommodations in Barcelona!",
          date: "1 week ago",
        },
      ],
    },
    {
      id: 5,
      title: "Improve Fitness",
      description: "Exercise regularly and improve overall health",
      progress: 50,
      dueDate: "Ongoing",
      category: "Health",
      team: false,
      milestones: [
        { id: 1, title: "Join gym", completed: true },
        { id: 2, title: "Work out 3x per week for a month", completed: true },
        { id: 3, title: "Reduce body fat by 5%", completed: false },
        { id: 4, title: "Run 5K in under 25 minutes", completed: false },
      ],
      comments: [],
    },
  ])

  const [selectedGoal, setSelectedGoal] = useState(goals[0])
  const [activeTab, setActiveTab] = useState("overview")
  const [newComment, setNewComment] = useState("")
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "Work",
    dueDate: "",
    team: false,
  })
  const [newMilestone, setNewMilestone] = useState("")
  const [isAddingMilestone, setIsAddingMilestone] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("All Categories")

  // Category colors for visual distinction
  const categoryColors = {
    Work: "bg-blue-100 text-blue-800",
    Personal: "bg-green-100 text-green-800",
    Learning: "bg-purple-100 text-purple-800",
    Health: "bg-red-100 text-red-800",
    Finance: "bg-yellow-100 text-yellow-800",
  }

  // Filter goals based on search term and category
  const filteredGoals = goals.filter((goal) => {
    const matchesSearch =
      goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "All Categories" || goal.category === filterCategory
    return matchesSearch && matchesCategory
  })

  // Handle adding a new comment
  const addComment = () => {
    if (newComment.trim() === "") return

    const updatedGoals = goals.map((goal) => {
      if (goal.id === selectedGoal.id) {
        return {
          ...goal,
          comments: [
            ...goal.comments,
            {
              id: Math.max(0, ...goal.comments.map((c) => c.id)) + 1,
              user: "You",
              avatar: "/placeholder.svg?height=32&width=32",
              text: newComment,
              date: "Just now",
            },
          ],
        }
      }
      return goal
    })

    setGoals(updatedGoals)
    setSelectedGoal(updatedGoals.find((g) => g.id === selectedGoal.id) || updatedGoals[0])
    setNewComment("")
  }

  // Handle toggling milestone completion
  const toggleMilestone = (milestoneId) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === selectedGoal.id) {
        return {
          ...goal,
          milestones: goal.milestones.map((m) => (m.id === milestoneId ? { ...m, completed: !m.completed } : m)),
        }
      }
      return goal
    })

    // Update goal progress based on completed milestones
    const updatedGoalsWithProgress = updatedGoals.map((goal) => {
      if (goal.id === selectedGoal.id) {
        const totalMilestones = goal.milestones.length
        const completedMilestones = goal.milestones.filter((m) => m.completed).length
        const newProgress = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0
        return { ...goal, progress: newProgress }
      }
      return goal
    })

    setGoals(updatedGoalsWithProgress)
    setSelectedGoal(updatedGoalsWithProgress.find((g) => g.id === selectedGoal.id) || updatedGoalsWithProgress[0])
  }

  // Handle adding a new milestone
  const addMilestone = () => {
    if (newMilestone.trim() === "") return

    const updatedGoals = goals.map((goal) => {
      if (goal.id === selectedGoal.id) {
        const newMilestoneObj = {
          id: Math.max(0, ...goal.milestones.map((m) => m.id)) + 1,
          title: newMilestone,
          completed: false,
        }

        return {
          ...goal,
          milestones: [...goal.milestones, newMilestoneObj],
        }
      }
      return goal
    })

    setGoals(updatedGoals)
    setSelectedGoal(updatedGoals.find((g) => g.id === selectedGoal.id) || updatedGoals[0])
    setNewMilestone("")
    setIsAddingMilestone(false)
  }

  // Handle creating a new goal
  const createNewGoal = () => {
    if (newGoal.title.trim() === "") return

    const newGoalObj = {
      id: Math.max(0, ...goals.map((g) => g.id)) + 1,
      title: newGoal.title,
      description: newGoal.description,
      progress: 0,
      dueDate: newGoal.dueDate || "Not set",
      category: newGoal.category,
      team: newGoal.team,
      milestones: [],
      comments: [],
    }

    const updatedGoals = [...goals, newGoalObj]
    setGoals(updatedGoals)
    setSelectedGoal(newGoalObj)
    setNewGoal({
      title: "",
      description: "",
      category: "Work",
      dueDate: "",
      team: false,
    })
    setIsCreatingGoal(false)
  }

  // Handle deleting a goal
  const deleteGoal = (goalId) => {
    const updatedGoals = goals.filter((goal) => goal.id !== goalId)
    setGoals(updatedGoals)

    if (selectedGoal.id === goalId) {
      setSelectedGoal(updatedGoals[0] || null)
    }
  }

  // Close mobile menu when a goal is selected
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [selectedGoal])

  // Calculate statistics
  const completedGoals = goals.filter((g) => g.progress === 100).length
  const totalMilestones = goals.reduce((acc, goal) => acc + goal.milestones.length, 0)
  const completedMilestones = goals.reduce((acc, goal) => acc + goal.milestones.filter((m) => m.completed).length, 0)

  // New Goal Modal
  const NewGoalModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Create New Goal</h2>
          <button onClick={() => setIsCreatingGoal(false)} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter goal title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter goal description"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={newGoal.category}
              onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(categoryColors).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              value={newGoal.dueDate}
              onChange={(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="teamGoal"
              checked={newGoal.team}
              onChange={(e) => setNewGoal({ ...newGoal, team: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="teamGoal" className="ml-2 block text-sm text-gray-700">
              Team Goal
            </label>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => setIsCreatingGoal(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={createNewGoal}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            disabled={!newGoal.title.trim()}
          >
            Create Goal
          </button>
        </div>
      </div>
    </div>
  )

  // Settings Modal
  const SettingsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button onClick={() => setIsSettingsOpen(false)} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Account</h3>
            <div className="flex items-center">
              <img src="/placeholder.svg?height=64&width=64" alt="Profile" className="w-16 h-16 rounded-full" />
              <div className="ml-4">
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">john.doe@example.com</p>
                <button className="text-blue-600 text-sm mt-1">Change profile picture</button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input type="checkbox" id="darkMode" className="sr-only" />
                  <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input type="checkbox" id="emailNotif" className="sr-only" defaultChecked />
                  <div className="block bg-blue-600 w-10 h-6 rounded-full"></div>
                  <div className="dot absolute left-5 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Weekly Progress Report</span>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input type="checkbox" id="weeklyReport" className="sr-only" defaultChecked />
                  <div className="block bg-blue-600 w-10 h-6 rounded-full"></div>
                  <div className="dot absolute left-5 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Data & Privacy</h3>
            <div className="space-y-2">
              <button className="text-blue-600 text-sm">Export all data</button>
              <button className="text-red-600 text-sm">Delete account</button>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-white shadow-md text-gray-700"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar - Desktop always visible, Mobile conditionally visible */}
      <div
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-20 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">GoalTracker</h1>
        </div>

        <nav className="flex-1 pt-4 overflow-y-auto">
          <div className="px-4 mb-6">
            <button
              onClick={() => setIsCreatingGoal(true)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} className="mr-2" />
              New Goal
            </button>
          </div>

          <div className="px-4 mb-2">
            <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Menu</h2>
          </div>

          <a href="#" className="flex items-center px-4 py-3 text-gray-800 bg-blue-50 border-r-4 border-blue-600">
            <BarChart2 size={20} className="mr-3 text-blue-600" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors">
            <Star size={20} className="mr-3 text-gray-400" />
            <span>My Goals</span>
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors">
            <Users size={20} className="mr-3 text-gray-400" />
            <span>Team Goals</span>
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors">
            <Award size={20} className="mr-3 text-gray-400" />
            <span>Achievements</span>
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors">
            <Calendar size={20} className="mr-3 text-gray-400" />
            <span>Calendar</span>
          </a>

          <div className="px-4 mt-8 mb-2">
            <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Categories</h2>
          </div>

          <div className="px-4">
            {Object.keys(categoryColors).map((category) => (
              <div key={category} className="flex items-center mb-2">
                <div className={`w-3 h-3 rounded-full ${categoryColors[category].split(" ")[0]}`}></div>
                <span className="ml-2 text-gray-600">{category}</span>
              </div>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors w-full"
          >
            <Settings size={20} className="mr-3 text-gray-400" />
            <span>Settings</span>
          </button>
          <a href="#" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mt-4">
            <LogOut size={20} className="mr-3 text-gray-400" />
            <span>Log out</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 lg:px-6 py-3">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search size={20} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search goals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center">
                <img src="/placeholder.svg?height=32&width=32" alt="User avatar" className="w-8 h-8 rounded-full" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 lg:p-6">
          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-700">
                  <CheckCircle size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Goals</p>
                  <p className="text-2xl font-semibold text-gray-800">{goals.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-700">
                  <Award size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Goals Completed</p>
                  <p className="text-2xl font-semibold text-gray-800">{completedGoals}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-700">
                  <Star size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Milestones Achieved</p>
                  <p className="text-2xl font-semibold text-gray-800">
                    {completedMilestones}/{totalMilestones}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="sm:hidden mb-4">
            <div className="relative">
              <Search size={20} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search goals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Goal Cards and Detail View */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Goal Cards */}
            <div className="w-full lg:w-1/3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">My Goals</h2>
                <div className="flex items-center">
                  <button className="flex items-center text-sm font-medium text-gray-600 mr-3">
                    <Filter size={16} className="mr-1" />
                    Filter
                  </button>
                  <select
                    className="text-sm border border-gray-300 rounded-md bg-white px-2 py-1"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option>All Categories</option>
                    {Object.keys(categoryColors).map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Goal Cards List */}
              <div className="space-y-4">
                {filteredGoals.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
                    No goals match your search criteria
                  </div>
                ) : (
                  filteredGoals.map((goal) => (
                    <div
                      key={goal.id}
                      className={`bg-white rounded-lg shadow-sm border-l-4 p-4 cursor-pointer transition hover:shadow ${
                        selectedGoal && selectedGoal.id === goal.id
                          ? "border-l-blue-600 ring-1 ring-blue-200"
                          : `border-l-${goal.category.toLowerCase()}-500`
                      }`}
                      onClick={() => setSelectedGoal(goal)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{goal.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${categoryColors[goal.category]}`}>
                          {goal.category}
                        </span>
                      </div>
                      <div className="mb-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              goal.progress >= 80
                                ? "bg-green-500"
                                : goal.progress >= 40
                                  ? "bg-blue-500"
                                  : "bg-yellow-500"
                            }`}
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1 text-sm text-gray-500">
                          <span>{goal.progress}% Complete</span>
                          <span>Due: {goal.dueDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm">
                        {goal.team && (
                          <span className="flex items-center text-gray-500 mr-4">
                            <Users size={14} className="mr-1" />
                            Team
                          </span>
                        )}
                        <span className="flex items-center text-gray-500 mr-4">
                          <CheckCircle size={14} className="mr-1" />
                          {goal.milestones.filter((m) => m.completed).length}/{goal.milestones.length}
                        </span>
                        <span className="flex items-center text-gray-500">
                          <MessageSquare size={14} className="mr-1" />
                          {goal.comments.length}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Goal Detail View */}
            <div className="w-full lg:w-2/3 bg-white rounded-lg shadow">
              {selectedGoal ? (
                <>
                  {/* Goal Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl font-semibold">{selectedGoal.title}</h2>
                          <span className={`px-2 py-1 text-xs rounded-full ${categoryColors[selectedGoal.category]}`}>
                            {selectedGoal.category}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">{selectedGoal.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                          <Edit size={16} className="inline mr-1" />
                          Edit
                        </button>
                        <button
                          className="bg-red-50 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
                          onClick={() => deleteGoal(selectedGoal.id)}
                        >
                          <Trash2 size={16} className="inline mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-500">Progress:</span>
                        <span className="text-sm font-semibold ml-2">{selectedGoal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
                        <div
                          className={`h-3 rounded-full ${
                            selectedGoal.progress >= 80
                              ? "bg-green-500"
                              : selectedGoal.progress >= 40
                                ? "bg-blue-500"
                                : "bg-yellow-500"
                          }`}
                          style={{ width: `${selectedGoal.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center mt-4 text-sm text-gray-600 gap-6">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-gray-400" />
                        <span className="font-medium">Due:</span> {selectedGoal.dueDate}
                      </div>
                      {selectedGoal.team && (
                        <div className="flex items-center">
                          <Users size={16} className="mr-2 text-gray-400" />
                          <span className="font-medium mr-2">Team:</span>
                          <div className="flex -space-x-2">
                            <img
                              src="/placeholder.svg?height=24&width=24"
                              alt="Team Member"
                              className="w-6 h-6 rounded-full border-2 border-white"
                            />
                            <img
                              src="/placeholder.svg?height=24&width=24"
                              alt="Team Member"
                              className="w-6 h-6 rounded-full border-2 border-white"
                            />
                            <img
                              src="/placeholder.svg?height=24&width=24"
                              alt="Team Member"
                              className="w-6 h-6 rounded-full border-2 border-white"
                            />
                          </div>
                        </div>
                      )}
                      <button className="text-blue-600 hover:text-blue-800 flex items-center">
                        <Share2 size={16} className="mr-1" />
                        Share
                      </button>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="border-b border-gray-200 overflow-x-auto">
                    <nav className="flex">
                      <button
                        className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                          activeTab === "overview"
                            ? "border-b-2 border-blue-500 text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => setActiveTab("overview")}
                      >
                        Overview
                      </button>
                      <button
                        className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                          activeTab === "milestones"
                            ? "border-b-2 border-blue-500 text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => setActiveTab("milestones")}
                      >
                        Milestones
                      </button>
                      <button
                        className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                          activeTab === "comments"
                            ? "border-b-2 border-blue-500 text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => setActiveTab("comments")}
                      >
                        Comments ({selectedGoal.comments.length})
                      </button>
                    </nav>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6">
                    {activeTab === "overview" && (
                      <div>
                        <h3 className="font-medium mb-3">Goal Summary</h3>
                        <p className="text-gray-600 mb-6">{selectedGoal.description}</p>

                        <h3 className="font-medium mb-3">Recent Activity</h3>
                        {selectedGoal.milestones.filter((m) => m.completed).length === 0 &&
                        selectedGoal.comments.length === 0 ? (
                          <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg">
                            No recent activity for this goal
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {selectedGoal.milestones.filter((m) => m.completed).length > 0 && (
                              <div className="flex">
                                <div className="flex-shrink-0">
                                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle size={16} className="text-green-600" />
                                  </div>
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm">
                                    <span className="font-medium">Milestone completed:</span>{" "}
                                    {selectedGoal.milestones.find((m) => m.completed)?.title}
                                  </p>
                                  <p className="text-xs text-gray-500">Yesterday</p>
                                </div>
                              </div>
                            )}

                            {selectedGoal.comments.length > 0 && (
                              <div className="flex">
                                <div className="flex-shrink-0">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                    <MessageSquare size={16} className="text-blue-600" />
                                  </div>
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm">
                                    <span className="font-medium">{selectedGoal.comments[0]?.user}</span> commented: "
                                    {selectedGoal.comments[0]?.text}"
                                  </p>
                                  <p className="text-xs text-gray-500">{selectedGoal.comments[0]?.date}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "milestones" && (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium">Milestones</h3>
                          <button
                            className="text-sm text-blue-600 font-medium flex items-center hover:text-blue-800"
                            onClick={() => setIsAddingMilestone(true)}
                          >
                            <Plus size={16} className="mr-1" />
                            Add Milestone
                          </button>
                        </div>

                        {isAddingMilestone && (
                          <div className="mb-4 p-4 border border-blue-200 bg-blue-50 rounded-lg">
                            <input
                              type="text"
                              placeholder="Enter milestone title..."
                              value={newMilestone}
                              onChange={(e) => setNewMilestone(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                                onClick={() => setIsAddingMilestone(false)}
                              >
                                Cancel
                              </button>
                              <button
                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                onClick={addMilestone}
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        )}

                        {selectedGoal.milestones.length === 0 ? (
                          <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg">
                            No milestones yet. Add your first milestone to track progress!
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {selectedGoal.milestones.map((milestone) => (
                              <div
                                key={milestone.id}
                                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <button
                                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                    milestone.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                                  }`}
                                  onClick={() => toggleMilestone(milestone.id)}
                                >
                                  {milestone.completed && <CheckCircle size={16} />}
                                </button>
                                <span className={`ml-3 ${milestone.completed ? "line-through text-gray-500" : ""}`}>
                                  {milestone.title}
                                </span>
                                {milestone.completed && (
                                  <span className="ml-auto">
                                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                      Completed
                                    </div>
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "comments" && (
                      <div>
                        <h3 className="font-medium mb-4">Discussion</h3>

                        {selectedGoal.comments.length === 0 ? (
                          <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg mb-6">
                            No comments yet. Be the first to comment!
                          </div>
                        ) : (
                          <div className="space-y-4 mb-6">
                            {selectedGoal.comments.map((comment) => (
                              <div key={comment.id} className="flex">
                                <img
                                  src={comment.avatar || "/placeholder.svg"}
                                  alt={comment.user}
                                  className="w-8 h-8 rounded-full mr-3"
                                />
                                <div className="bg-gray-50 rounded-lg px-4 py-3 flex-grow">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="font-medium">{comment.user}</span>
                                    <span className="text-xs text-gray-500">{comment.date}</span>
                                  </div>
                                  <p className="text-gray-700">{comment.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-4">
                          <div className="flex">
                            <img
                              src="/placeholder.svg?height=32&width=32"
                              alt="Your avatar"
                              className="w-8 h-8 rounded-full mr-3"
                            />
                            <div className="flex-grow">
                              <textarea
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Add a comment or feedback..."
                                rows="3"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                              ></textarea>
                              <div className="mt-2 flex justify-end">
                                <button
                                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                                  onClick={addComment}
                                  disabled={!newComment.trim()}
                                >
                                  Post Comment
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-500">Select a goal to view details</div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      {isCreatingGoal && <NewGoalModal />}
      {isSettingsOpen && <SettingsModal />}
    </div>
  )
}
