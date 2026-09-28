import { useRef, useState } from "react"

export default function PrivacyIllustration() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setOffset({
      x: ((e.clientX - cx) / rect.width) * 16,
      y: ((e.clientY - cy) / rect.height) * 10,
    })
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "pointer" }}
      className="relative w-full max-w-2xl mx-auto select-none"
      style={{ overflow: "hidden" }}
    >
      <div
      style={{
          background: "linear-gradient(180deg, var(--card) 0%, var(--muted) 100%)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: "0.85rem 0.7rem",
          maxWidth: "100%",
          overflow: "hidden",
          transform: "none",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(181,122,74,0.08)",
        }}
      >
        <svg viewBox="0 0 560 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          {/* Room cards */}
          <rect x="20" y="20" width="150" height="90" rx="12" fill="#1c1c28" stroke="#232330" strokeWidth="1" />
          <rect x="20" y="20" width="150" height="28" rx="12" fill="#232330" />
          <rect x="20" y="36" width="150" height="12" rx="0" fill="#232330" />
          <circle cx="36" cy="34" r="6" fill="#b57a4a" />
          <text x="47" y="38" fill="#a0a0b8" fontSize="9" fontFamily="Inter, sans-serif"># general</text>
          <rect x="32" y="58" width="90" height="8" rx="4" fill="#232330" />
          <rect x="32" y="72" width="70" height="8" rx="4" fill="#232330" />
          <rect x="32" y="86" width="80" height="8" rx="4" fill="#232330" />
          <rect x="134" y="58" width="24" height="24" rx="6" fill="#b57a4a" opacity="0.2" />
          <text x="140" y="74" fill="#b57a4a" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="600">3</text>

          {/* Lock icon on private room */}
          <rect x="20" y="130" width="150" height="90" rx="12" fill="#1c1c28" stroke="#232330" strokeWidth="1" />
          <rect x="20" y="130" width="150" height="28" rx="12" fill="#232330" />
          <rect x="20" y="146" width="150" height="12" rx="0" fill="#232330" />
          <circle cx="36" cy="144" r="6" fill="#f59e0b" />
          <text x="47" y="148" fill="#a0a0b8" fontSize="9" fontFamily="Inter, sans-serif"># engineering</text>
          {/* lock */}
          <rect x="151" y="133" width="14" height="11" rx="2" fill="#f59e0b" opacity="0.8" />
          <path d="M154 133 v-3 a4 4 0 0 1 8 0 v3" stroke="#f59e0b" strokeWidth="1.5" fill="none" opacity="0.8" />
          <rect x="32" y="168" width="90" height="8" rx="4" fill="#232330" />
          <rect x="32" y="182" width="60" height="8" rx="4" fill="#232330" />
          <rect x="32" y="196" width="76" height="8" rx="4" fill="#232330" />

          {/* Active chat area */}
          <rect x="200" y="20" width="340" height="220" rx="16" fill="#13131a" stroke="#232330" strokeWidth="1" />
          {/* Chat header */}
          <rect x="200" y="20" width="340" height="44" rx="16" fill="#1c1c28" />
          <rect x="200" y="48" width="340" height="16" rx="0" fill="#1c1c28" />
          <circle cx="228" cy="42" r="8" fill="#b57a4a" />
          <text x="242" y="46" fill="#f0f0f8" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="600"># general</text>
          <circle cx="520" cy="42" r="5" fill="#10b981" />

          {/* Messages */}
          <circle cx="220" cy="90" r="10" fill="#06b6d4" />
          <text x="215" y="94" fill="#fff" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="700">MW</text>
          <rect x="236" y="80" width="160" height="26" rx="8" fill="#1c1c28" />
          <text x="244" y="90" fill="#a0a0b8" fontSize="7" fontFamily="Inter, sans-serif">Marcus Webb · 9:08 AM</text>
          <text x="244" y="101" fill="#e8e8f0" fontSize="8.5" fontFamily="Inter, sans-serif">Pretty good! Went hiking up in</text>
          <text x="244" y="112" fill="#e8e8f0" fontSize="8.5" fontFamily="Inter, sans-serif">the mountains this weekend.</text>

          <circle cx="220" cy="140" r="10" fill="#f59e0b" />
          <text x="217" y="144" fill="#fff" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="700">PN</text>
          <rect x="236" y="130" width="180" height="26" rx="8" fill="#1c1c28" />
          <text x="244" y="140" fill="#a0a0b8" fontSize="7" fontFamily="Inter, sans-serif">Priya Nair · 9:14 AM</text>
          <text x="244" y="151" fill="#e8e8f0" fontSize="8.5" fontFamily="Inter, sans-serif">Sounds amazing! I spent mine reading</text>
          <text x="244" y="162" fill="#e8e8f0" fontSize="8.5" fontFamily="Inter, sans-serif">The Midnight Library.</text>

          {/* Own message right-aligned */}
          <rect x="340" y="185" width="170" height="26" rx="8" fill="#b57a4a" opacity="0.9" />
          <text x="348" y="195" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="Inter, sans-serif">You · 9:21 AM</text>
          <text x="348" y="206" fill="#fff" fontSize="8.5" fontFamily="Inter, sans-serif">I loved that book too! The</text>

          {/* Message input */}
          <rect x="212" y="223" width="316" height="10" rx="5" fill="#232330" />
          <text x="222" y="231" fill="#6b6b80" fontSize="7" fontFamily="Inter, sans-serif">Type a message...</text>
          <circle cx="516" cy="228" r="6" fill="#b57a4a" />
          <path d="M513 228 l5 0 M516 225 l0 6" stroke="#fff" strokeWidth="1.2" />
        </svg>

        <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
          <div
            style={{
              background: "rgba(181,122,74,0.12)",
              border: "1px solid rgba(181,122,74,0.25)",
              borderRadius: 8,
              padding: "6px 14px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="#d2b48c" strokeWidth="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#d2b48c" strokeWidth="2" />
            </svg>
            <span style={{ color: "#d2b48c", fontSize: 12, fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
              End-to-end encrypted
            </span>
          </div>
          <div
            style={{
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.2)",
              borderRadius: 8,
              padding: "6px 14px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#10b981" strokeWidth="2" />
              <path d="M8 12l3 3 5-5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span style={{ color: "#10b981", fontSize: 12, fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
              Private rooms supported
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
