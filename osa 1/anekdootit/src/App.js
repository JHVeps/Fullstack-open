import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  const defaultPointsArray = new Array(anecdotes.length)
    .join("0")
    .split("")
    .map(parseFloat);
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(defaultPointsArray);
  const [mostVotes, setMostVotes] = useState(0);
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState(0);

  const handleNextClick = () => {
    const random = Math.floor(Math.random() * 6);
    setSelected(random);
    setMostVotes(getMostVotes());
    setMostVotedAnecdote(getMostVotedAnecdote());
  };

  const handleVoteClick = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
    setMostVotes(getMostVotes());
    setMostVotedAnecdote(getMostVotedAnecdote());
  };

  const getMostVotes = () => {
    const copy = [...points];
    const votes = Math.max(...copy);

    return votes;
  };

  const getMostVotedAnecdote = () => {
    const copyOfPoints = [...points];
    let i = copyOfPoints.indexOf(Math.max(...copyOfPoints));

    return i;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <div>
        <button onClick={handleVoteClick}>vote</button>
        <button onClick={handleNextClick}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotedAnecdote]}</p>
      <p>has {mostVotes} votes</p>
    </div>
  );
};

export default App;
