import React from 'react';
import moment from 'moment';
import ValidationMessage from './ValidationMessage';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class Date extends React.Component {
    state = {
        day: moment(this.props.defaultValue).format('D'),
        month: moment(this.props.defaultValue).format('MM'),
        year: moment(this.props.defaultValue).format('YYYY'),
        isValid: true,
        showDatePicker: false
    };

    setDate() {
        let date = this.state.year + '-' + this.state.month + '-' + this.state.day;
        let isValidInput = moment(date, this.props.format, true).isValid();

        this.setState({ isValid: isValidInput });
        this.props.date(date);
        this.props.validInput(isValidInput);
    }

    dayChange = (e) => {
        this.setState({ day: e.target.value }, function () {
            this.setDate();
        });
    }

    monthChange = (e) => {
        this.setState({ month: e.target.value }, function () {
            this.setDate();
        });
    }

    yearChange = (e) => {
        this.setState({ year: e.target.value }, function () {
            this.setDate();
        });
    }

    handleDayClick = (day) => {
        this.setState({ 
            year: moment(day).format('YYYY'), 
            month: moment(day).format('MM'), 
            day: moment(day).format('D') }, function () {
                this.setDate();
        });
        this.setState({ showDatePicker: !this.state.showDatePicker });
    }

    showDatePickerClick() {
        this.setState({ showDatePicker: !this.state.showDatePicker });
    }

    render() {
        const picker = (
            <div className="row p-4">
                <div className="offset-md-2">
                    <div className="alert alert-light text-center" role="alert">
                        <DayPicker 
                            onDayClick={this.handleDayClick}
                            selectedDays={this.state.selectedDay}
                        />
                    </div>
                </div>
            </div>
        )
        
        return (
            <div>
                <div className="row">
                    <label htmlFor={this.props.inputName} className="label label-default float-left">Date: </label>
                </div>
                <div className="row">
                    <div className="col-md-2 offset-md-2 col">
                        <input type="tel" 
                            id={this.props.inputName} 
                            className="form-control" 
                            value={this.state.day} 
                            onChange={this.dayChange.bind(this)} required
                        />
                    </div>
                    /
                    <div className="col-md-2 col">
                        <input type="tel" 
                            id={this.props.inputName} 
                            className="form-control" 
                            value={this.state.month} 
                            onChange={this.monthChange.bind(this)} required
                        />
                    </div>
                    /
                    <div className="col-md-3 col-5">
                        <div className="input-group mb-3">
                            <input type="tel" 
                                id={this.props.inputName} 
                                className="form-control" 
                                value={this.state.year} 
                                onChange={this.yearChange.bind(this)} required
                            />
                            <div className="input-group-append">
                                <button className="btn btn-danger" type="button" onClick={this.showDatePickerClick.bind(this)}>
                                    <img src={process.env.PUBLIC_URL + '/calender-icon.png'} alt="Calender Icon" width="20"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.showDatePicker ? picker : ''}
                {this.state.isValid ? '' : <ValidationMessage boldMessage="ERROR:" message="Date Format Is dd/mm/yyyy"/>}
            </div>
        );
    }
}

export default Date;