# 🏏 IPL AI Predictor

AI-powered IPL match prediction website built with Next.js 16, Tailwind CSS v4, and Claude AI.

![Dashboard](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)

## Features

- **Dashboard** — View today's IPL matches with real-time status, venue, and AI predictions
- **AI Predictions** — Toss guess (low confidence) + match winner prediction with reasoning
- **Match Detail** — Full match info with prediction vs actual comparison
- **History** — Track prediction accuracy with circular progress charts
- **Auto Scraping** — Fetch match data from ESPNcricinfo / Cricbuzz
- **Cron Jobs** — Daily fixture updates + prediction generation

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, Shadcn UI |
| Database | SQLite (better-sqlite3) |
| Scraping | Cheerio + Fetch API |
| AI | Claude API (@anthropic-ai/sdk) |
| Deployment | Vercel-ready |

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.local` and add your Anthropic API key:

```env
ANTHROPIC_API_KEY=sk-ant-...
CRON_SECRET=your-secret-key
```

> **Note:** The app works without an API key using mock predictions. Add a key for real Claude-powered analysis.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── page.tsx                 # Dashboard
│   ├── match/[id]/page.tsx      # Match detail
│   ├── history/page.tsx         # Prediction history
│   ├── api/
│   │   ├── matches/today/       # GET today's matches
│   │   ├── matches/[id]/        # GET single match
│   │   ├── predict/[id]/        # POST generate prediction
│   │   ├── scrape/today/        # POST scrape fixtures
│   │   ├── scrape/live/[id]/    # POST refresh live match
│   │   ├── history/             # GET prediction history
│   │   └── cron/                # POST cron job
├── components/
│   ├── ui/                      # Shadcn UI components
│   ├── match-card.tsx           # Match card
│   ├── prediction-panel.tsx     # AI prediction display
│   ├── confidence-bar.tsx       # Progress bar
│   └── accuracy-stats.tsx       # Accuracy metrics
├── lib/
│   ├── db.ts                    # SQLite database
│   ├── scraper.ts               # Scraper orchestrator
│   ├── scraper-espn.ts          # ESPNcricinfo scraper
│   ├── scraper-cricbuzz.ts      # Cricbuzz fallback
│   ├── ai.ts                    # Claude AI integration
│   ├── types.ts                 # TypeScript types
│   └── utils.ts                 # Utilities
└── data/                        # SQLite DB file (auto-created)
```

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/matches/today` | Today's matches with predictions |
| GET | `/api/matches/[id]` | Single match with prediction history |
| POST | `/api/predict/[id]` | Generate AI prediction |
| POST | `/api/scrape/today` | Scrape today's fixtures |
| POST | `/api/scrape/live/[id]` | Refresh live match |
| GET | `/api/history` | Prediction history & accuracy stats |
| POST | `/api/cron` | Cron job (daily scrape + predict) |

## Database Schema

```sql
TABLE matches (
  id, external_id, team_a, team_b, venue,
  match_time, status, toss_winner, toss_decision,
  score_summary, winner, created_at, updated_at
)

TABLE predictions (
  id, match_id, toss_pick, toss_confidence,
  toss_note, winner_pick, winner_confidence,
  reasons (JSON), created_at
)
```

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel deploy
```

The `vercel.json` configures a daily cron job at 6 AM UTC.

> **Note:** For Vercel deployment, migrate from SQLite to a cloud database (e.g., Supabase, Neon) since Vercel functions don't have persistent filesystem.

## Important Notes

- **Toss predictions** are always labeled "AI Toss Guess" with 50-56% confidence — toss is a coin flip
- **Match predictions** use 52-78% confidence based on venue, form, and conditions
- Predictions are for **entertainment purposes only**
- Data is sourced from **public websites** (ESPNcricinfo, Cricbuzz)

## License

MIT
