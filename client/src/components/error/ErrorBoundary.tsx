import React, { Component, ReactNode } from 'react';
import ErrorUI from './Error.ui';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMsg: string;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = {
      hasError: false,
      errorMsg: '',
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state to render fallback UI
    return {
      hasError: true,
      errorMsg: error.message, // Store the error message
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error to an error reporting service here
    console.error("Error caught in Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback UI when there's an error
      return <ErrorUI errMsg={this.state.errorMsg} />;
    }

    // Render children if no error
    return this.props.children;
  }
}

export default ErrorBoundary;
