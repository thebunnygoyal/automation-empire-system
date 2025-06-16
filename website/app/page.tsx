'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, TrendingUp, Shield, Clock, DollarSign, Users, Sparkles, ChevronRight, CheckCircle } from 'lucide-react'

export default function HomePage() {
  const [email, setEmail] = useState('')
  
  const features = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Revenue Generator",
      description: "Build workflows that make money while you sleep. Turn automation into profit centers, not cost centers.",
      color: "from-green-400 to-emerald-600"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time Liberator",
      description: "Reclaim 1000+ hours per month. Let machines handle the repetitive while you focus on the strategic.",
      color: "from-blue-400 to-cyan-600"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Scale Accelerator",
      description: "Handle 10x the volume without hiring. Your empire grows exponentially, your team stays lean.",
      color: "from-purple-400 to-pink-600"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Risk Eliminator",
      description: "99.99% reliability with automatic error handling. Sleep soundly knowing your empire runs itself.",
      color: "from-orange-400 to-red-600"
    }
  ]

  const stats = [
    { value: "1000+", label: "Hours Saved Monthly" },
    { value: "60%", label: "Cost Reduction" },
    { value: "200%", label: "Efficiency Gains" },
    { value: "<3mo", label: "ROI Payback" }
  ]

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-empire-900 via-gray-950 to-gray-950 opacity-50" />
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-empire-500 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-empire-600 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-empire-900/30 border border-empire-800/50 mb-8">
              <Sparkles className="w-4 h-4 text-empire-400" />
              <span className="text-sm text-empire-300">The Revolution Begins Now</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-empire-200 to-empire-400 bg-clip-text text-transparent">
              Build Your
              <br />
              Automation Empire
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Transform your business with intelligent automation that scales infinitely, 
              generates revenue 24/7, and creates unstoppable competitive advantages.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-empire-500 to-empire-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-empire-500/25 transition-all"
              >
                Start Building Your Empire
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
              >
                View Live Demo
              </motion.button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-empire-400 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Empire's Foundation
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Four pillars of automation excellence that transform wishful thinking into market domination.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity" />
                <div className="relative p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-empire-900/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build Your Empire?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Join the revolution. Start automating today and watch your business transform into an unstoppable force.
            </p>
            
            <form className="max-w-md mx-auto flex gap-4 mb-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-empire-500 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-empire-500 to-empire-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-empire-500/25 transition-all"
              >
                Get Started
              </motion.button>
            </form>
            
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Setup in 5 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500">
              © 2025 Automation Empire. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link href="/docs" className="text-gray-400 hover:text-white transition-colors">
                Documentation
              </Link>
              <Link href="/workflows" className="text-gray-400 hover:text-white transition-colors">
                Workflows
              </Link>
              <Link href="https://github.com/thebunnygoyal/automation-empire-system" className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}