import { ALL_AUTHORS } from "../queries";
import { useQuery } from "@apollo/client";
import EditAuthor from "./EditAuthor";

const Authors = ({ setError }) => {
  const { loading, data } = useQuery(ALL_AUTHORS, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditAuthor setError={setError} />
    </div>
  );
};

export default Authors;
