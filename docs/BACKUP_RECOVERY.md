# Backup & Recovery

<!-- Last reviewed: 2026-02-15 -->

## Git Backups

```bash
# Create backup branch
git branch backup/$(date +%Y%m%d)

# Push all branches
git push origin --all

# Create tags
git tag -a v1.0.0 -m "Version 1.0.0"
git push --tags
```

## Database Backups

- Schedule regular backups
- Store in secure location
- Test recovery process
- Document backup locations

## Configuration Backups

- .env files (secured)
- Build configurations
- Deployment settings

## Recovery Steps

1. Identify issue
2. Restore from backup
3. Verify functionality
4. Document incident
<!-- Reviewed 2026-02-21 -->

<!-- reviewed 2026-03-01 -->
