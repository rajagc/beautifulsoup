import { useState } from "react";
import UrlInput from "./components/UrlInput";
import HtmlInput from "./components/HtmlInput";
import ResultsDisplay from "./components/ResultsDisplay";
import "./App.css";

export default function App() {
  const [tab, setTab] = useState("url");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleParse(endpoint, body) {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Unknown error");
      setResult(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <h1>
            <span className="logo">🍜</span> BeautifulSoup4 Extractor
          </h1>
          <p className="subtitle">Parse any URL or raw HTML using Python's BeautifulSoup4</p>
        </div>
      </header>

      <main className="app-main">
        <div className="card input-card">
          <div className="tabs">
            <button
              className={tab === "url" ? "tab active" : "tab"}
              onClick={() => { setTab("url"); setResult(null); setError(""); }}
            >
              Parse URL
            </button>
            <button
              className={tab === "html" ? "tab active" : "tab"}
              onClick={() => { setTab("html"); setResult(null); setError(""); }}
            >
              Paste HTML
            </button>
          </div>

          {tab === "url" ? (
            <UrlInput onParse={(url) => handleParse("/api/parse-url", { url })} loading={loading} />
          ) : (
            <HtmlInput onParse={(html) => handleParse("/api/parse-html", { html })} loading={loading} />
          )}

          {error && <div className="error-banner">Error: {error}</div>}
        </div>

        {result && <ResultsDisplay data={result} />}
      </main>
    </div>
  );
}
