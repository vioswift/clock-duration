import React from 'react';
import './App.css';
import NavBar from './navBar';
import moment from 'moment';

class App extends React.Component {
  getTwoDigitDateFormat(monthOrDate) {
    return (monthOrDate < 10) ? '0' + monthOrDate : '' + monthOrDate;
  }
  
  getCurrentDate() {
    var currentYear = new Date().getFullYear();
    var currentMonth = this.getTwoDigitDateFormat(new Date().getMonth() + 1);
    var getDate = this.getTwoDigitDateFormat(new Date().getDate());
    var currentDateString = currentYear + "-" + currentMonth + "-" + getDate;
  
    return currentDateString;
  }
  
  getCurrentTime(){
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    hours = hours < 12 ? '0' + hours : hours;
    var currentTimeString = hours + ':' + minutes;
  
    return currentTimeString;
  }

  state = {
    currentDate: "",
    startDate: this.getCurrentDate(),
    startTime: this.getCurrentTime(),
    endDate: this.getCurrentDate(),
    endTime: this.getCurrentTime(),
    totalDuration: "-"
  };

  startDateChange = (event) => {
    this.setState({startDate:event.target.value});
  }

  endDateChange = (event) => {
    this.setState({endDate:event.target.value});
  }

  startTimeChange = (event) => {
    this.setState({startTime:event.target.value});
  }

  endTimeChange = (event) => {
    this.setState({endTime:event.target.value});
  }

  calculateTotalDuration = (event) => {
    var startDateObj = new Date(this.state.startDate + " " + this.state.startTime);
    var endDateObj = new Date(this.state.endDate + " " + this.state.endTime);
    var startDate = moment(startDateObj, 'DD/MM/YYYY HH:mm:ss');
    var endDate = moment(endDateObj, 'DD/MM/YYYY HH:mm:ss');

    var now = startDate, then = endDate, ms = then.diff(now, 'milliseconds', true);

    var years = Math.floor(moment.duration(ms).asYears());
    then = then.subtract(years, 'years');

    ms = then.diff(now, 'milliseconds', true);
    var months = Math.floor(moment.duration(ms).asMonths());

    then = then.subtract(months, 'months').subtract(0, 'days'); // not sure why I had to subtract 0 days
    ms = then.diff(now, 'milliseconds', true);
    var days = Math.floor(moment.duration(ms).asDays());

    then = then.subtract(days, 'days');
    ms = then.diff(now, 'milliseconds', true);
    var hours = Math.floor(moment.duration(ms).asHours());

    then = then.subtract(hours, 'hours');
    ms = then.diff(now, 'milliseconds', true);
    var minutes = Math.floor(moment.duration(ms).asMinutes());

    this.setState({
      totalDuration: years + " Years, " + months + " Months, " + days + " Days, " + hours + " Hours, " + minutes + " Minutes"
    });
  }

  render() {
    return (
      <div className="App">
          <NavBar/>
          <h1>ClockDuration</h1>

          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <hr/>

                {/* start date and time */}
                <div className="col-md-7">
                  <h2 className="h2 float-left">Start</h2>
                </div>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label htmlFor="startDate" className="label label-default float-left">Date: </label>
                    <input type="date" name="startDate" className="form-control" defaultValue={this.state.startDate} onChange={this.startDateChange} required/>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="startTime" className="label label-default float-left">Time: </label>
                    <input type="time" name="startTime" className="form-control" defaultValue={this.state.startTime} onChange={this.startTimeChange} required/>
                  </div>
                </div>

                <hr/>

                {/* end date and time */}
                <div className="col-md-7">
                  <h2 className="h2 float-left">End</h2>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="endDate" className="label label-default float-left">Date: </label>
                      <input type="date" name="endDate" className="form-control" defaultValue={this.state.endDate} onChange={this.endDateChange} required/>                      
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="endTime" className="label label-default float-left">Time: </label>
                      <input type="time" name="endTime" className="form-control" defaultValue={this.state.endTime} onChange={this.endTimeChange} required/>                                         
                    </div>
                </div>

                {/* calculate button */}
                <div className="form-group row">
                  <div className="col-md-6 offset-md-3">
                    <button type="button" className="btn btn-dark btn-lg btn-block" onClick={this.calculateTotalDuration}>Calculate</button>
                  </div>
                </div>

                <small><strong>*</strong>Includes <strong>start</strong> and <strong>end</strong> date</small>

                {/* total duration */}
                <div className="form-group row">
                  
                  <div className="col-md-12">
                    <div className="alert alert-info" role="alert">
                        {this.state.totalDuration} 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default App;