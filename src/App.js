import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    value: "hi",
    number: 4,
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    totalDuration: "0"
  };

  textChange = (event) => {
    this.setState({value:event.target.value});
  }

  handleClick = (event) => {
    this.setState({number:event.target.number});
  }

  startDateChange = (event) => {
    this.calculateTotalDuration({startDate:event.target.startDate}, {startDate:event.target.startDate});
  }

  endDateChange = (event) => {
    this.calculateTotalDuration({startDate:event.target.startDate}, {startDate:event.target.startDate});
  }

  calculateTotalDuration(_startDate, _endDate) {
    var startDateObj = new Date(_startDate);
    var endDateObj = new Date(_endDate);
    var one_day=1000*60*60*24;

    // Convert both dates to milliseconds
    var date1_ms = startDateObj.getTime();
    var date2_ms = endDateObj.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;
    
    // Convert back to days and return
    this.setState({totalDuration: Math.round(difference_ms/one_day)});

    // https://www.htmlgoodies.com/html5/javascript/calculating-the-difference-between-two-dates-in-javascript.html
  }

  render() {
    return (
      <div className="App">
          <label htmlFor="">input</label>
          <input type="text" onChange={this.textChange} className="form-control" value={this.state.value} />

          <button type="button" onClick={()=> this.setState({number:this.state.number + 1})}>Click Me! {this.state.number}</button>

          <div>
            {this.state.value}
          </div>

          <br/><br/>

          <div>
            <label htmlFor="start">Start date: </label>
            <input type="date" onChange={this.startDateChange} id="start" name="trip-start"
                  value="2018-07-22"
                  min="2018-01-01" max="2018-12-31"/>

            <label htmlFor="start">Start time: </label>
            <input type="time" id="appt" name="appt"
                  min="9:00" max="18:00"/>

            <br/>

            <label htmlFor="start">End date: </label>
            <input type="date" onChange={this.endDateChange} id="start" name="trip-start"
                  value="2018-07-24"
                  min="2018-01-01" max="2018-12-31"/>

            <label htmlFor="start">Start time: </label>
            <input type="time" id="appt" name="appt"
                  min="9:00" max="18:00"/>
          </div>
          <div>
            Duration: {this.state.totalDuration}
          </div>
      </div>
    );
  }
}

export default App;