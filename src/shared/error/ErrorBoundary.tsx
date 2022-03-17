import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props: any, public state: { hasError: boolean, message: string } = { hasError: false, message: ''}) {
        super(props);
    }

    static getDerivedStateFromError(err: any) {
        return { hasError: true, message: err.toString() };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
    }

    render() {
        if(this.state.hasError) {
            return (
                <h2>Something went wrong. The following error was thrown {this.state.message}</h2>
            )
        };

        return this.props.children;
    }
}