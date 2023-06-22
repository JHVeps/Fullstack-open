import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  const linkBtnStyle = {
    textDecoration: "none",
    color: "black",
  };

  return (
    <Router>
      <div>
        <button>
          <Link style={linkBtnStyle} to="/authors">
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
            new book
          </Link>
        </button>
      </div>
      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </Router>
  );
};

export default App;
