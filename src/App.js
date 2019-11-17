import React from 'react';
import NavBar from './NavBar';
import Time from './Time';
import Date from './Date';
import moment from 'moment';

class App extends React.Component {
  dateFormat = 'YYYY-MM-D';
  timeFormat = 'h:mm A';

  state = {
    startDate: moment().format(this.dateFormat),
    startTime: moment().format(this.timeFormat),
    endDate: moment().format(this.dateFormat),
    endTime: moment().format(this.timeFormat),
    totalDuration: "The duration will appear here.",
    validInputs: true
  };

  getFullDate() {
    return moment(this.state.startDate + " " + this.state.startTime, this.dateFormat + this.timeFormat);
  }

  getFullStartDateTime() {
    return moment(moment(this.state.startDate + " " + this.state.startTime, this.dateFormat + this.timeFormat)).format('dddd D MMMM YYYY LT');
  }

  getFullEndDateTime() {
    return moment(moment(this.state.endDate + " " + this.state.endTime, this.dateFormat + this.timeFormat)).format('dddd D MMMM YYYY LT');
  }

  startDateChange = (event) => {
    this.setState({startDate: event.target.value});
  }

  endDateChange = (event) => {
    this.setState({endDate: event.target.value});
  }

  startTimeChange = (event) => {
    this.setState({startTime: event.target.value});
  }

  endTimeChange = (event) => {
    this.setState({endTime: event.target.value});
  }

  showCalculation(value, text) {
    return value !== 0 ? value + text : '';
  }

  calculateTotalDuration()  {
    var startDate = moment(this.state.startDate + " " + this.state.startTime, this.dateFormat + this.timeFormat);
    var endDate = moment(this.state.endDate + " " + this.state.endTime, this.dateFormat + this.timeFormat);
    var years = 0;
    var months = 0;
    var weeks = 0;
    var days = 0;
    var hours = 0;
    var minutes = 0;
    var now = startDate
    var then = endDate;
    var ms = then.diff(now, 'milliseconds', true); // time now
    var isNegative = now.isAfter(then); // is the start date, start before the end date
    var durationText = '';

    if (!isNegative) {
      // years
      years = Math.floor(moment.duration(ms).asYears());
      then = then.subtract(years, 'years', true);

      // months
      ms = then.diff(now, 'milliseconds', true);
      months = Math.floor(moment.duration(ms).asMonths());

      // weeks
      then = then.subtract(months, 'months').subtract(0, 'months'); // not sure why I had to subtract 0 months
      ms = then.diff(now, 'milliseconds', true);
      weeks = Math.floor(moment.duration(ms).asWeeks());

      // days
      then = then.subtract(weeks, 'weeks');
      ms = then.diff(now, 'milliseconds', true);
      days = Math.floor(moment.duration(ms).asDays());

      // hours
      then = then.subtract(days, 'days');
      ms = then.diff(now, 'milliseconds', true);
      hours = Math.floor(moment.duration(ms).asHours());

      // minutes
      then = then.subtract(hours, 'hours');
      ms = then.diff(now, 'milliseconds', true);
      minutes = Math.floor(moment.duration(ms).asMinutes());

      durationText = 
        this.showCalculation(years, " Years, ") + 
        this.showCalculation(months, " Months, ") + 
        this.showCalculation(weeks, " Weeks, ") +
        this.showCalculation(days, " Days, ") + 
        this.showCalculation(hours, " Hours, ") + 
        this.showCalculation(minutes, " Minutes  ");
        
      durationText = durationText.substr(durationText.length - 2) !== ',' ? durationText.substring(0, durationText.length - 2) : durationText;

      this.setState({
        totalDuration: durationText
      });
    } else {
      this.setState({totalDuration: "Error: Start Date is greater then the End Date!"});
    }
  }

  render() {
    return (
      <div>
          <NavBar/>
          <div className="container p-3">
            <div className="row">
              <div className="col-md-7 offset-md-3">
                {/* start date and time */}
                <div className="row p-1">
                  <h2 className="h2 float-left">Start</h2>
                </div>
                <div className="form-group row p-2">
                  <div className="col-md-10 offset-md-1">
                    <Date
                      inputName="startDate"
                      defaultValue={this.getFullDate()}  
                      format={this.dateFormat}                
                      date={date => {
                        this.setState({ startDate: date }, function () {
                            this.calculateTotalDuration();
                        });
                      }}
                      validInput={validInput => {
                        this.setState({ validInputs: validInput });
                      }}
                    />
                  </div>

                  <div className="col-md-10 offset-md-1">
                    <Time
                      inputName="startTime"
                      defaultValue={this.getFullDate()}    
                      format={this.timeFormat}                 
                      time={time => {
                        this.setState({ startTime: time }, function () {
                            this.calculateTotalDuration();
                        });
                      }}
                      validInput={validInput => {
                        this.setState({ validInputs: validInput });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-10 offset-md-1">
                    <small>From: <strong>{this.getFullStartDateTime()}</strong> </small>
                  </div>
                </div>

                <hr/>

                {/* end date and time */}
                <div className="row p-1">
                  <h2 className="h2 float-left">End</h2>
                </div>
                <div className="form-group row p-2">
                    <div className="col-md-10 offset-md-1">
                      <Date
                        inputName="endDate"
                        defaultValue={this.getFullDate()} 
                        format={this.dateFormat}                    
                        date={date => {
                          this.setState({ endDate: date }, function () {
                              this.calculateTotalDuration();
                          });
                        }}
                        validInput={validInput => {
                          this.setState({ validInputs: validInput });
                        }}
                      />                     
                    </div>

                    <div className="col-md-10 offset-md-1">
                      <Time
                        inputName="endTime"
                        defaultValue={this.getFullDate()}   
                        format={this.timeFormat}
                        time={time => {
                          this.setState({ endTime: time }, function () {
                            this.calculateTotalDuration();
                          });
                        }}
                        validInput={validInput => {
                          this.setState({ validInputs: validInput });
                        }}
                      />                                        
                    </div>
                </div>
                <div className="row">
                  <div className="col-md-10 offset-md-1">
                    <small>To: <strong>{this.getFullEndDateTime()}</strong> </small>
                  </div>
                </div>
                <div className="p-2"></div>
                <small className="p-3"><strong>*</strong>Includes <strong>start</strong> and <strong>end</strong> date</small>

                {/* total duration */}
                <div className="form-group row">
                  <div className="col-md-12">
                    <div className="alert alert-info text-center" role="alert">
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