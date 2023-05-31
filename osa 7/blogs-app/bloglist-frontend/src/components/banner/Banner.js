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

  const userInState = useSelector((state) => {
    console.log("state.userInState: ", state.userInState);
    return state.userInState;
  });

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{userInState.user.username} logged in </p>
      <button className="login__button" type="button" onClick={() => logout()}>
        logout
      </button>
    </div>
  );
}

export default Banner;
