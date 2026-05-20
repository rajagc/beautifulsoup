import { useState } from "react";
import "./Input.css";

const SAMPLE = `<!DOCTYPE html>
<html>
<head>
  <title>Sample Page</title>
  <meta name="description" content="A sample page for testing">
</head>
<body>
  <h1>Hello BeautifulSoup4!</h1>
  <h2>Section One</h2>
  <p>This is the first paragraph of text.</p>
  <p>Another paragraph with a <a href="https://example.com">link</a>.</p>
  <img src="image.jpg" alt="Sample image">
</body>
</html>`;

export default function HtmlInput({ onParse, loading }) {
  const [html, setHtml] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (html.trim()) onParse(html.trim());
  }

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <textarea
        className="textarea-input"
        placeholder="Paste your HTML here..."
        value={html}
        onChange={(e) => setHtml(e.target.value)}
        disabled={loading}
        rows={10}
      />
      <div className="input-actions">
        <button type="button" className="btn-sample" onClick={() => setHtml(SAMPLE)} disabled={loading}>
          Load Sample
        </button>
        <button type="submit" className="btn-parse" disabled={loading || !html.trim()}>
          {loading ? <span className="spinner" /> : "Extract"}
        </button>
      </div>
    </form>
  );
}
