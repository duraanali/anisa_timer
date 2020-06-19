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
      laps: []
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

  handleLapClick() {
    this.setState({
      laps: this.state.laps.concat([this.state.seconds])
    })
  }

  render() {
    const {running, seconds, laps} = this.state;

    return (
      <div className="stopwatch">
        <h1 className="stopwatch-timer">{formattedSeconds(seconds)}</h1>

        {(running
          ? <Button className="stop-btn" onClick={this.handleStopClick.bind(this)}>stop</Button>
          : <Button className="start-btn" onClick={this.handleStartClick.bind(this)}>start</Button>
        )}

        {(running || seconds > 0 
          ? <Button onClick={this.handleLapClick.bind(this)}>Duration</Button>
          : null
        )}

        <ul className="stopwatch-laps">
          {laps.map((lap, i) =>
            <li className="stopwatch-lap"><strong>{i + 1}</strong>/ {formattedSeconds(lap)}</li>)
          }
        </ul>
      </div>
    );
  }
}

export default Timer