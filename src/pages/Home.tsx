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
    desc: "Messages arrive instantly. No refresh, no lag — just fluid, live conversation the moment you type.",
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
    desc: "Spin up rooms in seconds — for projects, topics, or just your inner circle. Organized, not chaotic.",
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
    desc: "Browser-first and fully responsive. Open a room on your laptop, continue on your phone — seamlessly.",
  },
]

const steps = [
  { step: "01", title: "Create your account", desc: "Sign up in under 30 seconds — no credit card, no setup friction." },
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
    quote: "We moved our entire design critique process into talkative. The private rooms changed how we give feedback — much more candid.",
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
    <div style={{ minHeight: "100%", background: "var(--background)", display: "flex", flexDirection: "column" }}>

      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          padding: "0 2rem",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--border)",
          background: "rgba(11,11,16,0.88)",
          backdropFilter: "blur(14px)",
        }}
      >
        <Logo size="md" />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {token ? (
            <button className="btn-primary" onClick={onOpenApp} style={{ padding: "0.5rem 1.125rem", fontSize: "0.875rem" }}>
              Open app
            </button>
          ) : (
            <>
              <button className="btn-ghost" onClick={onLogin} style={{ padding: "0.5rem 1.125rem", fontSize: "0.875rem" }}>
                Log in
              </button>
              <button className="btn-primary" onClick={onSignup} style={{ padding: "0.5rem 1.125rem", fontSize: "0.875rem" }}>
                Sign up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "6rem 1.5rem 4rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "0%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 500,
            background: "radial-gradient(ellipse, rgba(124,92,252,0.14) 0%, transparent 68%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(124,92,252,0.1)",
            border: "1px solid rgba(124,92,252,0.28)",
            borderRadius: 40,
            padding: "5px 14px",
            marginBottom: "1.75rem",
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c5cfc" }} />
          <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "#a78bfa" }}>Room-based chat, reimagined</span>
        </div>

        <h1
          style={{
            fontSize: "clamp(2.75rem, 6.5vw, 5rem)",
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
            color: "var(--foreground)",
            maxWidth: 800,
            marginBottom: "1.375rem",
          }}
        >
          Talk privately.
          <br />
          <span style={{ background: "linear-gradient(90deg, #7c5cfc 0%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            In your own rooms.
          </span>
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
            color: "var(--secondary-foreground)",
            maxWidth: 540,
            lineHeight: 1.65,
            marginBottom: "2.5rem",
          }}
        >
          talkative gives you private, organized spaces to collaborate and connect — without the noise of traditional chat apps.
        </p>

        <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn-primary" onClick={onSignup} style={{ padding: "0.875rem 2rem", fontSize: "1rem" }}>
            Get started free
          </button>
          <button className="btn-ghost" onClick={onLogin} style={{ padding: "0.875rem 2rem", fontSize: "1rem" }}>
            Sign in
          </button>
        </div>

        <div style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { icon: "🔒", label: "End-to-end encrypted" },
            { icon: "⚡", label: "Real-time sync" },
            { icon: "🛡️", label: "No ads. Ever." },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: "0.875rem" }}>{item.icon}</span>
              <span style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Illustration */}
      <section style={{ padding: "1rem 2rem 5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
        <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
          See it in action
        </p>
        <PrivacyIllustration />
      </section>

      {/* Stats bar */}
      <section
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          background: "var(--card)",
          padding: "2.5rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  background: "linear-gradient(90deg, #7c5cfc, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.1,
                  marginBottom: "0.375rem",
                }}
              >
                {s.value}
              </p>
              <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--primary)", marginBottom: "0.75rem" }}>
              Everything you need
            </p>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                color: "var(--foreground)",
                lineHeight: 1.15,
              }}
            >
              Built for focus, not distraction
            </h2>
            <p style={{ color: "var(--secondary-foreground)", fontSize: "1rem", marginTop: "0.875rem", maxWidth: 480, margin: "0.875rem auto 0" }}>
              Every feature in talkative exists because real users needed it — nothing added just to fill a changelog.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "1.625rem",
                  transition: "border-color 0.15s, transform 0.15s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = "rgba(124,92,252,0.4)"
                  el.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = "var(--border)"
                  el.style.transform = "translateY(0)"
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
                <p style={{ fontSize: "0.9rem", color: "var(--secondary-foreground)", lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        style={{
          padding: "5rem 2rem",
          background: "var(--card)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--primary)", marginBottom: "0.75rem" }}>
              How it works
            </p>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                color: "var(--foreground)",
                lineHeight: 1.15,
              }}
            >
              Up and talking in three steps
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {steps.map((s, i) => (
              <div
                key={s.step}
                style={{
                  display: "flex",
                  gap: "2rem",
                  alignItems: "flex-start",
                  position: "relative",
                  paddingBottom: i < steps.length - 1 ? "2.5rem" : 0,
                }}
              >
                {/* Step number + connector */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #7c5cfc, #a78bfa)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.875rem",
                      color: "#fff",
                      flexShrink: 0,
                      boxShadow: "0 0 20px rgba(124,92,252,0.35)",
                    }}
                  >
                    {s.step}
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      style={{
                        width: 1,
                        flex: 1,
                        minHeight: 32,
                        background: "linear-gradient(to bottom, rgba(124,92,252,0.4), rgba(124,92,252,0.05))",
                        margin: "6px 0",
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div style={{ paddingTop: "0.625rem" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.5rem" }}>{s.title}</h3>
                  <p style={{ fontSize: "0.9375rem", color: "var(--secondary-foreground)", lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--primary)", marginBottom: "0.75rem" }}>
              Loved by teams
            </p>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                color: "var(--foreground)",
                lineHeight: 1.15,
              }}
            >
              What people are saying
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {testimonials.map((t) => (
              <div
                key={t.author}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "1.75rem",
                }}
              >
                {/* Quote marks */}
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none" style={{ marginBottom: "1rem" }}>
                  <path d="M0 20V12C0 5.373 3.82 1.4 11.46 0l1.12 1.96C9.107 2.84 7.28 5.04 6.72 8.56H12V20H0ZM16 20V12C16 5.373 19.82 1.4 27.46 0l1.12 1.96c-3.473.88-5.3 3.08-5.86 6.6H28V20H16Z" fill="rgba(124,92,252,0.3)" />
                </svg>
                <p style={{ fontSize: "0.9375rem", color: "var(--card-foreground)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  "{t.quote}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
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
                  <div>
                    <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)" }}>{t.author}</p>
                    <p style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section
        style={{
          padding: "5rem 2rem",
          background: "var(--card)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: 680,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              height: 300,
              background: "radial-gradient(ellipse, rgba(124,92,252,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--foreground)",
              marginBottom: "1.25rem",
            }}
          >
            Ready to talk on your
            <br />
            <span style={{ background: "linear-gradient(90deg, #7c5cfc, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              own terms?
            </span>
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--secondary-foreground)", lineHeight: 1.65, marginBottom: "2.25rem" }}>
            Create your first room in under a minute. No card required, no onboarding maze.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={onSignup} style={{ padding: "0.875rem 2.25rem", fontSize: "1rem" }}>
              Create a free account
            </button>
            <button className="btn-ghost" onClick={onLogin} style={{ padding: "0.875rem 2.25rem", fontSize: "1rem" }}>
              Sign in instead
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "1.5rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
          background: "var(--background)",
        }}
      >
        <Logo size="sm" />
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacy", "Terms", "Contact"].map((link) => (
            <button
              key={link}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.8125rem", color: "var(--muted-foreground)", padding: 0, fontFamily: "Inter, sans-serif" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--muted-foreground)")}
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
