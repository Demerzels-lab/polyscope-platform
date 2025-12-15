# How PolyScope Works

## Analysis Pipeline

PolyScope employs a sophisticated multi-stage analysis pipeline to evaluate trader performance and generate actionable recommendations.

## Stage 1: Data Collection

When you submit a wallet address, PolyScope initiates the following data collection processes:

### Trading History Retrieval
- Fetches complete trading history from Polymarket
- Collects position data including entry prices and sizes
- Gathers market outcome information for accuracy assessment

### Data Normalization
- Standardizes timestamps across all trades
- Normalizes position sizes for fair comparison
- Calculates derived metrics from raw trade data

## Stage 2: Metric Calculation

### Performance Metrics

| Metric | Description | Calculation |
|--------|-------------|-------------|
| Total PnL | Cumulative profit/loss | Sum of all trade P&L |
| Win Rate | Percentage of winning trades | Wins / Total Trades |
| Average ROI | Mean return per trade | Mean(Trade ROI) |
| Max Drawdown | Largest peak-to-trough decline | (Peak - Trough) / Peak |
| Return Volatility | Standard deviation of returns | StdDev(Trade Returns) |

### Risk Metrics

- **Position Sizing Variance**: Measures consistency in trade sizing
- **Overexposure Index**: Detects oversized positions relative to average
- **All-In Frequency**: Tracks high-risk position frequency

### Consistency Metrics

- **PnL Stability**: Coefficient of variation in returns
- **Big-Win Dependency**: Reliance on single large trades
- **Trade Distribution**: Regularity of trading activity

## Stage 3: Score Computation

Each component score is calculated on a 0-100 scale:

### Consistency Score
Evaluates stability and reliability of trading patterns:
- PnL stability (40% weight)
- Big-win dependency penalty (30% weight)
- Trade regularity (30% weight)

### Risk Score
Assesses risk management quality:
- Position sizing variance (30% weight)
- Overexposure index (25% weight)
- All-in frequency (25% weight)
- Drawdown penalty (20% weight)

### Accuracy Score
Measures prediction correctness:
- Win rate component (60% weight)
- Profit factor component (40% weight)

### Volatility Score
Quantifies return variability (higher = worse):
- Return volatility (60% weight)
- Drawdown factor (40% weight)

### Discipline Score
Evaluates execution quality:
- Size consistency (40% weight)
- Loss holding detection (35% weight)
- Premature profit-taking (25% weight)

## Stage 4: Follow Score Generation

The Follow Score combines all component scores using a weighted formula:

```
Follow Score = 0.30 * Consistency +
               0.25 * Risk +
               0.25 * Accuracy +
               0.10 * (100 - Volatility) +
               0.10 * Discipline
```

## Stage 5: Recommendation Logic

### FOLLOW Criteria
All conditions must be met:
- Follow Score >= 75
- Risk Score >= 50
- Consistency Score >= 60

### CAUTION Criteria
- Follow Score between 50 and 74
- Max Drawdown <= 40%
- Top trade contribution <= 50% of total PnL

### DO NOT FOLLOW Criteria
Any of these conditions:
- Follow Score < 50
- Max Drawdown > 40%
- Top trade contribution > 50% of total PnL

## Stage 6: Report Generation

The final report includes:
- Visual Follow Score gauge
- Color-coded recommendation badge
- Professional summary paragraph
- Strengths and weaknesses analysis
- Performance radar chart
- Cumulative PnL timeline
- Recent trades table

## Data Refresh

- Analysis uses real-time data from Polymarket
- Each analysis reflects the current state of the trader's portfolio
- Historical data is preserved for trend analysis

## Accuracy and Reliability

- Statistical methods validated against known trading patterns
- Scoring algorithm calibrated for prediction market dynamics
- Continuous model improvement based on outcome tracking
