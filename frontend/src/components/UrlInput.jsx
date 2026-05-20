import { useState } from "react";
import "./Input.css";

export default function UrlInput({ onParse, loading }) {
  const [url, setUrl] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (url.trim()) onParse(url.trim());
  }

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <div className="input-row">
        <input
          type="text"
          className="text-input"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="btn-parse" disabled={loading || !url.trim()}>
          {loading ? <span className="spinner" /> : "Extract"}
        </button>
      </div>
      <p className="input-hint">Enter a URL — the backend will fetch and parse it with BeautifulSoup4.</p>
    </form>
  );
}
