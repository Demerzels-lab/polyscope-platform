# PolyScope Frequently Asked Questions

## General Questions

### What is PolyScope?
PolyScope is an AI-powered analytics platform that evaluates Polymarket traders based on their wallet addresses. It provides comprehensive performance metrics, risk assessments, and data-driven recommendations on whether to follow a trader's positions.

### How does the Follow Score work?
The Follow Score is a proprietary 0-100 rating that combines five key metrics: Consistency, Risk Management, Accuracy, Volatility, and Discipline. Higher scores indicate traders with better overall performance and lower risk profiles.

### Is PolyScope free to use?
The basic analysis feature is free. Enter any Polymarket wallet address to receive a complete trader intelligence report at no cost.

### What wallet addresses can I analyze?
You can analyze any Ethereum wallet address that has traded on Polymarket. The address must be in standard format: 0x followed by 40 hexadecimal characters.

---

## Analysis Questions

### How long does an analysis take?
Most analyses complete within 3-5 seconds. Complex wallets with extensive trading history may take slightly longer.

### How accurate is the Follow Score?
The Follow Score uses proven statistical methods to evaluate trader performance. While past performance does not guarantee future results, the score provides objective data points for decision-making.

### What data sources does PolyScope use?
PolyScope retrieves trading data directly from Polymarket's public API, including trade history, position data, and market outcomes.

### How recent is the data?
Each analysis fetches real-time data from Polymarket. The results reflect the current state of the trader's portfolio and complete trading history.

---

## Scoring Questions

### What does each component score measure?

**Consistency Score**: Measures how stable and predictable the trader's returns are over time. Higher scores indicate steady performance rather than erratic results.

**Risk Score**: Evaluates position sizing discipline, overexposure avoidance, and drawdown management. Higher scores indicate better risk management.

**Accuracy Score**: Measures prediction correctness based on win rate and profit factor. Higher scores indicate better market predictions.

**Volatility Score**: Quantifies return variability. Unlike other scores, lower volatility is better (this is inverted in the formula).

**Discipline Score**: Assesses execution quality, including avoiding large losses and premature profit-taking. Higher scores indicate disciplined trading.

### What do the recommendations mean?

**FOLLOW**: The trader meets high standards across multiple metrics. Suitable for following with appropriate position sizing.

**CAUTION**: The trader shows mixed results. Requires additional due diligence before following. Consider smaller position sizes.

**DO NOT FOLLOW**: The trader shows concerning patterns such as poor risk management, high drawdowns, or inconsistent performance.

### Why did a trader get a low score?
Common reasons include:
- High maximum drawdown (> 40%)
- Heavy reliance on a single winning trade
- Inconsistent position sizing
- Low win rate
- High return volatility

---

## Technical Questions

### What browsers are supported?
PolyScope works on all modern browsers including Chrome, Firefox, Safari, and Edge. JavaScript must be enabled.

### Is my data stored?
No. PolyScope processes analyses in real-time and does not store wallet addresses, trading data, or analysis results.

### Can I export the analysis?
Currently, you can screenshot the results. PDF export functionality is planned for a future release.

### Is there an API?
A public API is planned for future release. Currently, the platform is available through the web interface only.

---

## Recommendation Questions

### Should I always follow traders with high scores?
High scores indicate strong historical performance, but they are not guarantees. Always:
- Diversify across multiple traders
- Use appropriate position sizing
- Conduct your own research
- Understand the markets being traded

### What if I disagree with the recommendation?
The recommendation is algorithmic and objective. If you have additional context about a trader that isn't captured in the metrics, use your judgment. The analysis provides data points, not mandates.

### How often should I re-analyze a wallet?
We recommend re-analyzing:
- Before making significant follow decisions
- Monthly for active monitoring
- After major market events
- When you notice significant performance changes

---

## Troubleshooting

### "Invalid wallet address" error
Ensure your wallet address:
- Starts with "0x"
- Contains exactly 40 characters after "0x"
- Uses only hexadecimal characters (0-9, a-f)

### Analysis takes too long
If an analysis exceeds 30 seconds:
- Check your internet connection
- Try refreshing the page
- Retry in a few minutes

### Results seem incorrect
The analysis uses only publicly available blockchain data. If results seem wrong:
- Verify you entered the correct wallet address
- Check if the wallet has recent Polymarket activity
- Ensure you're analyzing a Polymarket trading wallet

---

## Disclaimer

PolyScope provides informational analysis only. It is not financial advice. Past performance does not guarantee future results. Always conduct your own research before making investment decisions. Prediction markets involve significant risk, and you may lose your entire investment.
