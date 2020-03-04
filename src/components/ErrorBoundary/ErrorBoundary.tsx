import React, {Component} from 'react';

import FiveHundredErrorPage from '../../pages/500';

class ErrorBoundary extends Component {
    state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: object, errorInfo: object) {
    // TODO we should log the error here with Bugsnag or LogRocket
    console.log(error, errorInfo, 'Errors here');
  }

  render() {
    if (this.state.hasError) {
      return <FiveHundredErrorPage />;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
