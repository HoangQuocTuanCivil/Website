'use client'

import { useEffect, useRef } from 'react'

const badges = [
  { label: '🌐 Digital Twin', className: 'hf-1' },
  { label: '🤖 AI / ML', className: 'hf-2' },
  { label: '📡 IoT', className: 'hf-3' },
  { label: '☁️ Cloud', className: 'hf-4' },
  { label: '⚡ Automation', className: 'hf-5' },
  { label: '🥽 VR / AR', className: 'hf-6' },
  { label: '🔢 Số hóa', className: 'hf-7' },
  { label: '🔍 LiDAR', className: 'hf-8' },
  { label: '🌉 BIM', className: 'hf-9' },
  { label: '📊 Data', className: 'hf-10' },
]

export default function HeroFloatingBadges() {
  const heroRef = useRef(null)
  const statesRef = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current?.parentElement
    if (!hero) return

    const badgeEls = heroRef.current.querySelectorAll('.hero-float')
    if (!badgeEls.length) return

    function randTarget(W, H, bW, bH) {
      return {
        x: Math.random() * Math.max(10, W - bW - 10) + 5,
        y: Math.random() * Math.max(10, H - bH - 130) + 120,
      }
    }

    function init() {
      const W = hero.offsetWidth
      const H = hero.offsetHeight
      statesRef.current = Array.from(badgeEls).map((el) => {
        const bW = el.offsetWidth || 220
        const bH = el.offsetHeight || 60
        const p = randTarget(W, H, bW, bH)
        const t = randTarget(W, H, bW, bH)
        el.style.left = p.x + 'px'
        el.style.top = p.y + 'px'
        el.style.right = 'auto'
        el.style.bottom = 'auto'
        return { el, x: p.x, y: p.y, tx: t.x, ty: t.y, bW, bH, spd: 0.004 + Math.random() * 0.005 }
      })
    }

    function tick() {
      const W = hero.offsetWidth
      const H = hero.offsetHeight
      statesRef.current.forEach((s) => {
        const dx = s.tx - s.x
        const dy = s.ty - s.y
        if (Math.sqrt(dx * dx + dy * dy) < 25) {
          const p = randTarget(W, H, s.bW, s.bH)
          s.tx = p.x
          s.ty = p.y
        }
        s.x += dx * s.spd
        s.y += dy * s.spd
        s.el.style.left = s.x + 'px'
        s.el.style.top = s.y + 'px'
      })
      rafRef.current = requestAnimationFrame(tick)
    }

    const timeout = setTimeout(() => {
      init()
      tick()
    }, 120)

    const handleResize = () => setTimeout(init, 200)
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timeout)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div ref={heroRef}>
      {badges.map((b) => (
        <div key={b.className} className={`hero-float ${b.className}`}>
          {b.label}
        </div>
      ))}
    </div>
  )
}
