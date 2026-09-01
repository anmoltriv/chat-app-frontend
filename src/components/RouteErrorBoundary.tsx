import { Component, type ReactNode } from "react"

interface State {
  error: Error | null
}

export default class RouteErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            padding: "2rem",
            textAlign: "center",
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        >
          <p style={{ fontWeight: 600, fontSize: "1.125rem" }}>Could not open chat</p>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", maxWidth: 420 }}>
            {this.state.error.message}
          </p>
        </div>
      )
    }
    return this.props.children
  }
}
