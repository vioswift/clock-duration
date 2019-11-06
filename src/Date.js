import React from 'react';
import moment from 'moment';
import ValidationMessage from './ValidationMessage';

class Date extends React.Component {
    state = {
        day: moment(this.props.defaultValue).format('D'),
        month: moment(this.props.defaultValue).format('MM'),
        year: moment(this.props.defaultValue).format('YYYY'),
        isValid: true
    };

    setDate() {
        let date = this.state.year + '-' + this.state.month + '-' + this.state.day;
        let isValidInput = moment(date, this.props.format, true).isValid();

        this.setState({ isValid: isValidInput });
        this.props.date(date);
        this.props.validInput(isValidInput);
    }

    dayChange = (event) => {
        this.setState({ day: event.target.value }, function () {
            this.setDate();
        });
    }

    monthChange = (event) => {
        this.setState({ month: event.target.value }, function () {
            this.setDate();
        });
    }

    yearChange = (event) => {
        this.setState({ year: event.target.value }, function () {
            this.setDate();
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row p-2 ">
                    <label htmlFor={this.props.inputName} className="label label-default float-left">Date: </label>
                    <div className="col-md-3">
                        <input type="text" id={this.props.inputName} className="form-control" defaultValue={moment(this.props.defaultValue).format('D')} onChange={this.dayChange.bind(this)} required/>
                    </div>
                    /
                    <div className="col-md-3">
                        <input type="text" id={this.props.inputName} className="form-control" defaultValue={moment(this.props.defaultValue).format('MM')} onChange={this.monthChange.bind(this)} required/>
                    </div>
                    /
                    <div className="col-md-4">
                        <input type="text" id={this.props.inputName} className="form-control" defaultValue={moment(this.props.defaultValue).format('YYYY')} onChange={this.yearChange.bind(this)} required/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md">
                        {this.state.isValid ? '' : <ValidationMessage boldMessage="ERROR:" message="Date Format Is dd/mm/yyyy"/>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Date;