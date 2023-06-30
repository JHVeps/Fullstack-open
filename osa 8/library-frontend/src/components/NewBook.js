import { useState } from "react";
import { ALL_BOOKS, CREATE_BOOK, ALL_AUTHORS } from "../queries";
import { useMutation } from "@apollo/client";

const NewBook = ({ setError }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const extensions = error.graphQLErrors[0].extensions;
        if (extensions) {
          const errors = extensions.error.errors;
          if (errors) {
            const messages = Object.values(errors)
              .map((e) => e.message)
              .join("\n");
            setError(messages);
          } else {
            setError("An unknown error occurred.");
          }
        } else {
          setError("An unknown error occurred.");
        }
      } else {
        setError("An unknown error occurred.");
      }
    },
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    // update: (cache, response) => {
    //   cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
    //     return {
    //       allBooks: allBooks.concat(response.data.addBook),
    //     }
    //   })
    // },
  });

  const submit = async (event) => {
    event.preventDefault();

    addBook({
      variables: { title, published: parseInt(published), author, genres },
    });

    console.log("add book...");

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
