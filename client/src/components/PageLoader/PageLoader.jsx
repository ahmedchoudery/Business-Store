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
            <svg width="52" height="52" viewBox="0 0 512 512" fill="none">
              <defs>
                <linearGradient id="ldBlue" x1="256" y1="32" x2="256" y2="480" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7DD3FC"/>
                  <stop offset="50%" stopColor="#38BDF8"/>
                  <stop offset="100%" stopColor="#0369A1"/>
                </linearGradient>
                <linearGradient id="ldGold" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FCD34D"/>
                  <stop offset="100%" stopColor="#F59E0B"/>
                </linearGradient>
                <mask id="ldMask">
                  <rect width="512" height="512" fill="white"/>
                  <polygon points="256,164 206,288 306,288" fill="black"/>
                </mask>
              </defs>
              <g mask="url(#ldMask)">
                <path d="M 256 42 Q 260 42 262 46 L 428 450 Q 432 458 425 464 L 369 464 Q 363 464 360 458 L 324 378 L 188 378 L 152 458 Q 149 464 143 464 L 87 464 Q 80 458 84 450 L 250 46 Q 252 42 256 42 Z" fill="url(#ldBlue)"/>
              </g>
              <g strokeLinecap="round" strokeLinejoin="round" fill="none">
                <polyline points="245,204 221,240 245,276" stroke="#FBBF24" strokeWidth="13"/>
                <polyline points="267,204 291,240 267,276" stroke="#FBBF24" strokeWidth="13"/>
              </g>
              <rect x="174" y="340" width="164" height="16" rx="8" fill="url(#ldGold)"/>
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