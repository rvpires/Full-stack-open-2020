import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.header}</h1>
  )
}

const Button = (props) => {
  return (<button onClick={props.onClick}>{props.text}</button>)
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )

}

const Statistics = (props) => {

  const total = props.good + props.neutral + props.bad

  if ((total) === 0) {
    return <p>No feedback given.</p>
  }

  const avg = (props.good - props.bad) / total
  const positive = props.good / total * 100


  return (
    <table>
      <tbody>
        <Statistic text='good' value={props.good} />
        <Statistic text='neutral' value={props.neutral} />
        <Statistic text='bad' value={props.bad} />
        <Statistic text='all' value={total} />
        <Statistic text='average' value={avg} />
        <Statistic text='positives' value={positive + ' %'} />

      </tbody>
    </table>
  )

}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const clickGood = () => {
    setGood(good + 1)
  }
  const clickNeutral = () => {
    setNeutral(neutral + 1)
  }
  const clickBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header header={'give feedback'} />
      <Button onClick={clickGood} text='good'></Button>
      <Button onClick={clickNeutral} text='neutral'></Button>
      <Button onClick={clickBad} text='bad'></Button>

      <Header header={'statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)