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

  const handleClick = () => {
    const random = Math.floor(Math.random() * 6);
    setSelected(random);
  };

  const handleCopy = () => {
    const copy = { ...points };
    copy[selected] += 1;
    setPoints(copy);
  };

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <div>
        <button onClick={handleCopy}>vote</button>
        <button onClick={handleClick}>next anecdote</button>
      </div>
    </div>
  );
};

export default App;
