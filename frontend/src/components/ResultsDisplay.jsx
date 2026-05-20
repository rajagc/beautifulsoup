import "./ResultsDisplay.css";

function StatBadge({ label, value }) {
  return (
    <div className="stat-badge">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function Section({ title, children, count }) {
  if (!children) return null;
  return (
    <div className="section">
      <h3 className="section-title">
        {title}
        {count !== undefined && <span className="section-count">{count}</span>}
      </h3>
      <div className="section-body">{children}</div>
    </div>
  );
}

export default function ResultsDisplay({ data }) {
  const { title, meta, headings, links, images, paragraphs, stats } = data;

  return (
    <div className="results">
      <div className="results-header">
        <h2 className="results-title">{title || <em>No title found</em>}</h2>
        <div className="stats-row">
          <StatBadge label="Links" value={stats.total_links} />
          <StatBadge label="Images" value={stats.total_images} />
          <StatBadge label="Paragraphs" value={stats.total_paragraphs} />
        </div>
      </div>

      {Object.keys(meta).length > 0 && (
        <Section title="Meta Tags" count={Object.keys(meta).length}>
          <div className="meta-grid">
            {Object.entries(meta).map(([k, v]) => (
              <div key={k} className="meta-row">
                <span className="meta-key">{k}</span>
                <span className="meta-val">{v}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {Object.keys(headings).length > 0 && (
        <Section title="Headings">
          {Object.entries(headings).map(([tag, texts]) => (
            <div key={tag} className="heading-group">
              <span className={`heading-tag tag-${tag}`}>{tag.toUpperCase()}</span>
              <ul className="heading-list">
                {texts.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {paragraphs.length > 0 && (
        <Section title="Paragraphs" count={stats.total_paragraphs}>
          <ul className="paragraph-list">
            {paragraphs.map((p, i) => (
              <li key={i} className="paragraph-item">{p}</li>
            ))}
          </ul>
        </Section>
      )}

      {links.length > 0 && (
        <Section title="Links" count={stats.total_links}>
          <div className="links-table">
            {links.map((l, i) => (
              <div key={i} className="link-row">
                <span className="link-text">{l.text}</span>
                <a href={l.href} target="_blank" rel="noreferrer" className="link-href">
                  {l.href}
                </a>
              </div>
            ))}
          </div>
        </Section>
      )}

      {images.length > 0 && (
        <Section title="Images" count={stats.total_images}>
          <div className="images-table">
            {images.map((img, i) => (
              <div key={i} className="image-row">
                <span className="img-alt">{img.alt || <em>no alt</em>}</span>
                <span className="img-src">{img.src}</span>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
