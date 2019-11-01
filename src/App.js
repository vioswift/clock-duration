import React from 'react';
import './App.css';
import NavBar from './navBar';
import moment from 'moment';

class App extends React.Component {
  state = {
    startDate: moment().format('YYYY-MM-DD'),
    startTime: moment().format('HH:mm'),
    endDate: moment().format('YYYY-MM-DD'),
    endTime: moment().format('HH:mm'),
    totalDuration: "The duration will appear here."
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

  calculateTotalDuration()  {
    var startDateObj = new Date(this.state.startDate + " " + this.state.startTime);
    var endDateObj = new Date(this.state.endDate + " " + this.state.endTime);
    var startDate = moment(startDateObj, 'DD/MM/YYYY HH:mm:ss');
    var endDate = moment(endDateObj, 'DD/MM/YYYY HH:mm:ss');

    // time now
    var now = startDate, then = endDate, ms = then.diff(now, 'milliseconds', true);

    // years
    var years = Math.floor(moment.duration(ms).asYears());
    then = then.subtract(years, 'years');

    // months
    ms = then.diff(now, 'milliseconds', true);
    var months = Math.floor(moment.duration(ms).asMonths());

    // weeks
    then = then.subtract(months, 'months').subtract(0, 'months');// not sure why I had to subtract 0 days
    ms = then.diff(now, 'milliseconds', true);
    var weeks = Math.floor(moment.duration(ms).asWeeks());

    // days
    ms = then.diff(now, 'milliseconds', true);
    var days = Math.floor(moment.duration(ms).asDays());

    // hours
    then = then.subtract(days, 'days');
    ms = then.diff(now, 'milliseconds', true);
    var hours = Math.floor(moment.duration(ms).asHours());

    // minutes
    then = then.subtract(hours, 'hours');
    ms = then.diff(now, 'milliseconds', true);
    var minutes = Math.floor(moment.duration(ms).asMinutes());

    if (startDateObj > endDateObj) {
      this.setState({totalDuration: "Error: Start Date is greater then the End Date!"});
    } else {
      this.setState({
        totalDuration: 
        years + " Years, " + 
        months + " Months, " + 
        weeks + " Weeks, " +
        days + " Days, " + 
        hours + " Hours, " + 
        minutes + " Minutes"
      });
    }
  }

  render() {
    return (
      <div className="App">
          <NavBar/>
          <h1 className="p-4">ClockDuration</h1>

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
                    <button type="button" className="btn btn-dark btn-lg btn-block" onClick={this.calculateTotalDuration.bind(this)}>Calculate</button>
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