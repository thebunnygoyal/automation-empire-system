'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Clock, TrendingUp, Shield, Search, Filter, Download, Eye, Star } from 'lucide-react'

interface Workflow {
  id: string
  name: string
  category: string
  description: string
  roi: string
  timeSaved: string
  price: number
  rating: number
  downloads: number
  tags: string[]
}

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'all', name: 'All Workflows', icon: '🎯' },
    { id: 'revenue', name: 'Revenue Generators', icon: '💰' },
    { id: 'time', name: 'Time Liberators', icon: '⏰' },
    { id: 'scale', name: 'Scale Accelerators', icon: '📈' },
    { id: 'risk', name: 'Risk Eliminators', icon: '🛡️' }
  ]

  useEffect(() => {
    fetchWorkflows()
  }, [])

  const fetchWorkflows = async () => {
    try {
      const response = await fetch('/api/workflows')
      const data = await response.json()
      
      // Enhance with additional mock data
      const enhancedWorkflows = data.workflows.map((w: any) => ({
        ...w,
        rating: 4.5 + Math.random() * 0.5,
        downloads: Math.floor(100 + Math.random() * 1000),
        tags: generateTags(w.category)
      }))
      
      setWorkflows(enhancedWorkflows)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch workflows:', error)
      setLoading(false)
    }
  }

  const generateTags = (category: string) => {
    const tagMap: { [key: string]: string[] } = {
      'Revenue Generator': ['sales', 'leads', 'conversion', 'monetization'],
      'Time Liberator': ['productivity', 'automation', 'efficiency', 'scheduling'],
      'Scale Accelerator': ['growth', 'distribution', 'multi-channel', 'scaling'],
      'Risk Eliminator': ['security', 'compliance', 'monitoring', 'protection']
    }
    return tagMap[category] || ['automation', 'workflow']
  }

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                           workflow.category.toLowerCase().includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: JSX.Element } = {
      'Revenue Generator': <DollarSign className="w-5 h-5" />,
      'Time Liberator': <Clock className="w-5 h-5" />,
      'Scale Accelerator': <TrendingUp className="w-5 h-5" />,
      'Risk Eliminator': <Shield className="w-5 h-5" />
    }
    return icons[category] || <TrendingUp className="w-5 h-5" />
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Revenue Generator': 'from-green-400 to-emerald-600',
      'Time Liberator': 'from-blue-400 to-cyan-600',
      'Scale Accelerator': 'from-purple-400 to-pink-600',
      'Risk Eliminator': 'from-orange-400 to-red-600'
    }
    return colors[category] || 'from-gray-400 to-gray-600'
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-empire-900/20 via-gray-950 to-gray-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-empire-200 to-empire-400 bg-clip-text text-transparent">
              Workflow Marketplace
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Battle-tested automation workflows that generate revenue, save time, and scale your empire.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search workflows..."
              className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-empire-500 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-empire-600 text-white'
                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400">
            Found <span className="text-white font-semibold">{filteredWorkflows.length}</span> workflows
          </p>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </button>
        </div>
      </section>

      {/* Workflows Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-empire-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading workflows...</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkflows.map((workflow, index) => (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r ${getCategoryColor(workflow.category)} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity" />
                <div className="relative p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${getCategoryColor(workflow.category)}`}>
                      {getCategoryIcon(workflow.category)}
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-400 mb-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm">{workflow.rating.toFixed(1)}</span>
                      </div>
                      <p className="text-xs text-gray-500">{workflow.downloads} downloads</p>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2">{workflow.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{workflow.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {workflow.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Time Saved</p>
                      <p className="font-semibold">{workflow.timeSaved}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ROI</p>
                      <p className="font-semibold text-green-400">{workflow.roi}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-empire-600 hover:bg-empire-500 rounded-lg font-medium transition-colors">
                      <Download className="w-4 h-4" />
                      Get Workflow
                    </button>
                    <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="absolute top-6 right-6">
                    <span className="px-3 py-1 bg-green-900/30 text-green-400 text-sm rounded-full border border-green-800">
                      ${workflow.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}