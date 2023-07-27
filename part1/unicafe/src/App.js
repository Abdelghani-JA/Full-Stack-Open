import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  const all = () =>  good + neutral + bad
  const average = ()  => isNaN((good - bad) / all()) ? 0 : ((good - bad) / all()).toFixed(1)
  const goodTotal = () => isNaN(good * 100 / all()) ? 0 : (good * 100 / all()).toFixed(1)

  return (
    <>
      <h1>unicafe : give us a feedback</h1>
      <Button text={"Good"} handleClick={increaseGood} />
      <Button text={"Neutral"} handleClick={increaseNeutral} />
      <Button text={"Bad"} handleClick={increaseBad} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} goodTotal={goodTotal} />
    </>
  )
}


const Statistics = (props) => {
  if(props.all() == 0){
    return (<p>No feedback given</p>)
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value={props.all()} />
        <StatisticLine text="average" value={props.average()} />
        <StatisticLine text="positive" value={`${props.goodTotal()} %`} />  
      </tbody>
    </table>
  )
}

const StatisticLine = (props) =>{
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}



export default App