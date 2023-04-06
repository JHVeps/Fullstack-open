import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import NotificationContext from "./NotificationContext";
import { getAnecdotes, voteAnecdote } from "./requests";
import Notification from "./components/Notification";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: (anecdote, updatedAnectode) => {
      let anecdotes = queryClient.getQueryData("anecdotes");
      anecdotes = anecdotes.filter(
        (anecdote) => anecdote.id !== updatedAnectode.id
      );
      queryClient.setQueryData("anecdotes", anecdotes.concat(updatedAnectode));
    },
  });

  const handleVote = async (anecdote) => {
    const updatedAnectode = {
      id: anecdote.id,
      content: anecdote.content,
      votes: anecdote.votes + 1,
    };
    console.log("anecdote: ", anecdote);
    newAnecdoteMutation.mutate(updatedAnectode);

    dispatch({
      type: "VOTE",
      payload: `anecdote "${anecdote.content}" voted`,
    });
    setTimeout(() => {
      dispatch({
        type: "NULL",
      });
    }, 5000);
  };

  const result = useQuery("anecdotes", getAnecdotes, {
    retry: 1,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return (
      <div>anecdote service is not available due to problems in server</div>
    );
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification notification={notification} />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
