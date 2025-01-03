import React, { Component, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    // Update state to indicate that an error has occurred
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to the console
    console.error('Error logged:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state; // Destructuring state
    const { children } = this.props; // Destructuring props

    if (hasError) {
      // Fallback UI when there is an error
      return <div className="error-boundary">Something went wrong.</div>;
    }

    return children; // Render the children if there is no error
  }
}

export default ErrorBoundary;
