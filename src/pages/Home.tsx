import Logo from "../components/Logo"
import PrivacyIllustration from "../components/PrivacyIllustration"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="11" width="18" height="11" rx="2" stroke="#a78bfa" strokeWidth="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#a78bfa" strokeWidth="2" />
      </svg>
    ),
    title: "Private by default",
    desc: "Every room you create is yours. Invite-only access, zero public exposure unless you choose otherwise.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Real-time messaging",
    desc: "Messages arrive instantly. No refresh, no lag â€” just fluid, live conversation the moment you type.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="#a78bfa" strokeWidth="2" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Rooms for every team",
    desc: "Spin up rooms in seconds â€” for projects, topics, or just your inner circle. Organized, not chaotic.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Zero noise",
    desc: "No algorithm, no ads, no distracting feeds. Just the conversations you chose to be part of.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#a78bfa" strokeWidth="2" />
        <polyline points="12 6 12 12 16 14" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Persistent history",
    desc: "Every message stays right where it was. Pick up any conversation exactly where you left off.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="#a78bfa" strokeWidth="2" />
        <line x1="8" y1="21" x2="16" y2="21" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="17" x2="12" y2="21" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Works everywhere",
    desc: "Browser-first and fully responsive. Open a room on your laptop, continue on your phone â€” seamlessly.",
  },
]

const steps = [
  { step: "01", title: "Create your account", desc: "Sign up in under 30 seconds â€” no credit card, no setup friction." },
  { step: "02", title: "Open a room", desc: "Name it, set it private or public, and share the invite code with whoever you want inside." },
  { step: "03", title: "Start talking", desc: "Messages flow in real time. Search, scroll, and pick up the thread any time." },
]

const stats = [
  { value: "10k+", label: "Rooms created" },
  { value: "98%", label: "Uptime" },
  { value: "<50ms", label: "Message latency" },
  { value: "0", label: "Ads. Ever." },
]

const testimonials = [
  {
    quote: "We moved our entire design critique process into talkative. The private rooms changed how we give feedback â€” much more candid.",
    author: "Sofia Laurent",
    role: "Lead Designer, Luminary Studio",
    initials: "SL",
    color: "#ec4899",
  },
  {
    quote: "Finally a chat app that doesn't try to be everything. Rooms, messages, done. Our eng team uses it every day.",
    author: "Dev Patel",
    role: "Staff Engineer, Nimbus",
    initials: "DP",
    color: "#f97316",
  },
  {
    quote: "The privacy defaults are exactly what I needed for client work. No more worrying about accidental visibility.",
    author: "Aria Chen",
    role: "Freelance Consultant",
    initials: "AC",
    color: "#7c5cfc",
  },
]

