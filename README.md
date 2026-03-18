# Optimistic Orator - GenLayer Mini-Game🍗

A multiplayer debate mini-game for GenLayer's community that showcases **Intelligent Contracts** and **Optimistic Democracy** through natural language debate and AI consensus.

## 🎮 Game Overview

**Optimistic Orator** is a 5-15 minute multiplayer game where players debate propositions and earn XP based on AI validator consensus. The game directly demonstrates GenLayer's core technologies:

- **Intelligent Contracts**: LLM-powered evaluation of natural language arguments
- **Optimistic Democracy**: AI validator consensus mechanism for determining winning arguments
- **Subjectivity Handling**: Blockchain-based decision-making on subjective content

### Key Features

- **Multiplayer Debates**: 4-8 players per room with weekly rotating topics
- **AI Validation**: 7 AI validators evaluate arguments on clarity, coherence, persuasiveness, and evidence
- **XP Rewards**: Earn XP based on validator consensus and argument quality
- **Weekly Leaderboard**: Compete for top positions with seasonal rewards
- **Replayable Content**: New propositions generated weekly with varying difficulty levels
- **Appeal Mechanism**: Challenge disputed outcomes with optional bond posting

## 🏗️ Architecture

### Frontend (React + Tailwind CSS)

```
client/
├── src/
│   ├── pages/
│   │   ├── Home.tsx           # Lobby and room browser
│   │   └── DebateRoom.tsx     # Active game interface
│   ├── components/
│   │   └── ui/                # shadcn/ui components
│   ├── App.tsx                # Router and layout
│   └── index.css              # Design tokens (Classical Modernism theme)
└── index.html
```

