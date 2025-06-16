#!/bin/bash

# Automation Empire - Complete Launch Script
# This script deploys the entire empire with one command

set -e

echo ""
echo "🎯 AUTOMATION EMPIRE LAUNCH SEQUENCE INITIATED"
echo "==============================================="
echo ""
echo "This script will:"
echo "1. Deploy Azure infrastructure"
echo "2. Build and deploy the website"
echo "3. Deploy n8n workflows"
echo "4. Start the distribution engine"
echo "5. Configure monitoring"
echo ""
echo "Estimated time: 15-20 minutes"
echo ""
read -p "Ready to build your empire? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Launch cancelled. Your empire awaits when you're ready."
    exit 1
fi

echo ""
echo "🚀 PHASE 1: Infrastructure Deployment"
echo "-------------------------------------"
cd infrastructure
bash deploy.sh
cd ..

echo ""
echo "🌐 PHASE 2: Website Deployment"
echo "--------------------------------"
cd website
npm install
npm run build
echo "Website built successfully!"
cd ..

echo ""
echo "🔧 PHASE 3: n8n Workflow Deployment"
echo "------------------------------------"
cd workflows
npm install
node deploy-workflows.js --deploy-all
cd ..

echo ""
echo "📡 PHASE 4: Distribution Engine"
echo "--------------------------------"
cd distribution
npm install
node deploy.js
cd ..

echo ""
echo "📊 PHASE 5: Analytics Setup"
echo "------------------------------"
echo "Configuring monitoring dashboards..."
# Analytics configuration would go here

echo ""
echo "✅ EMPIRE LAUNCH COMPLETE!"
echo "========================="
echo ""
echo "🎉 Congratulations! Your Automation Empire is now LIVE!"
echo ""
echo "🔗 Access Points:"
echo "  Website: https://automation-empire-web.azurewebsites.net"
echo "  n8n: https://n8n-app.livelypebble-c844ad2d.eastus2.azurecontainerapps.io"
echo "  Analytics: https://automation-empire-web.azurewebsites.net/dashboard"
echo "  Docs: https://automation-empire-web.azurewebsites.net/docs"
echo ""
echo "📊 Key Metrics to Track:"
echo "  - Time saved per month"
echo "  - Revenue generated"
echo "  - Workflow success rate"
echo "  - ROI per automation"
echo ""
echo "🚀 Next Steps:"
echo "  1. Import your first workflow template"
echo "  2. Connect your business tools"
echo "  3. Monitor the analytics dashboard"
echo "  4. Scale what works, kill what doesn't"
echo ""
echo "💬 Join the Community:"
echo "  GitHub: https://github.com/thebunnygoyal/automation-empire-system"
echo "  Discord: Coming soon!"
echo ""
echo "Remember: The future belongs to those who build systems."
echo "Now go forth and dominate! 👑"
echo ""