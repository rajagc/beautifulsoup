from flask import Flask, request, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)
CORS(app)

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
}


def parse_soup(soup):
    title = soup.find("title")
    title_text = title.get_text(strip=True) if title else ""

    meta = {}
    for tag in soup.find_all("meta"):
        name = tag.get("name") or tag.get("property", "")
        content = tag.get("content", "")
        if name and content:
            meta[name.lower()] = content

    headings = {}
    for level in range(1, 7):
        tags = soup.find_all(f"h{level}")
        texts = [t.get_text(strip=True) for t in tags if t.get_text(strip=True)]
        if texts:
            headings[f"h{level}"] = texts

    links = []
    for a in soup.find_all("a", href=True):
        text = a.get_text(strip=True)
        href = a["href"]
        if href and not href.startswith(("#", "javascript:")):
            links.append({"text": text or href, "href": href})

    images = []
    for img in soup.find_all("img"):
        images.append({
            "src": img.get("src", ""),
            "alt": img.get("alt", ""),
        })

    paragraphs = [
        p.get_text(strip=True)
        for p in soup.find_all("p")
        if p.get_text(strip=True)
    ]

    return {
        "title": title_text,
        "meta": meta,
        "headings": headings,
        "links": links[:100],
        "images": images[:50],
        "paragraphs": paragraphs[:30],
        "stats": {
            "total_links": len(soup.find_all("a", href=True)),
            "total_images": len(soup.find_all("img")),
            "total_paragraphs": len(soup.find_all("p")),
        },
    }


@app.post("/api/parse-url")
def parse_url():
    data = request.get_json(silent=True) or {}
    url = (data.get("url") or "").strip()
    if not url:
        return jsonify({"error": "url is required"}), 400
    if not url.startswith(("http://", "https://")):
        url = "https://" + url
    try:
        resp = requests.get(url, headers=HEADERS, timeout=10)
        resp.raise_for_status()
    except requests.exceptions.Timeout:
        return jsonify({"error": "Request timed out"}), 408
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 502

    soup = BeautifulSoup(resp.text, "lxml")
    return jsonify(parse_soup(soup))


@app.post("/api/parse-html")
def parse_html():
    data = request.get_json(silent=True) or {}
    html = (data.get("html") or "").strip()
    if not html:
        return jsonify({"error": "html is required"}), 400

    soup = BeautifulSoup(html, "lxml")
    return jsonify(parse_soup(soup))


if __name__ == "__main__":
    app.run(debug=True, port=5000)
