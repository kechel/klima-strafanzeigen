# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains legal documents for climate-related criminal charges (Strafanzeigen) filed with German public prosecutors' offices (Staatsanwaltschaften) in 2025. The project documents legal action regarding fossil fuel promotion and climate catastrophe.

## Repository Structure

Each criminal-charge round lives in its own folder, with that round's incoming
responses nested under it in an `antworten/` subfolder (sorted by case/year, 09.06.2026):

- `2025-strafanzeige/` - First round (May 2025): core legal documents and materials
  - `2025-strafanzeige-wegen-foerderung-fossiler-brennstoffe.odt/pdf` - Core legal document
  - `2025-strafanzeige-serienbrief.odt/pdf` - Mail merge version
  - `staatsanwaltschaften.csv` / `.ods` / `libreoffice-staatsanwaltschaften.odb` - Prosecutor database
  - Visualization materials (PNG/XCF files) showing CO2 cycles
  - `antworten/` - Responses to this round, organized by city/region
    - `20250722-antwort-an-alle/` - Mass response to all offices
    - `vorlagen/` - Templates for responses

- `2025-strafanzeige-3/` - Third round (Oct 2025, carbon-removal Serienbrief)
  - `antworten/` - Responses to this round (was top-level `antworten-3/`)

- `2026-strafanzeige/` - 2026 round, with its own `antworten/` and per-city subfolders

## Development Commands

### Publishing
- `./push-to-github.sh` - Syncs content to public GitHub repository (excludes .git and .sh files)

## File Formats

This is primarily a document-based project using:
- LibreOffice Writer (.odt) files for legal documents
- PDF exports for distribution
- CSV/ODS files for prosecutor office databases
- PNG/XCF files for visual materials

## Data Structure

The `staatsanwaltschaften.csv` contains structured data with columns:
- Name, Strasse, PLZ, Ort, Email, Bundesland

This data is used for mail merge operations to send legal documents to multiple prosecutor offices across Germany.

## Working with Documents

When editing legal documents, maintain the formal structure and legal terminology. The documents reference climate science and legal frameworks around fossil fuel promotion and environmental crimes.