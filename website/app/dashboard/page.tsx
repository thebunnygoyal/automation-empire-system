'use client'

import { useEffect, useState } from 'react'
import { Clock, DollarSign, Zap, Shield, TrendingUp, Users, Activity } from 'lucide-react'
import { motion } from 'framer-motion'

interface Metric {
  label: string
  value: string | number
  change: number
  icon: JSX.Element
  color: string
  subtext?: string
}

interface Workflow {
  id: string
  name: string
  category: string
  executions: number
  timeSaved: string
  roi: string
  status: 'active' | 'inactive' | 'error'
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setMetrics([
        {
          label: 'Time Saved',
          value: '1,247 hrs',
          change: 23,
          icon: <Clock className="w-6 h-6" />,
          color: 'blue',
          subtext: 'This month'
        },
        {
          label: 'Revenue Impact',
          value: '$127.4K',
          change: 47,
          icon: <DollarSign className="w-6 h-6" />,
          color: 'green',
          subtext: 'Generated'
        },
        {
          label: 'Active Workflows',
          value: 68,
          change: 12,
          icon: <Zap className="w-6 h-6" />,
          color: 'purple',
          subtext: 'Running 24/7'
        },
        {
          label: 'Success Rate',
          value: '99.7%',
          change: 2.1,
          icon: <Shield className="w-6 h-6" />,
          color: 'orange',
          subtext: 'Reliability'
        }
      ])

      setWorkflows([
        {
          id: '1',
          name: 'Lead Qualification Money Printer',
          category: 'Revenue Generator',
          executions: 3847,
          timeSaved: '642 hrs',
          roi: '+387%',
          status: 'active'
        },
        {
          id: '2',
          name: 'Content Distribution Engine',
          category: 'Scale Accelerator',
          executions: 1293,
          timeSaved: '215 hrs',
          roi: '+523%',
          status: 'active'
        },
        {
          id: '3',
          name: 'Meeting Prep Automation',
          category: 'Time Liberator',
          executions: 892,
          timeSaved: '178 hrs',
          roi: '+245%',
          status: 'active'
        }
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-900/30 text-blue-400',
      green: 'bg-green-900/30 text-green-400',
      purple: 'bg-purple-900/30 text-purple-400',
      orange: 'bg-orange-900/30 text-orange-400'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-empire-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-empire-400 to-empire-600 bg-clip-text text-transparent">
                Empire Analytics
              </h1>
              <span className="px-3 py-1 bg-green-900/30 text-green-400 text-sm rounded-full border border-green-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Live
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                Export Report
              </button>
              <button className="px-4 py-2 bg-empire-600 hover:bg-empire-500 rounded-lg transition-colors">
                Configure
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${getColorClasses(metric.color)}`}>
                  {metric.icon}
                </div>
                <span className="text-sm text-green-400">+{metric.change}%</span>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{metric.label}</h3>
              <p className="text-3xl font-bold">{metric.value}</p>
              {metric.subtext && (
                <p className="text-sm text-gray-500 mt-1">{metric.subtext}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Activity Graph Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-empire-400" />
              Workflow Performance
            </h3>
            <div className="h-64 flex items-center justify-center text-gray-600">
              {/* Placeholder for chart */}
              <p>Performance chart visualization</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-empire-400" />
              Revenue by Category
            </h3>
            <div className="h-64 flex items-center justify-center text-gray-600">
              {/* Placeholder for chart */}
              <p>Revenue distribution visualization</p>
            </div>
          </motion.div>
        </div>

        {/* Workflow Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-empire-400" />
              Top Performing Workflows
            </h3>
            <button className="text-empire-400 hover:text-empire-300 text-sm">
              View All →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Workflow</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Executions</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Time Saved</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">ROI</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {workflows.map((workflow) => (
                  <tr key={workflow.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                    <td className="py-3 px-4 font-medium">{workflow.name}</td>
                    <td className="py-3 px-4 text-gray-400">{workflow.category}</td>
                    <td className="py-3 px-4 text-right">{workflow.executions.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">{workflow.timeSaved}</td>
                    <td className="py-3 px-4 text-right text-green-400">{workflow.roi}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded-full">
                        {workflow.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  )
}