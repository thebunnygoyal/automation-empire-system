#!/usr/bin/env node

/**
 * Automation Empire - n8n Workflow Deployment Script
 * Deploys workflows to your n8n instance programmatically
 */

const https = require('https');
const fs = require('fs').promises;
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const N8N_API_URL = process.env.N8N_API_URL || 'https://n8n-app.livelypebble-c844ad2d.eastus2.azurecontainerapps.io';
const N8N_API_KEY = process.env.N8N_API_KEY;

class WorkflowDeployer {
  constructor() {
    this.apiUrl = N8N_API_URL;
    this.apiKey = N8N_API_KEY;
  }

  async deployWorkflow(workflowPath) {
    try {
      console.log(`🚀 Deploying workflow: ${workflowPath}`);
      
      // Read workflow file
      const workflowData = await fs.readFile(workflowPath, 'utf8');
      const workflow = JSON.parse(workflowData);
      
      // Deploy to n8n
      const response = await this.makeRequest('/api/v1/workflows', 'POST', workflow);
      
      console.log(`✅ Workflow deployed successfully!`);
      console.log(`   ID: ${response.id}`);
      console.log(`   Name: ${response.name}`);
      console.log(`   Active: ${response.active}`);
      
      return response;
    } catch (error) {
      console.error(`❌ Error deploying workflow: ${error.message}`);
      throw error;
    }
  }

  async listWorkflows() {
    try {
      console.log(`📋 Fetching existing workflows...`);
      
      const response = await this.makeRequest('/api/v1/workflows', 'GET');
      
      console.log(`\n📦 Existing Workflows (${response.data.length}):`);
      response.data.forEach(workflow => {
        console.log(`   - ${workflow.name} (ID: ${workflow.id}) [${workflow.active ? 'Active' : 'Inactive'}]`);
      });
      
      return response.data;
    } catch (error) {
      console.error(`❌ Error listing workflows: ${error.message}`);
      throw error;
    }
  }

  async activateWorkflow(workflowId) {
    try {
      console.log(`⚡ Activating workflow: ${workflowId}`);
      
      const response = await this.makeRequest(`/api/v1/workflows/${workflowId}/activate`, 'POST');
      
      console.log(`✅ Workflow activated successfully!`);
      return response;
    } catch (error) {
      console.error(`❌ Error activating workflow: ${error.message}`);
      throw error;
    }
  }

  makeRequest(endpoint, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
      const url = new URL(this.apiUrl + endpoint);
      
      const options = {
        hostname: url.hostname,
        port: url.port || 443,
        path: url.pathname + url.search,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      };

      if (this.apiKey) {
        options.headers['X-N8N-API-KEY'] = this.apiKey;
      }

      const req = https.request(options, (res) => {
        let body = '';
        
        res.on('data', (chunk) => {
          body += chunk;
        });
        
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(body));
            } catch (e) {
              resolve(body);
            }
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${body}`));
          }
        });
      });

      req.on('error', reject);

      if (data) {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  }
}

// CLI Handler
async function main() {
  const deployer = new WorkflowDeployer();
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help') {
    console.log(`
🚀 Automation Empire - Workflow Deployer

Usage:
  node deploy-workflows.js --list                    List all workflows
  node deploy-workflows.js --import <file>           Import a workflow
  node deploy-workflows.js --activate <id>           Activate a workflow
  node deploy-workflows.js --deploy-all              Deploy all workflows

Examples:
  node deploy-workflows.js --list
  node deploy-workflows.js --import templates/money-printer.json
  node deploy-workflows.js --activate 123
    `);
    return;
  }

  try {
    switch (args[0]) {
      case '--list':
        await deployer.listWorkflows();
        break;
        
      case '--import':
        if (!args[1]) {
          console.error('❌ Please specify a workflow file to import');
          process.exit(1);
        }
        await deployer.deployWorkflow(args[1]);
        break;
        
      case '--activate':
        if (!args[1]) {
          console.error('❌ Please specify a workflow ID to activate');
          process.exit(1);
        }
        await deployer.activateWorkflow(args[1]);
        break;
        
      case '--deploy-all':
        console.log('🚀 Deploying all template workflows...');
        const templateDir = path.join(__dirname, 'templates');
        const files = await fs.readdir(templateDir);
        
        for (const file of files) {
          if (file.endsWith('.json')) {
            await deployer.deployWorkflow(path.join(templateDir, file));
            console.log('---');
          }
        }
        break;
        
      default:
        console.error(`❌ Unknown command: ${args[0]}`);
        process.exit(1);
    }
  } catch (error) {
    console.error(`\n💥 Fatal error: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = WorkflowDeployer;