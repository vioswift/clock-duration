import React from 'react';
import moment from 'moment';
import ValidationMessage from './ValidationMessage';

class Time extends React.Component {
    state = {
        hour: moment(this.props.defaultValue).format('h'),
        minute: moment(this.props.defaultValue).format('mm'),
        ampm: moment(this.props.defaultValue).format('A'),
        isValid: true
    };

    setTime() {
        let time = this.state.hour + ':' + this.state.minute + ' ' + this.state.ampm;
        let isValidInput = moment(time, this.props.format, true).isValid();

        this.setState({ isValid: isValidInput });
        this.props.time(time); 
        this.props.validInput(isValidInput);
    }

    hourChange = (event) => {
        this.setState({ hour: event.target.value }, function () {
            this.setTime();
        });
    }

    minuteChange = (event) => {
        this.setState({ minute: event.target.value }, function () {
            this.setTime();
        });
    }

    ampmChange = (event) => {
        this.setState({ ampm: event.target.value }, function () {
            this.setTime();
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <label htmlFor={this.props.inputName} className="label label-default float-left">Time: </label>
                </div>
                <div className="row">
                    <div className="col-md-2 offset-md-2 col">
                        <input type="tel" id={this.props.inputName} className="form-control" defaultValue={moment(this.props.defaultValue).format('h')} onChange={this.hourChange.bind(this)} required/>
                    </div>
                    :
                    <div className="col-md-2 col">
                        <input type="tel" id={this.props.inputName} className="form-control" defaultValue={moment(this.props.defaultValue).format('mm')} onChange={this.minuteChange.bind(this)} required/>
                    </div>
                    <div className="col-md-3 col-5">
                        <select className="form-control" id={this.props.inputName} defaultValue={moment(this.props.defaultValue).format('A')} onChange={this.ampmChange.bind(this)} required>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </div>
                </div>
                {this.state.isValid ? '' : <ValidationMessage boldMessage="ERROR:" message="Time Format Is h:mm AM/PM"/>}
            </div>
        );
    }
}

export default Time;