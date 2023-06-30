import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommended = () => {
  const myInfo = useQuery(ME);
  const allBooks = useQuery(ALL_BOOKS);

  if (myInfo.loading || allBooks.loading) {
    return <div>loading...</div>;
  }

  console.log("myInfo: ", myInfo.data.me);

  const favoriteGenre = myInfo.data.me.favoriteGenre;

  const filteredBooks = favoriteGenre
    ? allBooks.data.allBooks.filter((book) =>
        book.genres.includes(favoriteGenre)
      )
    : allBooks.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      <div>
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
      </div>
    </div>
  );
};

export default Recommended;
