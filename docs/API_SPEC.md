# PolyScope API Specification

## Endpoints

### POST /api/analyze

Analyzes a Polymarket trader's wallet address and returns comprehensive performance metrics and recommendations.

## Request

### URL
```
POST https://{supabase-project}.supabase.co/functions/v1/analyze
```

### Headers
```
Content-Type: application/json
Authorization: Bearer {anon_key}
```

### Request Body
```json
{
  "wallet": "0x1234567890abcdef1234567890abcdef12345678"
}
```

### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| wallet | string | Yes | Ethereum wallet address (0x + 40 hex characters) |

## Response

### Success Response (200 OK)

```json
{
  "data": {
    "wallet": "0x1234567890abcdef1234567890abcdef12345678",
    "followScore": 72,
    "recommendation": "CAUTION",
    "summary": "This trader demonstrates above-average performance with a Follow Score of 72...",
    "scores": {
      "consistency": 68,
      "risk": 75,
      "accuracy": 71,
      "volatility": 45,
      "discipline": 62
    },
    "metrics": {
      "totalPnL": 2345.67,
      "winRate": 58.3,
      "avgROI": 12.5,
      "maxDrawdown": 18.2,
      "returnVolatility": 24.5,
      "totalTrades": 45,
      "activeDays": 28
    },
    "strengths": [
      "Excellent risk management",
      "Strong prediction accuracy",
      "Above-average win rate (58.3%)"
    ],
    "weaknesses": [
      "Inconsistent performance over time",
      "High return volatility"
    ],
    "recentTrades": [
      {
        "market": "Presidential Election 2024",
        "outcome": "WIN",
        "pnl": 156.78,
        "date": "2024-01-15T14:32:00.000Z",
        "roi": 23.4
      }
    ],
    "pnlHistory": [
      {
        "date": "2024-01-01",
        "pnl": 500.00
      }
    ]
  }
}
```

### Error Response (500 Internal Server Error)

```json
{
  "error": {
    "code": "ANALYSIS_FAILED",
    "message": "Valid wallet address is required"
  }
}
```

## Response Fields

### Root Object

| Field | Type | Description |
|-------|------|-------------|
| data | object | Analysis results (on success) |
| error | object | Error details (on failure) |

### Data Object

| Field | Type | Description |
|-------|------|-------------|
| wallet | string | Analyzed wallet address |
| followScore | number | Overall score (0-100) |
| recommendation | string | FOLLOW, CAUTION, or DO_NOT_FOLLOW |
| summary | string | Natural language summary |
| scores | object | Component scores breakdown |
| metrics | object | Performance metrics |
| strengths | string[] | Identified strengths |
| weaknesses | string[] | Identified weaknesses |
| recentTrades | array | Last 10 trades |
| pnlHistory | array | Cumulative PnL over time |

### Scores Object

| Field | Type | Range | Description |
|-------|------|-------|-------------|
| consistency | number | 0-100 | Trading pattern stability |
| risk | number | 0-100 | Risk management quality |
| accuracy | number | 0-100 | Prediction correctness |
| volatility | number | 0-100 | Return variability (higher = worse) |
| discipline | number | 0-100 | Execution quality |

### Metrics Object

| Field | Type | Unit | Description |
|-------|------|------|-------------|
| totalPnL | number | USD | Cumulative profit/loss |
| winRate | number | % | Percentage of winning trades |
| avgROI | number | % | Average return per trade |
| maxDrawdown | number | % | Largest peak-to-trough decline |
| returnVolatility | number | - | Standard deviation of returns |
| totalTrades | number | count | Number of trades analyzed |
| activeDays | number | days | Unique trading days |

### Trade Object

| Field | Type | Description |
|-------|------|-------------|
| market | string | Market name |
| outcome | string | WIN or LOSS |
| pnl | number | Trade profit/loss in USD |
| date | string | ISO 8601 timestamp |
| roi | number | Trade return on investment (%) |

### PnL History Object

| Field | Type | Description |
|-------|------|-------------|
| date | string | Date (YYYY-MM-DD) |
| pnl | number | Cumulative PnL at that date |

## Error Codes

| Code | Description |
|------|-------------|
| ANALYSIS_FAILED | General analysis failure |
| INVALID_WALLET | Invalid wallet address format |
| RATE_LIMITED | Too many requests |

## Rate Limits

- 60 requests per minute per IP
- 1000 requests per day per IP

## Example Usage

### cURL
```bash
curl -X POST \
  'https://project.supabase.co/functions/v1/analyze' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -d '{"wallet": "0x1234567890abcdef1234567890abcdef12345678"}'
```

### JavaScript
```javascript
const response = await fetch(
  'https://project.supabase.co/functions/v1/analyze',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_ANON_KEY'
    },
    body: JSON.stringify({
      wallet: '0x1234567890abcdef1234567890abcdef12345678'
    })
  }
);

const result = await response.json();
console.log(result.data.followScore);
```
