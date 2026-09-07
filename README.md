# aaronmathias.me

Personal portfolio site for Aaron Mathias, Cloud and Network Engineering professional.

Live at: [aaronmathias.me](https://aaronmathias.me)

## Overview

A single-page portfolio built to showcase professional experience, technical skills, and projects in cloud and network engineering. The site is a dark, editorial-style build with subtle animated backgrounds, smooth scroll navigation between sections, and a design language meant to feel like an engineering-focused product rather than a generic template.

## Tech stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** lucide-react
- **Fonts:** Geist Sans and Geist Mono (via next/font/google)
- **Hosting:** Netlify

## Structure

- `app/layout.tsx`: root layout, site metadata (title, description, Open Graph and Twitter card tags), global font variables, and the toast provider
- `app/page.tsx`: the entire single-page site, including all section content and sub-components
- `components/site/`: shared visual components used across the page
  - `navbar`: top navigation bar
  - `footer`: site footer
  - `network-background`: animated network topology background used in the hero section
  - `matrix-rain`: animated digital rain backdrop used in the projects section
  - `age-display`: live-updating age widget
  - `count-up`: animated number counter used for the stats row

## Sections

1. **Hero:** name, role, short intro, key stats (years of experience, uptime maintained, endpoints managed, annualized savings), and primary calls to action
2. **About:** a short summary of professional background and current focus
3. **Projects:** featured projects (including the AWS Cloud Resume Challenge, currently in progress) and a grid of other project work
4. **Experience:** work history with role, company, dates, location, and detailed bullet points
5. **Skills & Education:** grouped technical skills, certifications with status and dates, and education details
6. **Contact:** direct email and location, with a mailto call to action

## Related project

The AWS Cloud Resume Challenge referenced in the Projects section is a separate deployment, hosted on AWS (S3, Route 53, and supporting infrastructure) rather than on Netlify. It lives at [resume.aaronmathias.me](https://resume.aaronmathias.me) once deployed, and is tracked in its own repository.

## Status

Actively maintained. Content is kept in sync with the latest resume, including experience bullets, certifications, and education details.
