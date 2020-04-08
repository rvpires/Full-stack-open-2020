import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = (props) => {

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))
  const [highest, setHighest] = useState(0)


  const nextAnecdote = () => {
    var randomNumber = Math.round(Math.random() * (anecdotes.length - 1))

    //Different anecdote everytime when you click the button
    while (randomNumber === selected) {
      randomNumber = Math.round(Math.random() * (anecdotes.length - 1))
    }
    setSelected(randomNumber)
  }

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    setHighest(maxIndex(copy))


  }

  //find the index of the first max occurrence in points array
  const maxIndex = (points) => {
    var max = Math.max(...points)

    for (var i = 0; i < points.length; i++) {
      if (points[i] === max) {
        return (i)
      }

    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>
        <Button text='vote' onClick={voteAnecdote} />
        <Button text='next anecdote' onClick={nextAnecdote} />
      </p>

      <h1>Anecdote with most votes</h1>
      {anecdotes[highest]}


    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)