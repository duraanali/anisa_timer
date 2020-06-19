import React from 'react';
import './styles.css';

const formattedSeconds = (sec) => Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2)
const Button = (props) => <button type="button" {...props} className={"btn " + props.className} />;


class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      seconds: 0,
      duration: []
    };
    this.interval = null;
  }

  handleStartClick() {
    this.setState({ running: true });
    this.interval = setInterval(() => this.setState({ seconds: this.state.seconds + 1 }), 1000);
  }

  handleStopClick() {
    clearInterval(this.interval);
    this.setState({ running: false });
  }

  handleRecordClick() {
    clearInterval(this.interval);
    this.setState({ running: false });
    this.setState({
        duration: this.state.duration.concat([this.state.seconds])
    })

  }

  render() {
    const {running, seconds, duration} = this.state;

    return (
      <div className="stopwatch">
        <h1 className="stopwatch-timer">{formattedSeconds(seconds)}</h1>

        {(running
          ? <Button className="stop-btn" onClick={this.handleStopClick.bind(this)}>stop</Button>
          : <Button className="start-btn" onClick={this.handleStartClick.bind(this)}>start</Button>
        )}

        {(running || seconds > 0 
          ? <Button onClick={this.handleRecordClick.bind(this)}>Record</Button>
          : null
        )}

        <ul className="stopwatch-laps">
          {duration.map((record, i) =>
            <li className="stopwatch-lap"><strong>{i + 1}</strong>/ {formattedSeconds(record)}</li>)
          }
        </ul>
      </div>
    );
  }
}

export default Timer