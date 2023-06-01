import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../features/loginSlice";
import Notification from "../notifications/Notification";
import { Link } from "react-router-dom";

function Banner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(clearUser());
    navigate("/");
  };

  const loginState = useSelector((state) => {
    console.log("state.loginState: ", state.loginState);
    return state.loginState;
  });

  return (
    <div>
      <Notification />
      <div>
        <button type="button">
          <Link
            style={{
              textDecoration: "none",
            }}
            to="/home"
          >
            blogs
          </Link>
        </button>
        <button type="button">
          <Link
            style={{
              textDecoration: "none",
            }}
            to="/users"
          >
            users
          </Link>
        </button>
        {loginState.user.username} logged in
        <button
          className="login__button"
          type="button"
          onClick={() => logout()}
        >
          logout
        </button>
      </div>
      <h2>blog app</h2>
    </div>
  );
}

export default Banner;
