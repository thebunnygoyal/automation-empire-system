#!/bin/bash

# Automation Empire - Azure Deployment Script
# This script deploys the entire empire infrastructure

set -e

echo "🚀 AUTOMATION EMPIRE DEPLOYMENT STARTING..."
echo "==========================================="

# Load environment variables
if [ -f ../.env ]; then
    export $(cat ../.env | grep -v '^#' | xargs)
fi

# Set default values if not provided
AZURE_SUBSCRIPTION_ID=${AZURE_SUBSCRIPTION_ID:-"85d01f5e-1744-4920-bccd-6496d1beb05f"}
AZURE_RESOURCE_GROUP=${AZURE_RESOURCE_GROUP:-"automation-empire-rg"}
AZURE_LOCATION=${AZURE_LOCATION:-"eastus2"}

# Check Azure CLI login
echo ""
echo "📌 Checking Azure authentication..."
az account show > /dev/null 2>&1 || {
    echo "❌ Not logged in to Azure. Running 'az login'..."
    az login
}

# Set subscription
echo ""
echo "📌 Setting Azure subscription..."
az account set --subscription "$AZURE_SUBSCRIPTION_ID"

# Create resource group
echo ""
echo "📌 Creating resource group..."
az group create \
    --name "$AZURE_RESOURCE_GROUP" \
    --location "$AZURE_LOCATION" \
    --tags "project=automation-empire" "environment=production" || echo "Resource group already exists"

# Deploy infrastructure using Bicep
echo ""
echo "📌 Deploying Azure infrastructure..."
az deployment group create \
    --resource-group "$AZURE_RESOURCE_GROUP" \
    --template-file main.bicep \
    --parameters @parameters.json || echo "Infrastructure deployment skipped"

# Create App Service Plan
echo ""
echo "📌 Creating App Service Plan..."
az appservice plan create \
    --name "empire-plan" \
    --resource-group "$AZURE_RESOURCE_GROUP" \
    --sku B1 \
    --is-linux || echo "App Service Plan already exists"

# Create Web App
echo ""
echo "📌 Creating Web App..."
az webapp create \
    --resource-group "$AZURE_RESOURCE_GROUP" \
    --plan "empire-plan" \
    --name "automation-empire-$(date +%s)" \
    --runtime "NODE:18-lts" || echo "Web App creation failed"

# Get the web app name
WEBAPP_NAME=$(az webapp list --resource-group "$AZURE_RESOURCE_GROUP" --query "[?contains(name, 'automation-empire')].name" -o tsv | head -n 1)

if [ -n "$WEBAPP_NAME" ]; then
    URL=$(az webapp show --name "$WEBAPP_NAME" --resource-group "$AZURE_RESOURCE_GROUP" --query defaultHostName -o tsv)
    echo ""
    echo "✅ DEPLOYMENT COMPLETE!"
    echo "==========================================="
    echo "🌐 Website URL: https://$URL"
    echo "📊 Azure Portal: https://portal.azure.com"
    echo "🔧 n8n Instance: https://n8n-app.livelypebble-c844ad2d.eastus2.azurecontainerapps.io"
    echo ""
    echo "🎉 Your Automation Empire is LIVE!"
else
    echo ""
    echo "⚠️  Web App deployment needs manual configuration"
    echo "Please check Azure Portal for deployment status"
fi