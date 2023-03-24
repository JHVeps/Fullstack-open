import { useDispatch } from "react-redux";
import { useEffect } from "react";
// import anecdoteService from "./services/anecdotes";
// import { setAnecdotes } from "./reducers/anecdoteReducer";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   anecdoteService
  //     .getAll()
  //     .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  // }, [dispatch]);
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
