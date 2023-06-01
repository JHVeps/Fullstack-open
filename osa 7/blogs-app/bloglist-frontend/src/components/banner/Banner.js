import { clearUser } from "../../features/loginSlice";
import Notification from "../notifications/Notification";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
      <h2>blogs</h2>
      <Notification />
      <p>{loginState.user.username} logged in </p>
      <button className="login__button" type="button" onClick={() => logout()}>
        logout
      </button>
    </div>
  );
}

export default Banner;
