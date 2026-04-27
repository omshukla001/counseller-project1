import { useEffect, useRef, useState } from 'react'

// Counts from 0 → target when scrolled into view
export default function AnimatedCounter({ to, duration = 1800, suffix = '', formatter }) {
  const [val, setVal] = useState(0)
  const [done, setDone] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || done) return
    const el = ref.current
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      const start = performance.now()
      const ease = t => 1 - Math.pow(1 - t, 3) // easeOutCubic
      let raf
      const step = now => {
        const t = Math.min(1, (now - start) / duration)
        setVal(Math.round(ease(t) * to))
        if (t < 1) raf = requestAnimationFrame(step)
        else setDone(true)
      }
      raf = requestAnimationFrame(step)
      return () => cancelAnimationFrame(raf)
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [to, duration, done])

  const display = formatter ? formatter(val) : val.toLocaleString('en-IN')
  return <span ref={ref}>{display}{suffix}</span>
}
