import React, { Component } from 'react';
import './App.css';

function getTwoDigitDateFormat(monthOrDate) {
  return (monthOrDate < 10) ? '0' + monthOrDate : '' + monthOrDate;
}

function getCurrentDate() {
  var currentYear = new Date().getFullYear();
  var currentMonth = getTwoDigitDateFormat(new Date().getMonth() + 1);
  var getDate = getTwoDigitDateFormat(new Date().getDate());
  var currentDateString = currentYear + "-" + currentMonth + "-" + getDate;

  return currentDateString;
}

function getCurrentTime(){
  var hours = new Date().getHours();
  var minutes = new Date().getMinutes();
  hours = hours < 12 ? '0' + hours : hours;
  var currentTimeString = hours + ':' + minutes;

  return currentTimeString;
}

class App extends Component {
  state = {
    currentDate: "",
    startDate: getCurrentDate(),
    startTime: getCurrentTime(),
    endDate: getCurrentDate(),
    endTime: getCurrentTime(),
    totalDuration: "0 Days, 0 Hours, 0 Minutes"
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
    var startDateObj = new Date(this.state.startDate);
    var endDateObj = new Date(this.state.endDate);

    var date1Str = 
    startDateObj.getFullYear() +
    "-" +
    getTwoDigitDateFormat(startDateObj.getMonth() + 1) +
    "-" +
    getTwoDigitDateFormat(startDateObj.getDate()) +
    "T" +
    this.state.startTime +
    ":00";

    var date2Str = 
    endDateObj.getFullYear() +
    "-" +
    getTwoDigitDateFormat(endDateObj.getMonth() + 1) +
    "-" +
    getTwoDigitDateFormat(endDateObj.getDate()) +
    "T" +
    this.state.endTime +
    ":00";

    var date1 = new Date(date1Str);
    var date2 = new Date(date2Str);

    var res = Math.abs(date1 - date2) / 1000;

    // get total days between two dates
    var days = Math.floor(res / 86400);                      
    
    // get hours        
    var hours = Math.floor(res / 3600) % 24;        
    
    // get minutes
    var minutes = Math.floor(res / 60) % 60;

    this.setState({
      totalDuration: days + " Days, " + hours + " Hours, " + minutes + " Minutes"
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

class NavBar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="http://google.com/">ClockDuration</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" target="_blank" rel="noopener noreferrer" href="http://google.com/">Vioswift</a>
              </li>
            </ul>
          </div>
        </nav>
      </div> 
    );
  }
}

export default App;