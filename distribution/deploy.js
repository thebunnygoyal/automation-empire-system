#!/usr/bin/env node

/**
 * Distribution Engine Deployment Script
 * Deploys the distribution system to Azure
 */

const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

async function deploy() {
  console.log('🚀 Deploying Distribution Engine to Azure...');
  
  try {
    // Build Docker image
    console.log('🟛️  Building Docker image...');
    await execAsync('docker build -t distribution-engine .');
    
    // Tag for Azure Container Registry
    console.log('🏷️  Tagging image...');
    await execAsync('docker tag distribution-engine automationempire.azurecr.io/distribution-engine:latest');
    
    // Push to registry
    console.log('📤 Pushing to registry...');
    await execAsync('docker push automationempire.azurecr.io/distribution-engine:latest');
    
    // Deploy to Container Apps
    console.log('🌐 Deploying to Container Apps...');
    await execAsync(`
      az containerapp create \
        --name distribution-engine \
        --resource-group automation-empire-rg \
        --image automationempire.azurecr.io/distribution-engine:latest \
        --cpu 0.5 \
        --memory 1Gi \
        --min-replicas 1 \
        --max-replicas 5 \
        --env-vars \
          NODE_ENV=production \
          REDIS_URL=$REDIS_URL \
          SENDGRID_API_KEY=$SENDGRID_API_KEY
    `);
    
    console.log('✅ Distribution Engine deployed successfully!');
    
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
}

// Run deployment
deploy();