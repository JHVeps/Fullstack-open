import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../requests";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
    },
  });

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    if (content.length < 5) {
      dispatch({
        type: "SHORT",
        payload: "too short anecdote, must have length 5 or more",
      });
      setTimeout(() => {
        dispatch({
          type: "NULL",
        });
      }, 5000);
      return;
    }

    newAnecdoteMutation.mutate({ content, votes: 0 });

    dispatch({
      type: "NEW",
      payload: `anecdote "${content}" added`,
    });
    setTimeout(() => {
      dispatch({
        type: "NULL",
      });
    }, 5000);
  };

  //   const onCreate = (event) => {
  //     event.preventDefault()
  //     const content = event.target.anecdote.value
  //     event.target.anecdote.value = ''
  //     console.log('new anecdote')
  // }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
