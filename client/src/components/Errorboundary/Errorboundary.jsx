import { Component } from 'react';

/**
 * ErrorBoundary — React class component (required for error boundary API).
 *
 * Catches render errors in the component tree and shows a fallback UI
 * instead of crashing the entire page.
 *
 * REACT PATTERN: Wrap the root app or high-risk subtrees (e.g. 3D canvas)
 * in an ErrorBoundary to isolate failures. Error boundaries must be class
 * components; there is no hook equivalent yet.
 *
 * @param {{ children: import('react').ReactNode, fallback?: import('react').ReactNode }} props
 */
export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        // In production you'd send this to Sentry / LogRocket etc.
        console.error('[ErrorBoundary]', error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;
            return (
                <div style={{
                    minHeight: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem',
                    padding: '40px',
                    textAlign: 'center',
                }}>
                    <span style={{ fontSize: '2rem' }}>⚠️</span>
                    <p>Something went wrong loading this section.</p>
                    <button
                        onClick={() => this.setState({ hasError: false, error: null })}
                        style={{
                            background: 'none',
                            border: '1px solid var(--border)',
                            borderRadius: '6px',
                            color: 'var(--accent)',
                            padding: '8px 16px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                        }}
                    >
                        Try again
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}