interface LogoProps {
  size?: "sm" | "md" | "lg"
  showWordmark?: boolean
}

export default function Logo({ size = "md", showWordmark = true }: LogoProps) {
  const badgeSizes = { sm: 28, md: 36, lg: 48 }
  const textSizes = { sm: "text-sm", md: "text-base", lg: "text-xl" }
  const displaySizes = { sm: "text-xl", md: "text-2xl", lg: "text-3xl" }

  const px = badgeSizes[size]

  return (
    <div className="flex items-center gap-2.5">
      <div
        style={{
          width: px,
          height: px,
          background: "linear-gradient(135deg, #7c5cfc 0%, #a78bfa 100%)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 0 16px rgba(124, 92, 252, 0.4)",
        }}
      >
        <span
          className={`font-display ${displaySizes[size]} leading-none`}
          style={{ color: "#fff", marginTop: 2 }}
        >
          t
        </span>
      </div>
      {showWordmark && (
        <span
          className={`font-semibold tracking-tight ${textSizes[size]}`}
          style={{ color: "var(--foreground)" }}
        >
          talkative
        </span>
      )}
    </div>
  )
}
