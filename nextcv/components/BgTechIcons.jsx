export default function BgTechIcons() {
  return (
    <div className="bg-tech-icons" aria-hidden="true">
      {/* bh-1: Concentric circles with cross lines (spinning) */}
      <svg className="bg-hud bg-hud--spin bh-1" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      </svg>

      {/* bh-2: Gear/cog outline */}
      <svg className="bg-hud bh-2" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
        <path d="M50 5 L53 20 L47 20Z" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        <path d="M50 95 L53 80 L47 80Z" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        <path d="M5 50 L20 53 L20 47Z" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        <path d="M95 50 L80 53 L80 47Z" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        <path d="M18 18 L30 28 L28 30Z" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        <path d="M82 82 L70 72 L72 70Z" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        <path d="M82 18 L72 28 L70 30Z" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        <path d="M18 82 L28 72 L30 70Z" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
      </svg>

      {/* bh-3: Waveform/signal line */}
      <svg className="bg-hud bh-3" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline
          points="0,30 10,30 15,10 20,50 25,20 30,40 35,15 40,45 45,25 50,35 55,10 60,50 65,20 70,40 75,30 80,30 85,15 90,45 95,25 100,35 105,20 110,40 120,30"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.2"
        />
      </svg>

      {/* bh-4: Crosshair/target */}
      <svg className="bg-hud bh-4" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <circle cx="50" cy="50" r="4" fill="currentColor" opacity="0.15" />
        <line x1="50" y1="10" x2="50" y2="35" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        <line x1="50" y1="65" x2="50" y2="90" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        <line x1="10" y1="50" x2="35" y2="50" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        <line x1="65" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
      </svg>

      {/* bh-5: Network/nodes with connecting lines */}
      <svg className="bg-hud bh-5" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="20" r="4" fill="currentColor" opacity="0.2" />
        <circle cx="20" cy="50" r="4" fill="currentColor" opacity="0.2" />
        <circle cx="80" cy="50" r="4" fill="currentColor" opacity="0.2" />
        <circle cx="35" cy="80" r="4" fill="currentColor" opacity="0.2" />
        <circle cx="65" cy="80" r="4" fill="currentColor" opacity="0.2" />
        <line x1="50" y1="20" x2="20" y2="50" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
        <line x1="50" y1="20" x2="80" y2="50" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
        <line x1="20" y1="50" x2="35" y2="80" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
        <line x1="80" y1="50" x2="65" y2="80" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
        <line x1="35" y1="80" x2="65" y2="80" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
        <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="0.8" opacity="0.1" />
      </svg>

      {/* bh-6: Triangle/pyramid */}
      <svg className="bg-hud bh-6" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,10 10,90 90,90" stroke="currentColor" strokeWidth="1" opacity="0.2" fill="none" />
        <polygon points="50,35 30,75 70,75" stroke="currentColor" strokeWidth="0.8" opacity="0.15" fill="none" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      </svg>

      {/* bh-7: Bar chart */}
      <svg className="bg-hud bh-7" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="50" width="12" height="25" fill="currentColor" opacity="0.15" rx="1" />
        <rect x="28" y="30" width="12" height="45" fill="currentColor" opacity="0.18" rx="1" />
        <rect x="46" y="15" width="12" height="60" fill="currentColor" opacity="0.2" rx="1" />
        <rect x="64" y="35" width="12" height="40" fill="currentColor" opacity="0.17" rx="1" />
        <rect x="82" y="20" width="12" height="55" fill="currentColor" opacity="0.19" rx="1" />
        <line x1="5" y1="75" x2="98" y2="75" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
      </svg>

      {/* bh-8: Hexagon with inner hexagon (spinning) */}
      <svg className="bg-hud bg-hud--spin bh-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.25"
          fill="none"
        />
        <polygon
          points="50,25 72,37.5 72,62.5 50,75 28,62.5 28,37.5"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.18"
          fill="none"
        />
      </svg>

      {/* bh-9: Circuit/PCB traces */}
      <svg className="bg-hud bh-9" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 50 H30 V20 H60 V50 H80" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <path d="M20 80 H45 V60 H75 V40" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
        <circle cx="30" cy="20" r="3" fill="currentColor" opacity="0.2" />
        <circle cx="60" cy="50" r="3" fill="currentColor" opacity="0.2" />
        <circle cx="45" cy="60" r="3" fill="currentColor" opacity="0.2" />
        <circle cx="80" cy="50" r="2" fill="currentColor" opacity="0.15" />
      </svg>

      {/* bh-10: WiFi/signal arcs */}
      <svg className="bg-hud bh-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="85" r="4" fill="currentColor" opacity="0.25" />
        <path d="M35 70 A22 22 0 0 1 65 70" stroke="currentColor" strokeWidth="1.2" opacity="0.2" fill="none" strokeLinecap="round" />
        <path d="M25 55 A35 35 0 0 1 75 55" stroke="currentColor" strokeWidth="1" opacity="0.17" fill="none" strokeLinecap="round" />
        <path d="M15 40 A50 50 0 0 1 85 40" stroke="currentColor" strokeWidth="0.8" opacity="0.13" fill="none" strokeLinecap="round" />
      </svg>

      {/* bh-11: Diamond/rhombus grid */}
      <svg className="bg-hud bh-11" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,10 90,50 50,90 10,50" stroke="currentColor" strokeWidth="1" opacity="0.2" fill="none" />
        <polygon points="50,30 70,50 50,70 30,50" stroke="currentColor" strokeWidth="0.8" opacity="0.15" fill="none" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      </svg>

      {/* bh-12: Binary/data stream dots */}
      <svg className="bg-hud bh-12" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.2" />
        <circle cx="25" cy="10" r="3" fill="currentColor" opacity="0.1" />
        <circle cx="40" cy="10" r="3" fill="currentColor" opacity="0.2" />
        <circle cx="55" cy="10" r="3" fill="currentColor" opacity="0.2" />
        <circle cx="70" cy="10" r="3" fill="currentColor" opacity="0.1" />
        <circle cx="85" cy="10" r="3" fill="currentColor" opacity="0.2" />
        <circle cx="100" cy="10" r="3" fill="currentColor" opacity="0.1" />
        <circle cx="10" cy="30" r="3" fill="currentColor" opacity="0.1" />
        <circle cx="25" cy="30" r="3" fill="currentColor" opacity="0.2" />
        <circle cx="40" cy="30" r="3" fill="currentColor" opacity="0.1" />
        <circle cx="55" cy="30" r="3" fill="currentColor" opacity="0.2" />
        <circle cx="70" cy="30" r="3" fill="currentColor" opacity="0.2" />
        <circle cx="85" cy="30" r="3" fill="currentColor" opacity="0.1" />
        <circle cx="100" cy="30" r="3" fill="currentColor" opacity="0.2" />
      </svg>
    </div>
  )
}
