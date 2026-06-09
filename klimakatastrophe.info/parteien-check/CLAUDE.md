# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Static HTML political analysis website comparing German party promises vs. real-world impact. Single-page application analyzing 2025 election programs with focus on climate policy's systemic effects on all policy areas.

## Commands
No build system or package manager - pure static HTML/CSS/JS:
- **Local development**: Open `index.html` directly in browser or use `python3 -m http.server` for HTTP serving
- **No build/test/lint commands** - all changes are immediate
- **Deployment**: Upload files directly to web server

## Architecture

### File Structure
```
/
├── index.html    - Single-page application with all content sections
├── styles.css    - Centralized styling with CSS custom properties
├── script.js     - Progressive enhancement JavaScript
└── README.md     - Documentation and usage instructions
```

### HTML Architecture
- **Semantic structure**: Header → Sidebar navigation → Main content sections
- **Section-based**: Each analysis topic is a `<section id="...">` for navigation
- **Component patterns**:
  - `.party-card` - Reusable party overview cards with discrepancy displays
  - `.info-box` - Contextual information blocks (warning, success, info types)
  - Table structures for detailed comparisons
- **Navigation**: Sticky sidebar table of contents with smooth scroll anchors
- **Responsive layout**: CSS Grid for desktop, stacked for mobile

### CSS System
- **CSS Custom Properties**: Centralized design tokens in `:root`
  - Color palette: `--color-primary`, `--color-accent`, etc.
  - Typography: `--font-sans` (Inter), `--font-serif` (Merriweather)  
  - Spacing: `--spacing-unit` (8px) based calculations
  - Layout: `--max-width`, `--sidebar-width`
- **Component-based classes**: `.party-card`, `.discrepancy-bar`, `.info-box`
- **External dependencies**: Google Fonts (Inter, Merriweather), Font Awesome 6.4.0

### JavaScript Functionality  
- **Progressive enhancement**: Site works without JS, JS adds smooth interactions
- **Smooth scrolling**: Navigation between sections
- **Active navigation**: Highlights current section in TOC based on scroll position
- **Animated discrepancy bars**: Uses Intersection Observer for scroll-triggered animations
- **DOM-ready initialization**: All functionality initializes on `DOMContentLoaded`

### Data Model
- **Discrepancy system**: 0-100% scale measuring promise vs. reality gap
  - 0-20% = High coherence (green)
  - 21-50% = Medium coherence (yellow)  
  - 51-100% = Low coherence (red)
- **Party classification**: Based on systemic policy impact rather than traditional left/right spectrum
- **Content language**: German (audience: German voters)

## Development Guidelines

### Content Updates
- **Party data**: Update discrepancy values in both overview cards and detailed tables
- **New parties**: Add corresponding `.party-badge.new-party` CSS class
- **Section expansion**: New sections require navigation links in sidebar TOC

### Styling Conventions
- **Color changes**: Modify CSS custom properties in `:root` 
- **Spacing**: Use `calc(var(--spacing-unit) * N)` for consistent spacing
- **Typography**: Sans-serif (Inter) for UI, serif (Merriweather) for headings
- **Component consistency**: Follow existing `.party-card`, `.info-box` patterns

### Browser Compatibility
- **Modern features**: CSS Grid, CSS Custom Properties, Intersection Observer
- **Fallbacks**: Basic layout works in older browsers, animations degrade gracefully
- **Testing**: Chrome/Edge, Firefox, Safari, mobile browsers (iOS/Android)

## Content Context
Political analysis site examining how climate policy incompetence undermines all other party promises. Uses scientific sources (IPCC, IOM, official party programs) to measure systemic policy coherence rather than rhetorical positions.