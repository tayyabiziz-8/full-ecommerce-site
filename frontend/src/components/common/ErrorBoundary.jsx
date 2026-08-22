import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
          <h1 className="font-display text-2xl font-semibold">Something went wrong</h1>
          <p className="mt-3 text-muted">Try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded bg-accent px-5 py-2.5 text-sm font-semibold text-paper"
          >
            Refresh
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}