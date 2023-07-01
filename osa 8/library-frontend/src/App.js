import { useState } from "react";
import { useQuery } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { useApolloClient, useSubscription } from "@apollo/client";
import Notify from "./components/Notify";
import Recommended from "./components/Recommended";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  console.log("Updating cache with added book:", addedBook);
  const uniqByTitle = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const linkBtnStyle = {
    textDecoration: "none",
    color: "black",
  };

  const [message, setMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 10000);
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      notify(`added ${addedBook.title}`);
      console.log(`added, ${addedBook.title}`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  const { loading, data } = useQuery(ALL_BOOKS, {
    fetchPolicy: "cache-and-network",
  });
  let genres = ["all genres"];

  if (loading) {
    return <div>loading...</div>;
  }

  data.allBooks.forEach((book) => {
    genres = [...genres, ...book.genres];
  });

  const uniqueGenres = Array.from(new Set(genres)).sort();

  if (!token) {
    return (
      <Router>
        <div>
          <Notify message={message} />
          <button>
            <Link style={linkBtnStyle} to="/">
              authors
            </Link>
          </button>
          <button>
            <Link style={linkBtnStyle} to="/books">
              books
            </Link>
          </button>
          <button>
            <Link style={linkBtnStyle} to="/login">
              login
            </Link>
          </button>
        </div>
        <Routes>
          <Route
            path="/login"
            element={<Login setToken={setToken} setError={notify} />}
          />
          <Route path="/" element={<Authors setError={notify} />} />
          <Route path="/books" element={<Books genres={uniqueGenres} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div>
        <Notify message={message} />
        <button>
          <Link style={linkBtnStyle} to="/">
            authors
          </Link>
        </button>
        <button>
          <Link style={linkBtnStyle} to="/books">
            books
          </Link>
        </button>
        <button>
          <Link style={linkBtnStyle} to="/newBook">
            add book
          </Link>
        </button>
        <button>
          <Link style={linkBtnStyle} to="/recommend">
            recommend
          </Link>
        </button>
        <button onClick={logout}>logout</button>
      </div>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/" element={<Authors setError={notify} />} />
        <Route path="/books" element={<Books genres={uniqueGenres} />} />
        <Route path="/newBook" element={<NewBook setError={notify} />} />
        <Route path="/recommend" element={<Recommended />} />
      </Routes>
    </Router>
  );
};

export default App;
