import { GET_BOOKS_BY_GENRE } from "../queries";
import { useQuery } from "@apollo/client";

const Books = ({ genres }) => {
  const { loading, data, refetch } = useQuery(GET_BOOKS_BY_GENRE, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <div>loading...</div>;
  }

  // Collect genres from allBooks
  // data.allBooks.forEach((book) => {
  //   genres = [...genres, ...book.genres];
  // });

  // Remove duplicates and sort the genres array
  // const uniqueGenres = Array.from(new Set(genres)).sort();

  const handleGenreClick = (genre) => {
    refetch({ genre });
  };

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
          {data.allBooks.map((b) => (
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
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleGenreClick(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;

//   const [selectedGenre, setSelectedGenre] = useState(null);
//   const {loading, data, refetch } = useQuery(ALL_BOOKS);
//   let genres = ["all genres"];

//   if (loading) {
//     return <div>loading...</div>;
//   }

//   // Collect genres from allBooks
//   data.allBooks.forEach((book) => {
//     genres = [...genres, ...book.genres];
//   });

//   // Remove duplicates and sort the genres array
//   const uniqueGenres = Array.from(new Set(genres)).sort();

//   const handleGenreClick = (genre) => {
//     setSelectedGenre(genre === "all genres" ? null : genre);

//   };

//   const filteredBooks = selectedGenre
//     ? data.allBooks.filter((book) => book.genres.includes(selectedGenre))
//     : data.allBooks;

//   return (
//     <div>
//       <h2>books</h2>
//       <table>
//         <tbody>
//           <tr>
//             <th></th>
//             <th>author</th>
//             <th>published</th>
//           </tr>
//           {filteredBooks.map((b) => (
//             <tr key={b.title}>
//               <td>{b.title}</td>
//               <td>{b.author.name}</td>
//               <td>{b.published}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div>
//         <h3>Genres:</h3>
//         {uniqueGenres.map((genre) => (
//           <button key={genre} onClick={() => handleGenreClick(genre)}>
//             {genre}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

//export default Books;
