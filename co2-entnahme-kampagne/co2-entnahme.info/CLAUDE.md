# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML website focused on carbon removal and budget transparency (CO₂-Entnahme/Carbon-Removal) in German. The site presents information about Germany's climate responsibilities, carbon removal costs, and budget law requirements.

## Architecture & Structure

- **Single-page application**: All content is in `index.html` with embedded CSS
- **Static hosting**: No build process or dependencies required
- **Attachments**: PDF documents stored in `/attachments/` directory
- **Responsive design**: Mobile-first CSS with breakpoints at 768px and 480px

## Key Components

- **Main content sections**: Legal foundations, budget law, criminal law implications
- **Interactive elements**: Tables with cost calculations, formula boxes
- **Document references**: Links to legal documents and scientific papers in attachments
- **Video recommendations**: External YouTube links for background context

## Development Commands

No build process required - this is pure HTML/CSS. To view locally:
```bash
open index.html
# or serve with any static web server
python -m http.server 8000  # Python 3
# then visit http://localhost:8000
```

## Content Guidelines

- All content is in German
- Focus on legal and scientific accuracy regarding climate policy
- PDF attachments provide supporting documentation
- Maintain professional tone appropriate for government/legal context
- Ensure mobile responsiveness when making changes

## File Organization

- `index.html` - Main website content with embedded styles
- `attachments/` - Supporting PDF documents (legal texts, scientific studies)
- `Greenhouse-gas-missions-reduction-pathways-to-achieve-net-zero.jpg` - Background image

## CSS Architecture

Styles are embedded in `<style>` tags within index.html:
- Reset styles and typography using system fonts
- Grid layouts for statistics and comparisons
- Color scheme: Professional blues (#2c3e50, #007bff) with warning colors for emphasis
- Multiple responsive breakpoints for mobile optimization