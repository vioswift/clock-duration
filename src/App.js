import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    value: "hi",
    number: 4,
    list: [
      "name1",
      "name2"
    ]
  };

  textChange = (event) => {
    this.setState({value:event.target.value});
  }

  handleClick = (event) => {
    this.setState({number:event.target.number});
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

          <div>
            {this.state.list[0]}
            <br/>
            {this.state.list.join(" ")}
            <br/>
            {
                this.state.list.map( x => 
                  <span>{x}</span>
                )
            }
          </div>
      </div>
    );
  }
}

export default App;