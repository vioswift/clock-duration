import React from 'react';

class ValidationMessage extends React.Component {
    render() {
        return (
            <div className="row p-2">
                <div className="col-md col">
                    <div className="alert alert-danger" role="alert">
                        <small><strong>{this.props.boldMessage}</strong> {this.props.message}</small>
                    </div>
                </div>
            </div>
        );
    }
}

export default ValidationMessage;