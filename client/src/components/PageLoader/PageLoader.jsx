import { useState, useEffect } from 'react'
import './PageLoader.css'

const LINES = [
  '> initializing Ahmed Code Studio...',
  '> loading modules [react, three, motion]',
  '> mounting components...',
  '> ready.',
]

export default function PageLoader({ children }) {
  const [done, setDone] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (done) return

    const line = LINES[lineIdx] || ''
    if (charIdx < line.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), 18)
      return () => clearTimeout(t)
    }
    if (lineIdx < LINES.length - 1) {
      const t = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0) }, 180)
      return () => clearTimeout(t)
    }
    // All lines typed
    const t = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setDone(true)
        setTimeout(() => setHidden(true), 650)
      }, 400)
    }, 300)
    return () => clearTimeout(t)
  }, [charIdx, lineIdx, done])

  // Progress bar advances with line index
  useEffect(() => {
    setProgress(Math.round((lineIdx / LINES.length) * 90))
  }, [lineIdx])

  if (hidden) return children

  return (
    <>
      <div className={`loader-overlay${done ? ' loader-exit' : ''}`}>
        <div className="loader-content">
          {/* Logo mark */}
          <div className="loader-logo">
            <svg width="52" height="52" viewBox="0 0 100 100">
              <rect width="100" height="100" rx="18" fill="rgba(56,189,248,0.08)" stroke="rgba(56,189,248,0.2)" strokeWidth="1.5" />
              <line x1="14" y1="85" x2="50" y2="14" stroke="#38BDF8" strokeWidth="8" strokeLinecap="round" />
              <line x1="86" y1="85" x2="50" y2="14" stroke="#38BDF8" strokeWidth="8" strokeLinecap="round" />
              <circle cx="50" cy="14" r="5.5" fill="#FBBF24" />
              <line x1="28" y1="68" x2="72" y2="50" stroke="#FBBF24" strokeWidth="7" strokeLinecap="round" />
            </svg>
          </div>

          {/* Terminal window */}
          <div className="loader-terminal">
            <div className="loader-terminal-bar">
              <span className="loader-dot" style={{ background: '#F43F5E' }} />
              <span className="loader-dot" style={{ background: '#FBBF24' }} />
              <span className="loader-dot" style={{ background: '#10B981' }} />
              <span className="loader-terminal-title">ahmed_code_studio — boot</span>
            </div>
            <div className="loader-terminal-body">
              {LINES.slice(0, lineIdx).map((l, i) => (
                <div key={i} className="loader-line loader-line-done">{l}</div>
              ))}
              <div className="loader-line">
                {(LINES[lineIdx] || '').slice(0, charIdx)}
                <span className="loader-cursor">_</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="loader-progress-track">
            <div className="loader-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="loader-brand">AHMED CODE STUDIO</div>
        </div>
      </div>
      {children}
    </>
  )
}