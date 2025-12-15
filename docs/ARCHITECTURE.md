# PolyScope System Architecture

## High-Level Overview

```
+-------------------+     +--------------------+     +------------------+
|                   |     |                    |     |                  |
|   React Frontend  | --> |  Supabase Edge     | --> |   Polymarket     |
|   (TypeScript)    |     |  Functions (Deno)  |     |   API            |
|                   |     |                    |     |                  |
+-------------------+     +--------------------+     +------------------+
         |                         |
         v                         v
+-------------------+     +--------------------+
|                   |     |                    |
|   ECharts         |     |   Scoring Engine   |
|   Visualization   |     |   (TypeScript)     |
|                   |     |                    |
+-------------------+     +--------------------+
```

## Component Architecture

### Frontend Layer

```
src/
├── App.tsx                 # Main application component
├── components/
│   ├── Hero.tsx           # Landing page hero section
│   ├── WalletInput.tsx    # Wallet address input form
│   ├── LoadingState.tsx   # Analysis loading animation
│   ├── Dashboard.tsx      # Results dashboard with charts
│   └── Footer.tsx         # Application footer
├── index.css              # TailwindCSS styles
└── main.tsx               # Application entry point
```

### Backend Layer (Edge Functions)

```
supabase/
└── functions/
    └── analyze/
        └── index.ts       # Main analysis endpoint
```

## Data Flow

### Request Flow

1. **User Input**: User enters Polymarket wallet address
2. **Validation**: Frontend validates address format (0x + 40 hex chars)
3. **API Call**: POST request to `/functions/v1/analyze`
4. **Data Fetch**: Edge function fetches from Polymarket API
5. **Processing**: Scoring engine computes all metrics
6. **Response**: JSON response with complete analysis

### Response Structure

```typescript
interface AnalysisResponse {
  wallet: string;
  followScore: number;
  recommendation: 'FOLLOW' | 'CAUTION' | 'DO_NOT_FOLLOW';
  summary: string;
  scores: {
    consistency: number;
    risk: number;
    accuracy: number;
    volatility: number;
    discipline: number;
  };
  metrics: {
    totalPnL: number;
    winRate: number;
    avgROI: number;
    maxDrawdown: number;
    returnVolatility: number;
    totalTrades: number;
    activeDays: number;
  };
  strengths: string[];
  weaknesses: string[];
  recentTrades: Trade[];
  pnlHistory: PnLPoint[];
}
```

## Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| TailwindCSS | Styling |
| Vite | Build Tool |
| ECharts | Data Visualization |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| Supabase Edge Functions | Serverless Compute |
| Deno Runtime | JavaScript Runtime |
| Polymarket API | Data Source |

## API Integration

### Polymarket Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/trades` | GET | Fetch trade history |
| `/api/positions` | GET | Fetch current positions |
| `/api/markets` | GET | Fetch market data |

### Internal Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/functions/v1/analyze` | POST | Analyze trader wallet |

## Scoring Engine Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Scoring Engine                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │ Consistency │  │    Risk     │  │  Accuracy   │ │
│  │   Module    │  │   Module    │  │   Module    │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
│                                                      │
│  ┌─────────────┐  ┌─────────────┐                  │
│  │ Volatility  │  │ Discipline  │                  │
│  │   Module    │  │   Module    │                  │
│  └─────────────┘  └─────────────┘                  │
│                                                      │
│  ┌─────────────────────────────────────────────┐   │
│  │           Follow Score Calculator            │   │
│  └─────────────────────────────────────────────┘   │
│                                                      │
│  ┌─────────────────────────────────────────────┐   │
│  │         Recommendation Generator             │   │
│  └─────────────────────────────────────────────┘   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Security Considerations

- CORS headers configured for cross-origin requests
- Input validation on wallet addresses
- Rate limiting at edge function level
- No sensitive data persistence
- Stateless architecture

## Scalability

- Edge functions auto-scale based on demand
- No database dependencies for core analysis
- CDN-delivered frontend assets
- Parallel metric calculation