export default function Home() {
  const navigate = useNavigate()
  const { token } = useAuth()
  const onSignup = () => navigate("/signup")
  const onLogin = () => navigate("/login")
  const onOpenApp = () => navigate("/app")
  return (
    <div className="home-page">
      <nav className="home-nav">
        <Logo size="sm" />
        <div className="home-nav-actions">
          {token ? (
            <button className="btn-primary" onClick={onOpenApp}>
              Open app
            </button>
          ) : (
            <>
              <button className="btn-ghost" onClick={onLogin}>
                Log in
              </button>
              <button className="btn-primary" onClick={onSignup}>
                Sign up
              </button>
            </>
          )}
        </div>
      </nav>

      <section className="home-hero">
        <div
          className="home-glow"
          aria-hidden
          style={{
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(ellipse, rgba(124,92,252,0.14) 0%, transparent 68%)",
          }}
        />

        <div className="home-hero-kicker">
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c5cfc", flexShrink: 0 }} />
          <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "#a78bfa" }}>Room-based chat, reimagined</span>
        </div>

        <h1>
          Talk privately.
          <br />
          <span className="home-gradient-text">In your own rooms.</span>
        </h1>

        <p className="home-lede">
          talkative gives you private, organized spaces to collaborate and connect â€” without the noise of traditional chat apps.
        </p>

        <div className="home-cta-row">
          <button className="btn-primary" onClick={onSignup}>
            Get started free
          </button>
          <button className="btn-ghost" onClick={onLogin}>
            Sign in
          </button>
        </div>

        <div className="home-trust">
          {[
            { icon: "ðŸ”’", label: "End-to-end encrypted" },
            { icon: "âš¡", label: "Real-time sync" },
            { icon: "ðŸ›¡ï¸", label: "No ads. Ever." },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: "0.875rem" }}>{item.icon}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section" style={{ paddingTop: "0.5rem" }}>
        <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, textAlign: "center", marginBottom: "1.25rem" }}>
          See it in action
        </p>
        <PrivacyIllustration />
      </section>

      <section
        className="home-section"
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          background: "var(--card)",
        }}
      >
        <div className="home-stats-grid">
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center", minWidth: 0 }}>
              <p className="home-stat-value home-gradient-text">{s.value}</p>
              <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-inner">
          <div className="home-section-title">
            <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--primary)", marginBottom: "0.75rem" }}>
              Everything you need
            </p>
            <h2>Built for focus, not distraction</h2>
            <p style={{ color: "var(--secondary-foreground)", fontSize: "0.9375rem", marginTop: "0.75rem", maxWidth: 480, marginInline: "auto" }}>
              Every feature in talkative exists because real users needed it â€” nothing added just to fill a changelog.
            </p>
          </div>

          <div className="home-card-grid">
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "1.25rem",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 11,
                    background: "rgba(124,92,252,0.1)",
                    border: "1px solid rgba(124,92,252,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                  }}
                >
                  {f.icon}
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--secondary-foreground)", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="home-section"
        style={{
          background: "var(--card)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="home-section-inner" style={{ maxWidth: 800 }}>
          <div className="home-section-title">
            <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--primary)", marginBottom: "0.75rem" }}>
              How it works
            </p>
            <h2>Up and talking in three steps</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {steps.map((s, i) => (
              <div
                key={s.step}
                style={{
                  display: "flex",
                  gap: "0.85rem",
                  alignItems: "flex-start",
                  minWidth: 0,
                  paddingBottom: i < steps.length - 1 ? "1.75rem" : 0,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #7c5cfc, #a78bfa)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.75rem",
                      color: "#fff",
                    }}
                  >
                    {s.step}
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      style={{
                        width: 1,
                        flex: 1,
                        minHeight: 24,
                        background: "linear-gradient(to bottom, rgba(124,92,252,0.4), rgba(124,92,252,0.05))",
                        margin: "6px 0",
                      }}
                    />
                  )}
                </div>
                <div style={{ minWidth: 0, paddingTop: "0.4rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.4rem" }}>{s.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--secondary-foreground)", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-inner">
          <div className="home-section-title">
            <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--primary)", marginBottom: "0.75rem" }}>
              Loved by teams
            </p>
            <h2>What people are saying</h2>
          </div>

          <div className="home-card-grid">
            {testimonials.map((t) => (
              <div
                key={t.author}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "1.25rem",
                  minWidth: 0,
                }}
              >
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none" style={{ marginBottom: "0.75rem" }}>
                  <path d="M0 20V12C0 5.373 3.82 1.4 11.46 0l1.12 1.96C9.107 2.84 7.28 5.04 6.72 8.56H12V20H0ZM16 20V12C16 5.373 19.82 1.4 27.46 0l1.12 1.96c-3.473.88-5.3 3.08-5.86 6.6H28V20H16Z" fill="rgba(124,92,252,0.3)" />
                </svg>
                <p style={{ fontSize: "0.875rem", color: "var(--card-foreground)", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                  "{t.quote}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: t.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)" }}>{t.author}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="home-section"
        style={{
          background: "var(--card)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="home-section-inner" style={{ maxWidth: 680, textAlign: "center", position: "relative" }}>
          <div
            className="home-glow"
            aria-hidden
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(ellipse, rgba(124,92,252,0.12) 0%, transparent 70%)",
            }}
          />
          <h2
            style={{
              fontWeight: 800,
              letterSpacing: "-0.015em",
              lineHeight: 1.2,
              color: "var(--foreground)",
              marginBottom: "1rem",
            }}
          >
            Ready to talk on your
            <br />
            <span className="home-gradient-text">own terms?</span>
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "var(--secondary-foreground)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            Create your first room in under a minute. No card required, no onboarding maze.
          </p>
          <div className="home-cta-row" style={{ marginInline: "auto" }}>
            <button className="btn-primary" onClick={onSignup}>
              Create a free account
            </button>
            <button className="btn-ghost" onClick={onLogin}>
              Sign in instead
            </button>
          </div>
        </div>
      </section>

      <footer className="home-footer" style={{ borderTop: "1px solid var(--border)" }}>
        <Logo size="sm" />
        <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
          {["Privacy", "Terms", "Contact"].map((link) => (
            <button
              key={link}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.8125rem", color: "var(--muted-foreground)", padding: 0, fontFamily: "Inter, sans-serif" }}
            >
              {link}
            </button>
          ))}
        </div>
        <p style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>© 2026 talkative.</p>
      </footer>
    </div>
  )
}
