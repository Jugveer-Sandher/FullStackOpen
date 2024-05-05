import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
  // const votes = [0, 0, 0, 0, 0, 0, 0, 0];
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [mostVotes, setMostVotes] = useState(0);

  const handleAnecdoteClick = () => {
    const random = Math.floor(Math.random() * 7);
    setSelected(random);
  }

  const handleVoteClick = () => {
    const copy = [...votes];
    copy[selected] += 1;
    if (copy[selected] > copy[mostVotes]) {
      setMostVotes(selected);
    }

    setVotes(copy);
  }

  return (
    <div>
      <h1>Anecdote Of The Day</h1>
      <h5>{anecdotes[selected]}</h5>
      <h5>Has {votes[selected]} votes</h5>

      <button onClick={handleVoteClick}>Vote</button>
      <button onClick={handleAnecdoteClick}>Next Anecdotes</button>

      <h1>Anecdote with most votes</h1>
      <h5>{anecdotes[mostVotes]}</h5>
    </div>
  )
}

export default App