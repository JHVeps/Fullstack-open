import { useState } from "react";
import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const result = useQuery(ALL_BOOKS);
  let genres = ["all genres"];

  if (result.loading) {
    return <div>loading...</div>;
  }

  // Collect genres from allBooks
  result.data.allBooks.forEach((book) => {
    genres = [...genres, ...book.genres];
  });

  // Remove duplicates and sort the genres array
  const uniqueGenres = Array.from(new Set(genres)).sort();

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre === "all genres" ? null : genre);
  };

  const filteredBooks = selectedGenre
    ? result.data.allBooks.filter((book) => book.genres.includes(selectedGenre))
    : result.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Genres:</h3>
        {uniqueGenres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreClick(genre)}
            style={{
              fontWeight: selectedGenre === genre ? "bold" : "normal",
            }}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