**Design Philosophy**: Classical Modernism with amphitheater inspiration
- **Color Palette**: Deep slate blue (#2C3E50) + Warm gold (#D4AF37) + Soft cream (#F5F1E8)
- **Typography**: Georgia (serif) for titles, Montserrat (bold) for headings, Lato for body
- **Layout**: Asymmetric with emphasis on debate flow and validator consensus visualization

### Backend (Node.js + Express)

```
server/
├── index.ts                   # Express server
├── routes/
│   ├── rooms.ts              # Room management
│   ├── arguments.ts          # Argument submission
│   └── leaderboard.ts        # XP tracking
├── services/
│   ├── genLayerService.ts    # GenLayer integration
│   └── validationService.ts  # AI validator calls
└── models/
    ├── Room.ts
    ├── Argument.ts
    └── Player.ts
```

### GenLayer Integration

- **Intelligent Contract**: Deployed on GenLayer to evaluate arguments using LLMs
- **Validator Ensemble**: 7 AI validators reach consensus on argument quality
- **On-Chain Results**: Game results and XP distribution stored on GenLayer

## 🎯 Game Flow

### Phase 1: Lobby & Room Creation (1-2 min)
- Players join a game room (4-8 players per room)
- Room host selects a debate topic
- Players choose their stance (For/Against)

### Phase 2: Debate Round (10 min)
- **Preparation Phase** (2 min): Players read the proposition
- **Argument Submission** (5 min): Players write and submit arguments
- **Reflection Phase** (3 min): Players review other arguments (anonymized)

### Phase 3: AI Validation & Voting (3-5 min)
- 7 AI validators independently evaluate each argument
- Validators score on: Clarity, Coherence, Persuasiveness, Evidence Quality
- Majority voting determines winning arguments

### Phase 4: Results & Leaderboard (2 min)
- Players see their argument scores and validator feedback
- XP awarded based on score percentile
- Leaderboard updated with new rankings

## 💰 XP Distribution System

| Achievement | XP Reward |
|-------------|-----------|
| Winning Argument (Top 50%) | 100-200 XP |
| Strong Argument (Top 50-75%) | 50-100 XP |
| Participation | 25 XP |
| Consensus Agreement | +50 XP bonus |
| Appeal Success | +100 XP bonus |

## 🚀 Getting Started

### Prerequisites

- Node.js 22.13.0+
- pnpm 10.4.1+
- GenLayer CLI (for contract deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/genlayer-minigame.git
cd genlayer-minigame

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:3000`

### Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_GENLAYER_API_URL=https://api.genlayer.com
VITE_GENLAYER_API_KEY=your_api_key_here
VITE_VALIDATOR_COUNT=7
```

## 📝 Intelligent Contract Example

```python
# GenLayer Intelligent Contract for Argument Evaluation
from genlayer import Contract, LLM, storage

class ArgumentValidator(Contract):
    def evaluate_argument(self, argument: str, proposition: str, stance: str) -> dict:
        """
        Evaluate an argument using LLM-powered analysis.
        
        Args:
            argument: The player's written argument
            proposition: The debate proposition
            stance: The player's stance (for/against)
        
        Returns:
            Dictionary with scores for clarity, coherence, persuasiveness, evidence
        """
        prompt = f"""
        Evaluate this argument on a scale of 1-10 for each criterion:
        
        Proposition: {proposition}
        Stance: {stance}
        Argument: {argument}
        
        Criteria:
        1. Clarity: Is the argument easy to understand?
        2. Coherence: Does it logically flow?
        3. Persuasiveness: Does it effectively support the stance?
        4. Evidence: Are claims grounded in reasoning?
        
        Return a JSON object with scores for each criterion.
        """
        
        result = LLM.call(prompt)
        return self._parse_scores(result)
    
    def reach_consensus(self, argument_scores: list) -> dict:
        """
        Use Optimistic Democracy to reach consensus on argument quality.
        Validators vote on whether scores are equivalent.
        """
        # Validators independently verify scores
        # Majority voting determines final result
        # Appeals possible within finality window
        pass
```

## 🎨 Design System

### Color Tokens

```css
/* Classical Modernism Theme */
--primary: oklch(0.35 0.08 260);        /* Deep slate blue */
--secondary: oklch(0.65 0.15 50);       /* Warm gold */
--accent: oklch(0.65 0.15 50);          /* Warm gold accent */
--background: oklch(0.98 0.001 286.375); /* Soft cream */
--foreground: oklch(0.15 0.05 260);     /* Deep slate blue text */
```

### Typography

- **Display**: Georgia (serif) - 2rem, bold
- **Heading**: Montserrat (sans-serif) - 1.5rem, bold
- **Body**: Lato (sans-serif) - 1rem, regular
- **Accent**: Small caps for validator names

## 📊 Leaderboard & Progression

### Weekly Leaderboard
- Top 10 players compete for seasonal rewards
- XP resets weekly, badges persist

### Progression System
- **Levels**: Based on total XP earned
- **Badges**: Unlock achievements (e.g., "Master Debater", "Consensus Builder")
- **Titles**: Earn titles for specific accomplishments

## 🔗 GenLayer Integration

### Smart Contract Deployment

```bash
# Deploy the argument validator contract
genlayer deploy contracts/ArgumentValidator.py --network testnet

# Set contract address in environment
export VITE_VALIDATOR_CONTRACT=0x...
```

### Validator Ensemble

The game uses 7 independent AI validators:
1. **Clarity Validator**: Evaluates argument clarity
2. **Logic Validator**: Checks logical coherence
3. **Persuasion Validator**: Assesses persuasiveness
4. **Evidence Validator**: Verifies evidence quality
5. **Bias Detector**: Checks for logical fallacies
6. **Consensus Validator**: Aggregates other scores
7. **Appeal Validator**: Handles disputed outcomes

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run integration tests with GenLayer testnet
pnpm test:integration

# Run end-to-end tests
pnpm test:e2e
```

## 📈 Metrics & Analytics

Track game engagement:
- Average session duration
- Weekly active users
- Argument submission rate
- Validator consensus accuracy
- XP distribution fairness
- Leaderboard competition intensity

## 🚢 Deployment

### Frontend Deployment

```bash
# Build for production
pnpm build

# Deploy to Vercel, Netlify, or your hosting provider
pnpm deploy
```

### Backend Deployment

```bash
# Build backend
pnpm build:server

# Deploy to Railway, Render, or your hosting provider
npm start
```

### GenLayer Contract Deployment

```bash
# Deploy to GenLayer mainnet
genlayer deploy contracts/ArgumentValidator.py --network mainnet
```

## 🤝 Contributing

We welcome contributions from the GenLayer community! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 References

- [GenLayer Documentation](https://docs.genlayer.com/)
- [Intelligent Contracts](https://docs.genlayer.com/understand-genlayer-protocol/what-are-intelligent-contracts)
- [Optimistic Democracy](https://docs.genlayer.com/understand-genlayer-protocol/optimistic-democracy-how-genlayer-works)
- [GenLayer CLI](https://docs.genlayer.com/tools/genlayer-cli)

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

Built for GenLayer's community mini-game mission. Special thanks to the GenLayer team for the innovative Intelligent Contracts and Optimistic Democracy framework.

---

**Questions?** Join the conversation on [GenLayer Discord](https://discord.gg/genlayer) in the #dev-chat channel!
