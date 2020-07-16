import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({clickHandler, label}) => (
  <button onClick={clickHandler}>{label}</button>
)

const Statistic = ({text, value}) => (
  <p>{text}: {value}</p>
)

const Statistics = ({stats}) => {
  if (stats.total === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  return (
  <div>
    <h4>Current statistics:</h4>
    <Statistic text="Good" value={stats.good} />
    <Statistic text="Neutral" value={stats.neutral} />
    <Statistic text="Bad" value={stats.bad} />
    <Statistic text="Total" value={stats.total} />
    <Statistic text="Average" value={stats.avg} />
    <Statistic text="Positive" value={stats.percentGood} />
  </div>
  )
}

const handleFeedbackClick = (value, stats, setStats) => {
  const newStats = {...stats}
  if (value > 0) newStats.good++
  if (value === 0) newStats.neutral++
  if (value < 0) newStats.bad++
  newStats.total++
  newStats.avg = (newStats.good - newStats.bad) / newStats.total
  newStats.percentGood = newStats.good / newStats.total * 100
  setStats(newStats)
}

const App = () => {
  const [stats, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    avg: 0,
    percentGood: 0
  })

  return (
    <div>
        <h3>Give us some feedback:</h3>
        <Button clickHandler={() => handleFeedbackClick(1, stats, setStats)} label={"Good!"} />
        <Button clickHandler={() => handleFeedbackClick(0, stats, setStats)} label={"Neutral"} />
        <Button clickHandler={() => handleFeedbackClick(-1, stats, setStats)} label={"Bad!"} />
        <Statistics stats={stats} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
