# PolyScope Scoring Methodology

## Follow Score Formula

The Follow Score is the primary metric produced by PolyScope. It ranges from 0 to 100 and is calculated using the following weighted formula:

```
FollowScore = round(
  0.30 * ConsistencyScore +
  0.25 * RiskScore +
  0.25 * AccuracyScore +
  0.10 * (100 - VolatilityScore) +
  0.10 * DisciplineScore
)
```

## Component Scores

### 1. Consistency Score (30% Weight)

Measures the stability and predictability of trading patterns.

**Calculation:**
```
ConsistencyScore = 0.4 * PnLStabilityScore +
                   0.3 * (100 - DependencyPenalty) +
                   0.3 * RegularityScore
```

**Sub-components:**

| Component | Formula | Description |
|-----------|---------|-------------|
| PnL Stability | 100 - (CV * 20) | CV = Coefficient of Variation of PnL |
| Dependency Penalty | min(TopTradeContribution * 30, 30) | Penalizes reliance on single trades |
| Regularity Score | 100 - (IntervalVariance / DayInMs * 10) | Measures trading frequency consistency |

### 2. Risk Score (25% Weight)

Evaluates risk management practices and position sizing discipline.

**Calculation:**
```
RiskScore = 0.30 * SizingScore +
            0.25 * OverexposureScore +
            0.25 * AllInScore +
            0.20 * (100 - DrawdownPenalty)
```

**Sub-components:**

| Component | Formula | Description |
|-----------|---------|-------------|
| Sizing Score | 100 - (SizeStdDev / AvgSize * 50) | Position size consistency |
| Overexposure Score | 100 - (MaxSize/AvgSize - 1) * 30 | Large position penalty |
| All-In Score | 100 - (AllInFrequency * 200) | Frequency of oversized bets |
| Drawdown Penalty | min(MaxDrawdown * 1.5, 50) | Maximum drawdown impact |

### 3. Accuracy Score (25% Weight)

Measures prediction accuracy and profit quality.

**Calculation:**
```
AccuracyScore = WinRate * 60 + min(ProfitFactor * 20, 40)
```

**Components:**

| Component | Formula | Description |
|-----------|---------|-------------|
| Win Rate | Wins / TotalTrades | Percentage of winning trades |
| Profit Factor | WeightedWins / WeightedLosses | Ratio of winning to losing magnitude |

### 4. Volatility Score (10% Weight, Inverted)

Quantifies return variability. Higher volatility = lower contribution to Follow Score.

**Calculation:**
```
VolatilityScore = (VolatilityNormalized * 0.6 + DrawdownFactor * 0.4) * 100
```

**Note:** In the Follow Score formula, volatility is inverted (100 - VolatilityScore) to reward stability.

### 5. Discipline Score (10% Weight)

Evaluates trading execution quality and self-control.

**Calculation:**
```
DisciplineScore = SizeConsistency * 40 +
                  (1 - LoserPenalty) * 35 +
                  (1 - PrematureTaking) * 25
```

**Sub-components:**

| Component | Formula | Description |
|-----------|---------|-------------|
| Size Consistency | 1 - (SizeStdDev / AvgSize) | Trade size discipline |
| Loser Penalty | LargeLosses / TotalTrades | Holding losing positions |
| Premature Taking | SmallWins / TotalWins | Taking profits too early |

## Recommendation Thresholds

### FOLLOW
All conditions must be satisfied:
```
FollowScore >= 75 AND
RiskScore >= 50 AND
ConsistencyScore >= 60
```

### CAUTION
```
50 <= FollowScore < 75 AND
MaxDrawdown <= 40% AND
TopTradeContribution <= 50%
```

### DO NOT FOLLOW
Any condition triggers:
```
FollowScore < 50 OR
MaxDrawdown > 40% OR
TopTradeContribution > 50%
```

## Score Interpretation Guide

| Score Range | Interpretation |
|-------------|----------------|
| 90-100 | Exceptional - Elite trader with outstanding metrics |
| 75-89 | Strong - Reliable performer suitable for following |
| 60-74 | Above Average - Good but requires monitoring |
| 50-59 | Average - Proceed with caution |
| 35-49 | Below Average - Significant concerns |
| 0-34 | Poor - Not recommended for following |

## Metric Definitions

| Metric | Definition | Good Range |
|--------|------------|------------|
| Total PnL | Cumulative profit/loss in USD | Positive |
| Win Rate | Percentage of winning trades | > 50% |
| Avg ROI | Average return on investment per trade | > 10% |
| Max Drawdown | Largest peak-to-trough decline | < 25% |
| Return Volatility | Standard deviation of trade returns | < 30 |
| Active Days | Number of unique trading days | > 10 |

## Statistical Validity

- Minimum 5 trades required for reliable scoring
- Confidence increases with trade count
- Time-weighted analysis accounts for market conditions
- Outlier trades are considered but not over-weighted
