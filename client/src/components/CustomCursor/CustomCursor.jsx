import { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const ghostRef = useRef(null)

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    if (isMobile) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx, ry = my
    let gx = mx, gy = my
    let raf

    const onMove = (e) => { mx = e.clientX; my = e.clientY }

    const lerp = (a, b, t) => a + (b - a) * t

    const tick = () => {
      // dot snaps instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`
      }
      // ring springs
      rx = lerp(rx, mx, 0.12)
      ry = lerp(ry, my, 0.12)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`
      }
      // ghost lags
      gx = lerp(gx, mx, 0.06)
      gy = lerp(gy, my, 0.06)
      if (ghostRef.current) {
        ghostRef.current.style.transform = `translate(${gx}px,${gy}px) translate(-50%,-50%)`
      }
      raf = requestAnimationFrame(tick)
    }

    const onEnter = (e) => {
      const t = e.target
      if (t.matches('a,button,[data-cursor]')) {
        dotRef.current?.classList.add('cursor-hover')
        ringRef.current?.classList.add('cursor-hover')
      }
    }
    const onLeave = () => {
      dotRef.current?.classList.remove('cursor-hover')
      ringRef.current?.classList.remove('cursor-hover')
    }
    const onDown = () => dotRef.current?.classList.add('cursor-click')
    const onUp = () => dotRef.current?.classList.remove('cursor-click')

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
    }
  }, [])

  return (
    <>
      <div ref={ghostRef} className="cursor cursor-ghost" />
      <div ref={ringRef} className="cursor cursor-ring" />
      <div ref={dotRef} className="cursor cursor-dot" />
    </>
  )
}