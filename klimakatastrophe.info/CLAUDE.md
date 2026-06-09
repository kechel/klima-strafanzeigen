# CLAUDE.md - Guidance for klimakatastrophe.info

## Project Structure
- Static HTML website about climate issues
- No build system - direct HTML/CSS editing
- Pages are organized by topic (individual HTML files)

## Commands
- No build/test/lint commands - static HTML site
- To serve locally: `python3 -m http.server` (if needed)

## Code Style Guidelines
- HTML: Use UTF-8 encoding with HTML5 doctype
- CSS: Keep styling in style.css and inline for page-specific styles
- Formatting: 
  - 2-space indentation
  - Include viewport meta tag for responsive design
  - Use semantic HTML elements

## Design Patterns
- Use simple-grid.min.css for layout
- Use "wasist" class for content blocks
- Navigation by direct links between pages
- Images stored in bilder/ directory
- Documents stored in downloads/ directory

## Naming Conventions
- File names: all lowercase with hyphens as separators
- Class names: camelCase (e.g., "wasist")
- Use German language in content