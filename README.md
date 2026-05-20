# BeautifulSoup4 HTML Extractor

A full-stack web app that lets you extract structured data from any URL or raw HTML using Python's [BeautifulSoup4](https://pypi.org/project/beautifulsoup4/) library.

---

## Overview

Paste a URL or raw HTML into the browser, hit **Extract**, and instantly get back:

- Page title
- Meta tags (description, keywords, Open Graph, etc.)
- Headings (H1–H6)
- Paragraphs
- Links (text + href)
- Images (src + alt)
- Summary stats (total links, images, paragraphs)

The React frontend talks to a Flask backend which uses BeautifulSoup4 with the `lxml` parser to do the heavy lifting.

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, Vite 6                    |
| Backend   | Python 3.12, Flask 3.1              |
| Parsing   | BeautifulSoup4 4.12, lxml 5.3       |
| HTTP      | requests 2.32                       |
| CORS      | Flask-CORS 5.0                      |

---

## Project Structure

```
beautifulsoup/
├── backend/
│   ├── app.py              # Flask API (parse-url & parse-html endpoints)
│   └── requirements.txt    # Python dependencies
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js       # Vite dev server + /api proxy to Flask
    └── src/
        ├── main.jsx
        ├── App.jsx / App.css
        ├── index.css
        └── components/
            ├── UrlInput.jsx
            ├── HtmlInput.jsx
            ├── ResultsDisplay.jsx
            └── Input.css / ResultsDisplay.css
```

---

## Prerequisites

- **Python 3.10+** — [python.org/downloads](https://www.python.org/downloads/)
- **Node.js 18+** — [nodejs.org](https://nodejs.org/) (LTS recommended)

---

## Installation & Running

### 1. Clone the repository

```bash
git clone https://github.com/rajagc/beautifulsoup.git
cd beautifulsoup
```

### 2. Start the backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The Flask server starts on **http://localhost:5000**.

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server starts on **http://localhost:3000**.

### 4. Open the app

Navigate to **http://localhost:3000** in your browser.

> The Vite dev server automatically proxies all `/api/*` requests to the Flask backend, so no extra config is needed.

---

## API Reference

### `POST /api/parse-url`

Fetches a URL and returns parsed HTML content.

**Request body:**
```json
{ "url": "https://example.com" }
```

### `POST /api/parse-html`

Parses raw HTML and returns structured data.

**Request body:**
```json
{ "html": "<html>...</html>" }
```

**Both endpoints return:**
```json
{
  "title": "Page Title",
  "meta": { "description": "...", "keywords": "..." },
  "headings": { "h1": ["..."], "h2": ["..."] },
  "links": [{ "text": "...", "href": "..." }],
  "images": [{ "src": "...", "alt": "..." }],
  "paragraphs": ["..."],
  "stats": {
    "total_links": 10,
    "total_images": 3,
    "total_paragraphs": 8
  }
}
```
