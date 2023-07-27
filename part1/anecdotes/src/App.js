import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const getRandomInteger = (anecdotes) => {
    // interval adjusted to ensure equal probabilities (0.5 to 8.5) of the array length
    let rand =  0.5 + Math.random() * (anecdotes.length);
    return Math.round(rand) - 1;
  }

  const getArray = () => {
    let array = new Array(anecdotes.length);
    for (let i = 0; i < array.length; i++){
      array[i] = 0;
    }
    return array;
  }

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(getArray())
  const [anecdoteDay, setAnecdoteDay] = useState(0)
  const copy = [...points]

  console.log(copy);

  const mostUpvoted = () => {
    let place = anecdoteDay;  
    let max = copy[anecdoteDay]; 
    copy.forEach((item, index)=>{
      if (item > max){
        max = item;
        place = index;
      }
    });
    return place;
  }

  const handleNext = () => {
    setSelected(getRandomInteger(anecdotes));
    setPoints(copy);
  }

  const handleTop = () => {
    copy[selected]++;
    setAnecdoteDay(mostUpvoted());
    setSelected(selected);
    setPoints(copy);
  }

  return (
    <div>
      <h1> Anecdote of the day :</h1>
      <p>{anecdotes[selected]}</p>
      <button onClick={handleNext}>next anecdote</button>
      <button onClick={handleTop}>vote</button>
      <h1>Anecdote with most votes :</h1>
      <p>{anecdotes[anecdoteDay]}</p>
    </div>
  )
}

export default App