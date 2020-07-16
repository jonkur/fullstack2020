import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({clickHandler, label}) => (
  <button onClick={clickHandler}>{label}</button>
)

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}: </td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({stats}) => {
  if (stats.total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
  <div>
    <h4>Current statistics:</h4>
    <table>
      <tbody>
        <Statistic text="Good" value={stats.good} />
        <Statistic text="Neutral" value={stats.neutral} />
        <Statistic text="Bad" value={stats.bad} />
        <Statistic text="Total" value={stats.total} />
        <Statistic text="Average" value={stats.avg} />
        <Statistic text="Positive" value={stats.percentGood + '%'} />
      </tbody>
    </table>
  </div>
  )
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

  const handleFeedbackClick = (value) => {
    const newStats = {...stats}
    if (value > 0) newStats.good++
    if (value === 0) newStats.neutral++
    if (value < 0) newStats.bad++
    newStats.total++
    newStats.avg = (newStats.good - newStats.bad) / newStats.total
    newStats.percentGood = newStats.good / newStats.total * 100
    setStats(newStats)
  }

  return (
    <div>
        <h3>Give us some feedback:</h3>
        <Button clickHandler={() => handleFeedbackClick(1)} label={"Good!"} />
        <Button clickHandler={() => handleFeedbackClick(0)} label={"Neutral"} />
        <Button clickHandler={() => handleFeedbackClick(-1)} label={"Bad!"} />
        <Statistics stats={stats} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))