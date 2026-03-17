# Contributing to Optimistic Orator

Thank you for your interest in contributing to Optimistic Orator! We welcome contributions from the GenLayer community, whether you're fixing bugs, adding features, or improving documentation.

## Getting Started

### Prerequisites

- Node.js 22.13.0 or higher
- pnpm 10.4.1 or higher
- Git
- GenLayer CLI (for contract development)

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/genlayer-minigame.git
   cd genlayer-minigame
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/garap756/genlayer-minigame.git
   ```
4. **Install dependencies**:
   ```bash
   pnpm install
   ```
5. **Start the development server**:
   ```bash
   pnpm dev
   ```

## Development Workflow

### Creating a Feature Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

### Code Style

We follow these conventions:

- **React Components**: Use functional components with hooks
- **TypeScript**: All code must be typed (no `any` types)
- **Styling**: Use Tailwind CSS utilities and design tokens from `index.css`
- **Naming**: Use camelCase for variables/functions, PascalCase for components
- **Comments**: Add JSDoc comments for complex logic

### Component Structure

```tsx
/**
 * Design Philosophy: [Reference the design system]
 * Purpose: [What does this component do?]
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ComponentProps {
  // Define props with types
}

export default function Component({ prop1, prop2 }: ComponentProps) {
  // Implementation
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Commit Messages

Follow conventional commit format:

```
type(scope): subject

body

footer
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples**:
- `feat(game): add appeal mechanism for disputed outcomes`
- `fix(validation): correct XP calculation for consensus bonus`
- `docs(readme): update GenLayer integration instructions`

### Testing

Before submitting a PR, ensure:

```bash
# Check TypeScript types
pnpm check

# Run tests
pnpm test

# Build the project
pnpm build

# Format code
pnpm format
```

## Submitting a Pull Request

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub with:
   - Clear title describing the change
   - Description of what changed and why
   - Reference to any related issues (`Fixes #123`)
   - Screenshots for UI changes

3. **PR Template**:
   ```markdown
   ## Description
   Brief description of the changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Changes Made
   - Change 1
   - Change 2

   ## Testing
   How to test these changes

   ## Screenshots (if applicable)
   [Add screenshots]

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] TypeScript types are correct
   - [ ] Tests pass
   - [ ] Documentation updated
   ```

## Areas for Contribution

### Frontend Features

- **Game UI Improvements**: Better argument visualization, smoother animations
- **Mobile Responsiveness**: Optimize for mobile devices
- **Accessibility**: Improve keyboard navigation, screen reader support
- **Performance**: Optimize rendering, reduce bundle size

### Backend Features

- **Room Management**: Enhanced room creation, player management
- **Leaderboard**: Seasonal rankings, achievements system
- **Analytics**: Track game metrics, player engagement
- **API Optimization**: Reduce latency, improve error handling

### GenLayer Integration

- **Intelligent Contract**: Enhance argument evaluation logic
- **Validator Ensemble**: Add specialized validators for different domains
- **Appeal Mechanism**: Implement dispute resolution
- **On-Chain Storage**: Optimize contract state management

### Documentation

- **Game Guide**: How to play, strategy tips
- **Developer Guide**: Architecture deep-dive, API documentation
- **Deployment Guide**: Production deployment instructions
- **Examples**: Sample contracts, game scenarios

### Testing

- **Unit Tests**: Component and utility tests
- **Integration Tests**: API and contract tests
- **E2E Tests**: Full game flow testing

## Reporting Issues

Found a bug? Please create an issue with:

1. **Title**: Clear, descriptive title
2. **Description**: What happened and what should happen
3. **Steps to Reproduce**: How to reproduce the bug
4. **Expected Behavior**: What should happen
5. **Actual Behavior**: What actually happened
6. **Screenshots**: If applicable
7. **Environment**: OS, browser, Node version

## Design Philosophy

When contributing UI changes, remember our design philosophy:

**Classical Modernism - Debate Amphitheater**
- Deep slate blue (#2C3E50) for trust and intellect
- Warm gold (#D4AF37) for debate victory and consensus
- Soft cream (#F5F1E8) for readability and contrast
- Georgia serif for proposition titles
- Montserrat bold for headings
- Lato for body text

See `ideas.md` for full design guidelines.

## Community Guidelines

- **Be Respectful**: Treat all community members with respect
- **Be Constructive**: Provide helpful feedback and suggestions
- **Be Collaborative**: Work together to solve problems
- **Be Patient**: Review and feedback takes time

## Getting Help

- **Questions?** Ask in [GenLayer Discord](https://discord.gg/genlayer) #dev-chat
- **Issues?** Create a GitHub issue
- **Ideas?** Start a discussion on GitHub

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GenLayer community announcements

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make Optimistic Orator better! 🎉
