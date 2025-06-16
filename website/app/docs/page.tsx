'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Book, Code, Zap, Shield, Users, ArrowRight, ChevronRight, Search } from 'lucide-react'
import Link from 'next/link'

interface DocSection {
  id: string
  title: string
  icon: JSX.Element
  articles: DocArticle[]
}

interface DocArticle {
  id: string
  title: string
  description: string
  readTime: string
  href: string
}

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSection, setSelectedSection] = useState('getting-started')

  const docSections: DocSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Book className="w-5 h-5" />,
      articles: [
        {
          id: 'intro',
          title: 'Introduction to Automation Empire',
          description: 'Learn the core concepts and philosophy behind building automated empires',
          readTime: '5 min',
          href: '/docs/getting-started/introduction'
        },
        {
          id: 'quickstart',
          title: 'Quick Start Guide',
          description: 'Get your first workflow running in under 5 minutes',
          readTime: '3 min',
          href: '/docs/getting-started/quickstart'
        },
        {
          id: 'architecture',
          title: 'System Architecture',
          description: 'Understand how all the pieces fit together',
          readTime: '8 min',
          href: '/docs/getting-started/architecture'
        }
      ]
    },
    {
      id: 'workflows',
      title: 'Building Workflows',
      icon: <Zap className="w-5 h-5" />,
      articles: [
        {
          id: 'basics',
          title: 'Workflow Basics',
          description: 'Core concepts for building powerful automations',
          readTime: '6 min',
          href: '/docs/workflows/basics'
        },
        {
          id: 'nodes',
          title: 'Working with Nodes',
          description: 'Master the building blocks of automation',
          readTime: '10 min',
          href: '/docs/workflows/nodes'
        },
        {
          id: 'templates',
          title: 'Using Templates',
          description: 'Accelerate development with pre-built workflows',
          readTime: '4 min',
          href: '/docs/workflows/templates'
        }
      ]
    },
    {
      id: 'deployment',
      title: 'Deployment',
      icon: <Code className="w-5 h-5" />,
      articles: [
        {
          id: 'azure',
          title: 'Deploy to Azure',
          description: 'Step-by-step Azure deployment guide',
          readTime: '7 min',
          href: '/docs/deployment/azure'
        },
        {
          id: 'scaling',
          title: 'Scaling Your Empire',
          description: 'Handle 10x growth without breaking a sweat',
          readTime: '12 min',
          href: '/docs/deployment/scaling'
        },
        {
          id: 'monitoring',
          title: 'Monitoring & Analytics',
          description: 'Track performance and optimize ROI',
          readTime: '9 min',
          href: '/docs/deployment/monitoring'
        }
      ]
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield className="w-5 h-5" />,
      articles: [
        {
          id: 'best-practices',
          title: 'Security Best Practices',
          description: 'Keep your empire fortress secure',
          readTime: '8 min',
          href: '/docs/security/best-practices'
        },
        {
          id: 'credentials',
          title: 'Managing Credentials',
          description: 'Safely handle API keys and secrets',
          readTime: '5 min',
          href: '/docs/security/credentials'
        },
        {
          id: 'compliance',
          title: 'Compliance Automation',
          description: 'Stay compliant without the headache',
          readTime: '11 min',
          href: '/docs/security/compliance'
        }
      ]
    },
    {
      id: 'community',
      title: 'Community',
      icon: <Users className="w-5 h-5" />,
      articles: [
        {
          id: 'contributing',
          title: 'Contributing Guide',
          description: 'Join the empire builders community',
          readTime: '4 min',
          href: '/docs/community/contributing'
        },
        {
          id: 'showcase',
          title: 'Success Stories',
          description: 'Learn from other empire builders',
          readTime: '15 min',
          href: '/docs/community/showcase'
        },
        {
          id: 'support',
          title: 'Getting Support',
          description: 'Where to get help when you need it',
          readTime: '3 min',
          href: '/docs/community/support'
        }
      ]
    }
  ]

  const popularArticles = [
    {
      title: '5-Minute Quick Start',
      description: 'The fastest way to get your first automation running',
      href: '/docs/getting-started/quickstart',
      category: 'Getting Started'
    },
    {
      title: 'Money Printer Workflow',
      description: 'Build a lead qualification system that prints money',
      href: '/docs/workflows/money-printer',
      category: 'Templates'
    },
    {
      title: 'Scaling to 1M Events',
      description: 'Architecture patterns for massive scale',
      href: '/docs/deployment/scaling',
      category: 'Advanced'
    }
  ]

  const currentSection = docSections.find(s => s.id === selectedSection) || docSections[0]

  const filteredArticles = currentSection.articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
              Documentation
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to build, deploy, and scale your automation empire.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documentation..."
            className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-empire-500 transition-colors shadow-xl"
          />
        </div>
      </section>

      {/* Popular Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {popularArticles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={article.href}
                className="block p-6 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-gray-700 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-empire-400 font-medium">{article.category}</span>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-empire-400 transition-colors" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-empire-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-400">{article.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Documentation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="sticky top-24">
              {docSections.map((section) => (
                <div key={section.id} className="mb-6">
                  <button
                    onClick={() => setSelectedSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      selectedSection === section.id
                        ? 'bg-empire-900/30 text-empire-400 border border-empire-800'
                        : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
                    }`}
                  >
                    {section.icon}
                    {section.title}
                  </button>
                </div>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">{currentSection.title}</h2>
              <p className="text-gray-400">
                {filteredArticles.length} articles in this section
              </p>
            </div>

            <div className="space-y-4">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={article.href}
                    className="block p-6 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-gray-700 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-empire-400 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-400 mb-3">{article.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{article.readTime} read</span>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-empire-400 transition-colors" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </main>
        </div>
      </section>
    </div>
  )
}