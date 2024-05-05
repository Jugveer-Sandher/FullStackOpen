import { useState } from 'react'

const Button = ( {handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td><h5>{text}</h5></td>
      <td><h5>{value}</h5></td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return <h5>No feedback given</h5>
  }

  const avg = (props.good - props.bad) / props.total;
  const pos = props.good / props.total * 100;
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={props.good}/>
        <StatisticsLine text="neutral" value={props.neutral}/>
        <StatisticsLine text="bad" value={props.bad}/>
        <StatisticsLine text="all" value={props.total}/>
        <StatisticsLine text="average" value={avg}/>
        <StatisticsLine text="positive" value={pos}/>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setTotal(total+1);
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setTotal(total+1);
  }
  const handleBadClick = () => {
    setBad(bad + 1);
    setTotal(total+1);
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

export default App