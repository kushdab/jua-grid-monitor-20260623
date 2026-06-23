# ☀️ Jua Grid Monitor

A TypeScript React application for real-time monitoring of community solar micro-grids in urban and peri-urban areas.

## Description

Jua Grid Monitor provides a live dashboard to track the health, energy output, load consumption, and battery status of distributed community solar nodes. Designed for micro-grid operators managing off-grid or hybrid solar installations.

## Features

- **Real-time simulation** — Grid data updates every 2 seconds with realistic fluctuation
- **Node cards** — Visual status for each micro-grid node including solar output, load, and battery
- **Summary metrics** — Aggregated totals for solar generation, load, average battery, and online count
- **Battery progress bars** — Color-coded charge level indicators (green/yellow/red)
- **Status badges** — Online, Warning, and Offline states per node
- **Pause / Resume** — Control live data refresh
- **Manual refresh** — Force an instant data update
- **Responsive layout** — Grid layout adapts to screen size

## Installation

```bash
git clone https://github.com/your-org/jua-grid-monitor-20260623.git
cd jua-grid-monitor-20260623
npm install
```

## Usage

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
```

## Usage Example

The dashboard loads six simulated Nairobi community solar nodes. Each card shows:

- **Solar kW** — Current photovoltaic generation
- **Load kW** — Active community power consumption
- **Battery %** — State of charge with color-coded bar
- **Status** — Online / Warning / Offline badge
- **Last updated** — Timestamp of most recent reading

The summary row at the top provides fleet-wide totals updated on each tick.

## Tech Stack

- React 18
- TypeScript
- Create React App

## License

MIT License

Copyright (c) 2026 Jua Grid Monitor Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
