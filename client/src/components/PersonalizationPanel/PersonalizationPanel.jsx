import './PersonalizationPanel.css';

export default function PersonalizationPanel({
  input,
  roleOptions,
  companyTypeOptions,
  activeMeta,
  loading,
  onFieldChange,
  onGenerate,
  onReset,
  onCopyLink,
}) {
  return (
    <section id="personalize" className="personalize">
      <div className="container">
        <div className="personalize__shell">
          <div className="personalize__intro">
            <div className="section-label">Recruiter Mode</div>
            <h2 className="section-title">
              Tailor This <span className="gradient-text">Portfolio</span>
            </h2>
            <p className="section-subtitle">
              Pick a role, paste a job description, and the portfolio will reorder its strongest evidence for that recruiter.
            </p>

            <div className="personalize__status">
              <div className="personalize__status-label">Current view</div>
              <div className="personalize__status-value">
                {activeMeta.personalized ? activeMeta.recruiterLabel : 'Default portfolio'}
              </div>
              <div className="personalize__status-meta">
                {activeMeta.personalized
                  ? `Source: ${activeMeta.source}${activeMeta.sessionId ? ` · session ${activeMeta.sessionId}` : ''}`
                  : 'No recruiter-specific filters are active yet.'}
              </div>
            </div>
          </div>

          <form className="personalize__form" onSubmit={onGenerate}>
            <div className="personalize__grid">
              <label className="personalize__field">
                <span>Target role</span>
                <select
                  name="roleTarget"
                  value={input.roleTarget}
                  onChange={onFieldChange}
                >
                  {roleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="personalize__field">
                <span>Company type</span>
                <select
                  name="companyType"
                  value={input.companyType}
                  onChange={onFieldChange}
                >
                  {companyTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="personalize__field">
                <span>Recruiter name</span>
                <input
                  name="recruiterName"
                  value={input.recruiterName}
                  onChange={onFieldChange}
                  placeholder="Optional"
                />
              </label>

              <label className="personalize__field">
                <span>Company</span>
                <input
                  name="companyName"
                  value={input.companyName}
                  onChange={onFieldChange}
                  placeholder="Acme Labs"
                />
              </label>

              <label className="personalize__field personalize__field--wide">
                <span>Job title</span>
                <input
                  name="jobTitle"
                  value={input.jobTitle}
                  onChange={onFieldChange}
                  placeholder="Frontend Engineer"
                />
              </label>

              <label className="personalize__field personalize__field--wide">
                <span>Job description</span>
                <textarea
                  name="jobDescription"
                  value={input.jobDescription}
                  onChange={onFieldChange}
                  rows="5"
                  placeholder="Paste the job description here to rewrite the hero summary, project order, and CTA."
                />
              </label>
            </div>

            <div className="personalize__actions">
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? 'Tailoring portfolio...' : 'Generate recruiter view'}
              </button>
              <button type="button" className="btn btn-ghost btn-lg" onClick={onCopyLink}>
                Copy share link
              </button>
              <button type="button" className="btn btn-ghost btn-lg" onClick={onReset}>
                Reset view
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
