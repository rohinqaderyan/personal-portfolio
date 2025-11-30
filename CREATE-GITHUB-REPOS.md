# Create GitHub Repositories

Your portfolio links to 9 GitHub repos. Here's how to create them:

## Quick Create (Recommended)

Go to: https://github.com/new

Create these repos (can be empty):

1. **pharma-analytics-platform** (Private - if work-related)
2. **fintech-loan-platform** (Private - if work-related)
3. **cloud-migration-framework**
4. **realtime-collab**
5. **k8s-orchestrator**
6. **iot-mesh-network**
7. **ai-health-tracker**
8. **microservices-ecommerce**
9. **security-dashboard**

### For Each Repo:

**Settings:**

- Name: (use names above)
- Description: (copy from your projects.json)
- Public or Private: Your choice
- ✅ Add README
- License: MIT (recommended)

**README Template:**

```markdown
# [Project Name]

[Project description from your portfolio]

## Technologies

- Technology 1
- Technology 2
- Technology 3

## Highlights

- Highlight 1
- Highlight 2
- Highlight 3

## Status

🚧 This is a portfolio project. Code available upon request.

---

View this project in my portfolio: [rohinqaderyan.vercel.app](https://rohinqaderyan.vercel.app)
```

## Automation Script (PowerShell)

Save this as `create-repos.ps1` and run from command line (requires GitHub CLI):

```powershell
# Install GitHub CLI first: winget install GitHub.cli

$repos = @(
    @{name="pharma-analytics-platform"; desc="Enterprise AI analytics platform for pharmaceutical data"; private=$true},
    @{name="fintech-loan-platform"; desc="B2B SaaS for small business lending"; private=$true},
    @{name="cloud-migration-framework"; desc="VMware to AWS migration automation"; private=$false},
    @{name="realtime-collab"; desc="Real-time collaboration with WebRTC"; private=$false},
    @{name="k8s-orchestrator"; desc="Kubernetes deployment orchestration"; private=$false},
    @{name="iot-mesh-network"; desc="Disaster response mesh network"; private=$false},
    @{name="ai-health-tracker"; desc="AI-powered health & fitness tracker"; private=$false},
    @{name="microservices-ecommerce"; desc="Microservices e-commerce platform"; private=$false},
    @{name="security-dashboard"; desc="Cybersecurity operations dashboard"; private=$false}
)

foreach ($repo in $repos) {
    $visibility = if ($repo.private) { "--private" } else { "--public" }
    gh repo create "rohinqaderyan/$($repo.name)" $visibility --description "$($repo.desc)" --add-readme
    Write-Host "✅ Created: $($repo.name)"
}
```

## Manual Alternative

Don't want to create all repos? You can:

1. **Remove GitHub links** from portfolio:
   - Edit `content/projects.json`
   - Set `"repo": ""` for projects without repos

2. **Use placeholders**:
   - Create 1-2 impressive repos (k8s-orchestrator, realtime-collab)
   - Leave others as links (they'll still show but won't be clickable)

3. **Add gradually**:
   - Create repos as you build actual projects
   - Update portfolio accordingly

## Which Repos to Prioritize?

Create these first (most impressive):

1. ✅ **k8s-orchestrator** - Shows DevOps expertise
2. ✅ **realtime-collab** - Shows real-time/WebSocket skills
3. ✅ **ai-health-tracker** - Shows mobile + ML skills

These can wait:

- pharma-analytics-platform (work-related, keep private or skip)
- fintech-loan-platform (work-related, keep private or skip)

## Private vs Public?

**Make Public:**

- Personal/side projects
- Open-source contributions
- Learning projects
- Portfolio showcases

**Keep Private:**

- Work-related projects
- Proprietary code
- Client work
- Sensitive implementations

**Note:** You can still link to private repos, they'll just show "Private repository" on GitHub.

## Pro Tip

For work projects (Pfizer, Parlay):

- Either keep private
- Or create "sanitized" versions with:
  - Fake data
  - Generic implementations
  - Architectural diagrams only
  - Public-facing components only

## Current Setup

Your portfolio currently has:

- ✅ All repo links pointing to: `github.com/rohinqaderyan/[project-name]`
- ⏳ Repos don't exist yet (optional to create)

Repos are **optional** but add credibility. Even empty repos with good READMEs help!
