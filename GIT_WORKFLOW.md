# Git Workflow

<!-- Git branching and commit guidelines -->
<!-- Version: 1.2.9 -->
<!-- Last reviewed: 2026-01-29 -->

> 🔄 This project uses [Conventional Commits](https://www.conventionalcommits.org/) and [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow).

## Branch Strategy

### Main Branches

- **main**: Production-ready code
- **develop**: Integration branch for features (optional)

### Feature Branches

```bash
# Create feature branch
git checkout -b feature/add-blog-section

# Create fix branch
git checkout -b fix/navigation-bug

# Create docs branch
git checkout -b docs/update-readme
```

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Test additions
- `chore/` - Maintenance

## Commit Guidelines

### Commit Message Format

```
type(scope): subject

[optional body]

[optional footer]
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation only
- **style**: Code style (formatting, missing semi-colons)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding tests
- **chore**: Maintenance (dependencies, config)

### Examples

```bash
# Simple commit
git commit -m "feat: add dark mode toggle"

# With scope
git commit -m "fix(auth): resolve login redirect issue"

# With body
git commit -m "feat: add blog section

- Create blog post component
- Add blog listing page
- Implement markdown parsing
- Add syntax highlighting"

# Breaking change
git commit -m "feat!: redesign navigation

BREAKING CHANGE: Navigation API has changed.
Use <Nav> instead of <Navigation>."
```

### Commit Message Rules

1. **Use imperative mood**: "add feature" not "added feature"
2. **Don't capitalize first letter**
3. **No period at the end**
4. **Limit subject to 50 characters**
5. **Separate subject from body with blank line**
6. **Wrap body at 72 characters**
7. **Use body to explain what and why, not how**

## Daily Workflow

### Starting Work

```bash
# Update main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/my-feature

# Make changes
# ... edit files ...

# Stage changes
git add .

# Commit with message
git commit -m "feat: implement my feature"
```

### During Development

```bash
# Check status
git status

# See changes
git diff

# Stage specific files
git add src/components/NewComponent.tsx

# Commit staged changes
git commit -m "feat: add NewComponent"

# Push to remote
git push origin feature/my-feature
```

### Finishing Feature

```bash
# Push final changes
git push origin feature/my-feature

# Create pull request on GitHub
# ... wait for review ...

# After merge, delete branch
git checkout main
git pull origin main
git branch -d feature/my-feature
```

## Advanced Commands

### Amend Last Commit

```bash
# Fix last commit message
git commit --amend -m "Better commit message"

# Add forgotten files to last commit
git add forgotten-file.tsx
git commit --amend --no-edit
```

### Interactive Rebase

```bash
# Rebase last 3 commits
git rebase -i HEAD~3

# Options:
# pick - keep commit
# reword - edit message
# squash - combine with previous
# drop - remove commit
```

### Stash Changes

```bash
# Save work in progress
git stash

# List stashes
git stash list

# Apply most recent stash
git stash apply

# Apply and remove stash
git stash pop

# Apply specific stash
git stash apply stash@{2}
```

### Cherry Pick

```bash
# Apply specific commit from another branch
git cherry-pick abc1234
```

### Reset

```bash
# Undo last commit, keep changes
git reset --soft HEAD~1

# Undo last commit, discard changes
git reset --hard HEAD~1

# Undo specific file
git checkout HEAD -- file.tsx
```

## Pull Request Process

### Before Creating PR

```bash
# Update with main
git checkout main
git pull origin main
git checkout feature/my-feature
git rebase main

# Fix conflicts if any
# ... resolve conflicts ...
git add .
git rebase --continue

# Force push (after rebase)
git push origin feature/my-feature --force-with-lease
```

### PR Checklist

- [ ] Branch is up to date with main
- [ ] All tests pass
- [ ] Code is linted and formatted
- [ ] Documentation updated
- [ ] Commit messages follow convention
- [ ] No merge conflicts
- [ ] Self-reviewed changes

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manually tested

## Screenshots (if applicable)

Before / After

## Checklist

- [ ] Code follows style guide
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console warnings
```

## Collaboration

### Working with Team

```bash
# See all branches
git branch -a

# Switch to teammate's branch
git checkout teammate-branch
git pull origin teammate-branch

# Create branch from teammate's work
git checkout -b my-addition teammate-branch
```

### Resolving Conflicts

```bash
# When merge conflict occurs
git status  # See conflicted files

# Edit files to resolve conflicts
# ... fix conflicts in editor ...

# Mark as resolved
git add conflicted-file.tsx

# Continue merge/rebase
git merge --continue
# or
git rebase --continue
```

## Best Practices

### DO

✅ Commit often with small, logical changes
✅ Write clear, descriptive commit messages
✅ Keep commits focused on one thing
✅ Test before committing
✅ Pull before pushing
✅ Review your own changes before pushing

### DON'T

❌ Commit half-finished work
❌ Commit untested code
❌ Use vague messages like "fix bug" or "update"
❌ Commit commented-out code
❌ Commit sensitive data (keys, passwords)
❌ Force push to shared branches

## Git Hooks

### Pre-commit (Husky)

Automatically runs before each commit:

- Lints staged files
- Formats code
- Runs type checking
- Prevents bad commits

### Pre-push

Runs before pushing:

- Run all tests
- Check for TODO comments
- Verify build passes

## Git Configuration

### User Setup

```bash
# Set name
git config --global user.name "Your Name"

# Set email
git config --global user.email "your.email@example.com"

# Set default editor
git config --global core.editor "code --wait"
```

### Useful Aliases

```bash
# Add to ~/.gitconfig
[alias]
  st = status
  co = checkout
  br = branch
  ci = commit
  unstage = reset HEAD --
  last = log -1 HEAD
  visual = log --graph --oneline --all
```

## Troubleshooting

### Undo Push

```bash
# If just pushed wrong commit
git revert HEAD
git push origin main
```

### Recover Deleted Branch

```bash
# Find commit hash
git reflog

# Recreate branch
git checkout -b recovered-branch abc1234
```

### Clean Working Directory

```bash
# Remove untracked files
git clean -fd

# Remove all changes
git reset --hard HEAD
```

## Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
<!-- Reviewed 2026-01-26 -->
