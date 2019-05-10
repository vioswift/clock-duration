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
          <h1 className="h1">ClockDuration</h1>
          <hr/>

          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                  <div className="col-md-7">
                    <h2 className="h2 float-left">Start</h2>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="startDate" className="label label-default float-left">Date: </label>
                      <input type="date" name="startDate" className="form-control" onChange={this.startDateChange}/>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="startTime" className="label label-default float-left">Time: </label>
                      <input type="time" name="startTime" className="form-control" onChange={this.startTimeChange}/>
                    </div>
                  </div>

                  <hr/>

                  <div className="col-md-7">
                    <h2 className="h2 float-left">End</h2>
                  </div>
                  <div className="form-group row">
                      <div className="col-md-6">
                        <label htmlFor="endDate" className="label label-default float-left">Date: </label>
                        <input type="date" name="endDate" className="form-control" onChange={this.endDateChange}/>                      
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="endTime" className="label label-default float-left">Time: </label>
                        <input type="time" name="endTime" className="form-control" onChange={this.endTimeChange}/>                                         
                      </div>
                  </div>

                  <div className="form-group row">
                    <div class="col-md-6 offset-md-3">
                      <button type="button" className="btn btn-dark" onClick={this.calculateTotalDuration}>Calculate</button>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div class="col-md-12">
                      <div class="alert alert-info" role="alert">
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