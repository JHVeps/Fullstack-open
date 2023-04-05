import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAnecdotes, voteAnecdote } from "./requests";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
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

      <Notification />
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
