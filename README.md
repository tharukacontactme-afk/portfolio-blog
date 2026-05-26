# Portfolio Blog

A professional portfolio and blog built with React, TypeScript, Vite, Tailwind CSS, and markdown articles.

## Features

- **Home** — Hero introduction and featured articles
- **About** — Bio, skills, and contact details
- **Articles** — Listing and individual article pages rendered from markdown
- **Markdown content** — Add articles as `.md` files with YAML frontmatter

## Getting started

```bash
cd portfolio-blog
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Adding an article

Create a new file in `src/content/articles/`:

```md
---
title: Your Article Title
slug: your-article-slug
date: 2026-05-22
excerpt: A short summary for cards and SEO.
tags:
  - Topic
readingTime: 5 min read
---

Your markdown content here.
```

The `slug` must be unique and match the URL path `/articles/your-article-slug`.

## Customization

- Edit `src/data/profile.ts` for your name, bio, skills, and links
- Adjust colors and fonts in `src/index.css` (`@theme` block)
- Update fonts in `index.html` if desired

## Build for production

```bash
npm run build
npm run preview
```

## Tech stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [gray-matter](https://github.com/jonschlinkert/gray-matter) + [react-markdown](https://github.com/remarkjs/react-markdown)
