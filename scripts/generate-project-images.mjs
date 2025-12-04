#!/usr/bin/env node

/**
 * Project Image Generator
 * Generates modern, gradient-based project images
 *
 * Usage: node generate-project-images.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Project configurations with beautiful gradients
const projects = [
  {
    filename: 'pharma-analytics.jpg',
    title: 'AI-Driven Pharma\nAnalytics Platform',
    colors: ['#667eea', '#764ba2'],
    icon: '🧬',
    description: 'Enterprise AI Platform',
  },
  {
    filename: 'fintech-platform.jpg',
    title: 'FinTech Loan\nProcessing Platform',
    colors: ['#f093fb', '#f5576c'],
    icon: '💰',
    description: 'B2B SaaS Solution',
  },
  {
    filename: 'cloud-migration.jpg',
    title: 'VMware to AWS\nMigration Framework',
    colors: ['#4facfe', '#00f2fe'],
    icon: '☁️',
    description: 'Cloud Infrastructure',
  },
  {
    filename: 'realtime-collab.jpg',
    title: 'Real-Time\nCollaboration Platform',
    colors: ['#43e97b', '#38f9d7'],
    icon: '👥',
    description: 'WebSocket Platform',
  },
  {
    filename: 'k8s-orchestrator.jpg',
    title: 'Kubernetes\nDeployment Orchestrator',
    colors: ['#fa709a', '#fee140'],
    icon: '⚙️',
    description: 'CI/CD Platform',
  },
  {
    filename: 'iot-mesh.jpg',
    title: 'IoT Disaster Response\nMesh Network',
    colors: ['#30cfd0', '#330867'],
    icon: '📡',
    description: 'IoT System',
  },
  {
    filename: 'health-tracker.jpg',
    title: 'AI Health &\nFitness Tracker',
    colors: ['#a8edea', '#fed6e3'],
    icon: '💪',
    description: 'iOS App',
  },
  {
    filename: 'ecommerce.jpg',
    title: 'Microservices\nE-Commerce Platform',
    colors: ['#ff9a9e', '#fecfef'],
    icon: '🛒',
    description: 'Enterprise Platform',
  },
  {
    filename: 'security-dashboard.jpg',
    title: 'Cybersecurity Operations\nDashboard',
    colors: ['#ffecd2', '#fcb69f'],
    icon: '🔒',
    description: 'Security Platform',
  },
]

// SVG template for project images
function generateSVG(project) {
  const width = 1200
  const height = 630

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${project.colors[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${project.colors[1]};stop-opacity:1" />
    </linearGradient>
    
    <!-- Subtle pattern overlay -->
    <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.03)"/>
    </pattern>
  </defs>
  
  <!-- Gradient background -->
  <rect width="${width}" height="${height}" fill="url(#grad)"/>
  <rect width="${width}" height="${height}" fill="url(#pattern)"/>
  
  <!-- Icon (large, subtle) -->
  <text x="${width / 2}" y="${height / 2 - 50}" 
        font-size="200" 
        text-anchor="middle" 
        fill="rgba(255,255,255,0.15)" 
        font-family="Arial, sans-serif">${project.icon}</text>
  
  <!-- Title -->
  <text x="60" y="${height - 150}" 
        font-size="54" 
        font-weight="bold" 
        fill="white" 
        font-family="Arial, sans-serif"
        style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3)">
    <tspan x="60" dy="0">${project.title.split('\n')[0]}</tspan>
    <tspan x="60" dy="65">${project.title.split('\n')[1] || ''}</tspan>
  </text>
  
  <!-- Description badge -->
  <rect x="60" y="${height - 60}" width="${project.description.length * 11 + 40}" height="36" 
        rx="18" fill="rgba(255,255,255,0.2)"/>
  <text x="80" y="${height - 37}" 
        font-size="18" 
        fill="white" 
        font-family="Arial, sans-serif"
        font-weight="600">${project.description}</text>
</svg>`
}

// Generate all images
console.log('🎨 Generating modern project images...\n')

const outputDir = path.join(__dirname, '../public/projects')

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

projects.forEach((project) => {
  const svg = generateSVG(project)
  const outputPath = path.join(outputDir, project.filename.replace('.jpg', '.svg'))

  fs.writeFileSync(outputPath, svg)
  console.log(`✅ Generated: ${project.filename.replace('.jpg', '.svg')}`)
  console.log(`   Title: ${project.title.replace('\n', ' ')}`)
  console.log(`   Colors: ${project.colors.join(' → ')}\n`)
})

console.log('\n✨ All images generated successfully!')
console.log('\n📋 Next Steps:')
console.log('1. Open the SVG files to preview them')
console.log('2. Convert SVG to JPG using an online tool:')
console.log('   - https://cloudconvert.com/svg-to-jpg')
console.log('   - https://svgtojpg.com')
console.log('3. Or use ImageMagick: convert image.svg -quality 95 image.jpg')
console.log('4. Place JPG files in: public/projects/')
console.log('5. Commit and push to deploy!\n')
