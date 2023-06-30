import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { useApolloClient } from "@apollo/client";
import Notify from "./components/Notify";
import Recommended from "./components/Recommended";

const App = () => {
  const linkBtnStyle = {
    textDecoration: "none",
    color: "black",
  };

  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (!token) {
    return (
      <Router>
        <div>
          <Notify errorMessage={errorMessage} />
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
          <Route path="/books" element={<Books />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div>
        <Notify errorMessage={errorMessage} />
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
        <Route path="/books" element={<Books />} />
        <Route path="/newBook" element={<NewBook setError={notify} />} />
        <Route path="/recommend" element={<Recommended />} />
      </Routes>
    </Router>
  );
};

export default App;
