import React, { Component } from 'react';
import './App.css';

function getTwoDigitDateFormat(monthOrDate) {
  return (monthOrDate < 10) ? '0' + monthOrDate : '' + monthOrDate;
}

class App extends Component {
  state = {
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    totalDuration: "0"
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
    console.log("res= " + res);

    // get total days between two dates
    var days = Math.floor(res / 86400);                      
    
    // get hours        
    var hours = Math.floor(res / 3600) % 24;        
    
    // get minutes
    var minutes = Math.floor(res / 60) % 60;

    // Convert back to days and return
    this.setState({
      totalDuration: days + " Days, " + hours + " Hours, " + minutes + " Minutes"
    });
  }

  render() {
    return (
      <div className="App">
          <h1>ClockDuration</h1>
          <div>
            <h2>Start</h2>
            <label htmlFor="start">Date: </label>
            <input type="date" name="startDate" onChange={this.startDateChange} />

            <label htmlFor="start">Time: </label>
            <input type="time" id="appt" name="appt" onChange={this.startTimeChange}
                  min="9:00" max="18:00"/>

            <br/>

            <h2>End</h2>
            <label htmlFor="start">Date: </label>
            <input type="date" name="bday" onChange={this.endDateChange}/>

            <label htmlFor="start">Time: </label>
            <input type="time" id="appt" name="appt" onChange={this.endTimeChange}
                  min="9:00" max="18:00"/>
          </div>
          <div>
            <button type="button" onClick={this.calculateTotalDuration}>Calculate</button>
          </div>

          <div>
            <p><strong>Duration:</strong>  {this.state.totalDuration}</p>  
          </div>
      </div>
    );
  }
}

export default App;