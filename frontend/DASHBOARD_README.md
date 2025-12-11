# Dashboard Features

## Implemented Features

### ✅ Routing System
- React Router DOM integration
- Seamless navigation from landing page to dashboard
- "Try Now" buttons route to `/dashboard`

### ✅ Dashboard Layout
- **Dark Mode Theme**: Professional near-black (#0a0a0a) background
- **Poppins Font**: Used throughout with varying weights (200, 400, 600, 800)
- **Spacious Design**: Follows strict spacing system ($S_1$ to $S_4$)
- **Max Width**: 1400px container for optimal readability
- **Responsive Sidebar**: Collapsible navigation with active states

### ✅ KPI Cards (4 Metrics)
- **Animated Counters**: Numbers count up from 0 on load (600ms duration)
- **Staggered Fade-In**: Cards appear sequentially (150ms base delay)
- **Trend Indicators**: Color-coded badges (green/red) with icons
- **Hover Effects**: Subtle background darkening and border enhancement
- **Metrics Tracked**:
  - Total Messages Sent
  - Messages Read
  - Customer Replies  
  - Opt-Out Rate

### ✅ Performance Trend Chart
- **Three Data Lines**: 
  - Messages Sent (Blue #3b82f6)
  - Messages Read (Teal #14b8a6)
  - Customer Replies (Orange #f97316)
- **Animated Drawing**: Lines draw from left to right (800ms)
- **Custom Tooltip**: Dark themed with all metrics
- **Minimal Grid**: Dashed, low-opacity lines
- **Radial Background**: Subtle green glow effect
- **Period Switching**: Smooth transition with blur effect

### ✅ Active Campaigns Table
- **Generous Row Height**: Spacious padding for readability
- **Status Badges**: Running, Pending, Completed, Failed
- **Animated Status Icons**: Pulsating indicators for active campaigns
- **Staggered Row Reveal**: Cascading fade-in effect (100ms delay)
- **Hover Effects**: Full-row highlight on hover
- **Action Menu**: Ellipsis dropdown with contextual actions
- **Empty State**: Friendly message with CTA when no campaigns exist

### ✅ Micro-Interactions & Animations
- **Page Load Sequence**:
  - Header/Sidebar: Instant (0ms)
  - KPI Cards: 150ms delay, 300ms fade + slide
  - Chart: 400ms delay, 350ms fade + data draw
  - Table: 600ms delay, 300ms fade + row cascade
- **State Transitions**: Blur effect when changing time periods
- **Button Feedback**: Brutalist shadow effect on hover
- **Keyboard Navigation**: Full tab support with focus rings

### ✅ Accessibility
- WCAG AA compliant color contrast
- High-contrast dark mode
- Keyboard navigable
- Focus indicators on all interactive elements
- Semantic HTML structure

### ✅ Design System
**Spacing Scale:**
- $S_1$ (4px): Micro padding
- $S_2$ (16px): Card content
- $S_3$ (32px): Between cards
- $S_4$ (48-64px): Major sections

**Typography (Poppins):**
- Primary Metrics: Extra Bold (800), 38-42px, White
- Card Titles: Semi-Bold (600), 14px, 80% White
- Trends: Thin (200), 12px, Green/Red
- Body: Regular (400), 13px, 70% White

**Colors:**
- Background: #0a0a0a
- Cards: #141414
- Primary Accent: #22c55e (Green)
- Border: rgba(255,255,255,0.05)

## Tech Stack
- React 19
- React Router DOM
- Framer Motion (animations)
- Recharts (data visualization)
- Lottie React (status animations)
- Tailwind CSS 4
- Lucide React (icons)

## Running the Dashboard
```bash
npm run dev
```

Navigate to `http://localhost:5173/dashboard` or click any "Try Now" button.
