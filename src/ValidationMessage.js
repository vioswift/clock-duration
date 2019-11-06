import React from 'react';

class ValidationMessage extends React.Component {
    render() {
        return (
            <div className="alert alert-danger" role="alert">
                <small><strong>{this.props.boldMessage}</strong> {this.props.message}</small>
            </div>
        );
    }
}

export default ValidationMessage;