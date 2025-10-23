# FYPILOT Design Guidelines

## Design Approach

**Selected System**: Material Design 3 with academic refinements
**Justification**: Educational/administrative platform requiring professional credibility, data density management, and consistent interaction patterns across three distinct user roles (Students, Faculty, FYP Committee).

---

## Core Design Principles

1. **Role Clarity**: Each dashboard (Student/Faculty/Committee) maintains consistent design language while using subtle color variations for instant role recognition
2. **Hierarchy & Scannability**: Information-dense interfaces require clear visual hierarchy through typography, spacing, and card-based layouts
3. **Trust & Professionalism**: Academic context demands credible, polished aesthetics without playful elements

---

## Color Palette

### Primary Colors
**Student Dashboard**: 
- Primary: 220 75% 56% (Professional blue)
- Light mode bg: 220 20% 97%
- Dark mode bg: 220 15% 12%

**Faculty Dashboard**:
- Primary: 260 60% 58% (Dignified purple)
- Same background values

**Committee Dashboard**:
- Primary: 145 65% 45% (Authoritative teal)
- Same background values

### Semantic Colors
- Success: 142 71% 45%
- Warning: 38 92% 50%
- Error: 0 84% 60%
- Info: 199 89% 48%

### Neutrals (Dark Mode)
- Text primary: 0 0% 95%
- Text secondary: 0 0% 70%
- Surface elevated: 220 15% 18%
- Borders: 220 15% 25%

---

## Typography

**Font Family**: Inter (Google Fonts) for UI, JetBrains Mono for code/IDs

**Scale**:
- H1: text-4xl font-bold (Dashboard titles)
- H2: text-2xl font-semibold (Section headers)
- H3: text-xl font-semibold (Card titles)
- Body: text-base (Primary content)
- Small: text-sm (Metadata, captions)
- Tiny: text-xs (Timestamps, helper text)

---

## Layout System

**Spacing Units**: Tailwind primitives - 2, 4, 6, 8, 12, 16, 24
- Component padding: p-6
- Card spacing: gap-6
- Section margins: mb-8 to mb-12
- Container max-width: max-w-7xl

**Grid Patterns**:
- Dashboard stats: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Project cards: grid-cols-1 lg:grid-cols-2
- Tables: Full-width responsive with horizontal scroll

---

## Component Library

### Navigation
- **Top Bar**: Sticky header with role indicator, search, notifications, profile
- **Sidebar**: Collapsible navigation with icon + label, active state highlighting
- **Breadcrumbs**: For deep navigation (Committee dashboard)

### Cards
- **Elevated Cards**: bg-surface, rounded-lg, shadow-md, p-6
- **Interactive Cards**: hover:shadow-lg transition-shadow
- **Stat Cards**: Prominent number (text-3xl font-bold), label (text-sm text-secondary), icon (top-right, opacity-60)

### Buttons
- **Primary**: Filled with primary color, text-white
- **Secondary**: Outlined with border-2
- **Ghost**: Transparent with hover background
- **Icon Buttons**: p-2 rounded-full for actions
- Consistent sizing: px-6 py-2.5 (default), px-4 py-2 (small)

### Modals
- **Overlay**: backdrop-blur-sm bg-black/50
- **Container**: max-w-2xl (default), max-w-4xl (complex forms), rounded-xl, shadow-2xl
- **Header**: pb-4 border-b with title and close button
- **Footer**: pt-4 border-t with action buttons right-aligned
- **Animations**: fade-in with slide-up effect

### Forms
- **Input Fields**: px-4 py-2.5 rounded-lg border-2 focus:border-primary
- **Labels**: text-sm font-medium mb-2
- **Error States**: border-error with text-error message below
- **Success States**: border-success with checkmark icon
- **File Upload**: Drag-and-drop zone with dashed border

### Tables
- **Header**: bg-surface-elevated, sticky top-0, font-semibold
- **Rows**: hover:bg-surface-elevated, border-b
- **Actions Column**: Right-aligned icon buttons
- **Responsive**: Stack on mobile with card-based layout

### Notifications/Alerts
- **Toast**: Fixed bottom-right, slide-in animation, auto-dismiss
- **Inline Alerts**: Colored left border (4px), matching bg tint
- **Badge**: Absolute positioned on icons for counts

### Progress Indicators
- **Loading**: Indeterminate circular spinner (primary color)
- **Progress Bars**: Height h-2, rounded-full, animated fill
- **Skeleton Screens**: Pulsing gray rectangles for content loading

### AI-Specific Components
- **Match Score Display**: Circular progress with percentage (0-100%)
- **Recommendation Cards**: Avatar + name + expertise tags + match score + action button
- **Duplicate Alert**: Yellow-tinted card with side-by-side comparison
- **Acceptability Meter**: Horizontal bar with color gradient (red→yellow→green)

---

## Dashboard-Specific Layouts

### Student Dashboard
- Hero section with "Get Recommendations" primary CTA
- Quick stats: Pending approvals, Team status, Project stage
- Recent activity feed (card-based)
- Action cards grid for primary tasks

### Committee Dashboard
- KPI overview bar (total projects, pending reviews, upcoming defenses)
- Tabbed interface for different management sections
- Data tables with advanced filtering
- Analytics charts (bar/line charts for trends)

### Faculty Dashboard
- Workload summary card (supervision count, panel assignments)
- Pending requests queue
- Calendar view for defense schedule
- Student projects list with progress indicators

---

## Animations

**Minimal & Purposeful**:
- Page transitions: 200ms fade
- Modal open/close: 300ms scale + fade
- Hover effects: 150ms ease-out
- Loading states: Indeterminate spinners only
- Success confirmations: Single checkmark animation

**NO** decorative animations, parallax, or auto-playing effects

---

## Images

**Placement**:
- **NOT** using large hero images (data/utility focus)
- User avatars: 40px circular (navigation), 80px (profiles)
- Faculty profile images in recommendation cards
- Empty states: Simple illustrations (max 200px)
- File preview thumbnails in upload areas

---

## Accessibility

- WCAG AA contrast ratios (4.5:1 text, 3:1 UI)
- Focus indicators: 2px offset ring in primary color
- Keyboard navigation support throughout
- ARIA labels on icon-only buttons
- Form validation with clear error messaging
- Dark mode as default with consistent implementation