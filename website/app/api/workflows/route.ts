import { NextResponse } from 'next/server'

// Mock workflow data - in production, this would connect to your database
const workflows = [
  {
    id: 'money-printer-001',
    name: 'Lead Qualification Money Printer',
    category: 'Revenue Generator',
    description: 'Automatically qualify and route leads to maximize conversion rates',
    roi: '300%',
    timeSaved: '40 hours/month',
    price: 99,
  },
  {
    id: 'time-liberator-001',
    name: 'Meeting Prep Automation',
    category: 'Time Liberator',
    description: 'Research attendees and prepare briefings for every meeting',
    roi: '200%',
    timeSaved: '20 hours/month',
    price: 79,
  },
  {
    id: 'scale-accelerator-001',
    name: 'Content Distribution Engine',
    category: 'Scale Accelerator',
    description: 'Transform one piece of content into 10+ formats automatically',
    roi: '500%',
    timeSaved: '60 hours/month',
    price: 149,
  },
  {
    id: 'risk-eliminator-001',
    name: 'Compliance Monitor',
    category: 'Risk Eliminator',
    description: 'Real-time monitoring and alerts for compliance violations',
    roi: 'Priceless',
    timeSaved: '30 hours/month',
    price: 199,
  },
]

export async function GET() {
  return NextResponse.json({
    workflows,
    total: workflows.length,
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  
  // In production, this would create a new workflow
  return NextResponse.json({
    success: true,
    message: 'Workflow created successfully',
    workflow: {
      id: `custom-${Date.now()}`,
      ...body,
    },
  })
}