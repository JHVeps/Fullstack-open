import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    console.log("state.anecdotes: ", state.anecdotes);
    return state.anecdotes;
  });

  const filterText = useSelector((state) => {
    console.log("state.filter: ", state.filter);
    return state.filter;
  });

  const vote = (id) => {
    console.log("vote", id);
    dispatch(voteAnecdote(id));
  };
  return (
    <div>
      {anecdotes
        .filter((anecdote) => {
          if (filterText === "") {
            return anecdote;
          } else if (
            anecdote.content
              .toLocaleLowerCase()
              .includes(filterText.toLocaleLowerCase())
          ) {
            return anecdote;
          }
          return null;
        })
        .sort(function (a, b) {
          return b.votes - a.votes;
        })
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
