import React, { Component } from "react";

export class CurrentUpdatingTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: "",
    };
  }
  componentDidMount() {
    var calculatedTime = new Date(null);
    calculatedTime.setSeconds(this.props.shifted_sec); //setting value in seconds
    var newTime = calculatedTime.toISOString().substr(11, 8);
    console.log("Mount");
    this.setState({
      time: newTime,
    });
    this.interval = setInterval(this.increse, 1000);
  }
  componentWillUnmount() {
    console.log("Unmount");
    clearInterval(this.interval);
  }
  increse = () => {};

  //   setTime(seconds) {
  //     console.log(seconds);
  //     var calculatedTime = new Date(null);
  //     calculatedTime.setSeconds(seconds); //setting value in seconds
  //     var newTime = calculatedTime.toISOString().substr(11, 8);
  //     this.setState({ time: newTime });
  //   }

  render() {
    return <div>{this.state.time}</div>;
  }
}

export default CurrentUpdatingTime;

//this is not completed
// im tring to creacte live increasing clock
