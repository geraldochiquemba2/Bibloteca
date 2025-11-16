# ISPTEC Library Management System - Design Guidelines

## Design Approach

**Selected System**: Material Design 3 principles adapted for institutional dashboard use
**Justification**: This is a data-heavy, utility-focused administrative system requiring clarity, efficiency, and scalability. Material Design provides excellent patterns for tables, forms, data visualization, and multi-step workflows essential for library operations.

---

## Core Design Elements

### Typography Hierarchy

**Font Family**: Inter (primary), Roboto Mono (data/numbers)
- **Display/Headers**: 32px/bold (page titles), 24px/semibold (section headers)
- **Body Text**: 16px/regular (primary content), 14px/regular (secondary info)
- **Data Tables**: 14px/medium (table headers), 14px/regular (table cells)
- **Captions/Labels**: 12px/medium (form labels), 11px/regular (metadata)
- **Buttons**: 14px/medium (all CTAs)

### Layout System

**Spacing Units**: Tailwind units of 2, 4, 6, and 8 for consistent rhythm
- Component padding: p-4 to p-6
- Section spacing: mb-6 to mb-8
- Card gaps: gap-4
- Form field spacing: space-y-4

**Grid Structure**:
- Dashboard: 12-column responsive grid
- Main content area: max-w-7xl with px-4 md:px-6 lg:px-8
- Sidebar navigation: Fixed 256px width (desktop), collapsible (mobile)
- Two-column layouts for forms: grid-cols-1 md:grid-cols-2 gap-6

---

## Component Library

### Navigation
- **Top Bar**: Full-width with institution logo (left), search bar (center), user profile + notifications (right) - h-16
- **Sidebar**: Vertical nav with icon + label items, collapsible groups for submenus, active state indicators
- **Breadcrumbs**: Hierarchical navigation for deep pages

### Data Display
- **Tables**: Striped rows, sortable columns, pagination controls, row actions (view/edit/delete), sticky headers for long lists
- **Cards**: Elevated containers (shadow-md) for dashboard widgets and book items - rounded-lg with p-6
- **Status Badges**: Small rounded pills for book availability, user status, fine alerts - px-3 py-1 text-xs
- **Stat Cards**: Large number display with label and trend indicator for dashboard metrics

### Forms & Inputs
- **Text Fields**: Outlined style with floating labels, helper text below, error states with red indicators
- **Dropdowns**: Native select enhanced with search for long lists (user types, categories)
- **Date Pickers**: Calendar overlay for loan/return dates
- **Multi-step Forms**: Progress indicator at top for book registration workflow
- **Action Buttons**: Primary (solid), Secondary (outlined), Destructive (for delete operations)

### Modals & Overlays
- **Confirmation Dialogs**: Center-aligned, max-w-md, for critical actions (delete, block user)
- **Detail Panels**: Slide-in from right for book/user details - w-96 or w-1/3
- **Toast Notifications**: Top-right positioned for success/error feedback - auto-dismiss after 4s

### Specialized Components
- **Book Catalog Grid**: Card-based layout with thumbnail, title, author, availability badge - grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- **Loan Timeline**: Vertical timeline showing loan history with dates and status
- **Fine Calculator**: Real-time display showing days overdue × 500 Kz with total
- **Reservation Queue**: Numbered list with user avatars and position indicators
- **OCR Upload Zone**: Dashed border dropzone with camera icon and upload instructions

---

## Page-Specific Layouts

### Dashboard (Home)
- Top row: 4 stat cards (Total Books, Active Loans, Pending Fines, Reservations) - grid-cols-4
- Middle: Two-column layout - Most Borrowed Books chart (left 2/3) + Recent Activity feed (right 1/3)
- Bottom: Upcoming due dates table with user name, book title, days remaining

### Book Catalog
- Search bar with advanced filters (category, author, availability, label type) - full-width sticky header
- Results grid with filtering sidebar (left 240px) + card grid (remaining space)
- Each card: Book cover placeholder, title, author, ISBN, label indicator, availability status, action buttons

### Loan Management
- Tab navigation: Active Loans | Returns | Overdue
- Table view with columns: User Name, Book Title, Loan Date, Due Date, Status, Actions
- Quick actions row above table: Scan barcode, Manual entry, Bulk operations

### User Profile Page
- Two-column: User info card (left 1/3) + Loan history + Fines (right 2/3)
- Alert banner if fines > 2000 Kz with payment CTA
- Current loans expandable list with renewal options

### Reports & Analytics
- Date range selector at top
- Tabbed sections for different report types
- Mix of charts (bar, line, pie) and data tables
- Export button (PDF/Excel) positioned top-right

---

## Images

**No hero images** - This is a utility dashboard application. All imagery is functional:
- Book cover placeholders: Use generic book icon or actual cover images when available
- User avatars: Initials in circular containers when no photo
- Empty states: Simple illustrations for "No books found", "No loans active"
- Institution logo in top navigation bar

---

## Key UX Patterns

- **Instant Feedback**: Loading spinners for async operations, success/error toasts for all actions
- **Inline Validation**: Real-time error messages on forms (e.g., "User limit exceeded")
- **Smart Defaults**: Pre-fill return dates based on user type + book label
- **Contextual Actions**: Row-level actions in tables, quick-access buttons for frequent tasks
- **Progressive Disclosure**: Expandable sections for detailed info, collapsed by default
- **Search Everything**: Global search in top bar + filtered search within each module