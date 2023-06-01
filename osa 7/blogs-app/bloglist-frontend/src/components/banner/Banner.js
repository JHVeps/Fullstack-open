import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../features/loginSlice";
import Notification from "../notifications/Notification";
import { Box, Button, Typography } from "@mui/material";

const Banner = () => {
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

  const bannerStyle = { bgcolor: "#96b317e1", borderRadius: 2 };
  const buttonStyle = { margin: "10px" };
  const headerStyle = { color: "white", textAlign: "center", p: "10px" };

  return (
    <Box sx={bannerStyle}>
      <Notification />
      <Box>
        <Button
          variant="contained"
          color="success"
          sx={buttonStyle}
          onClick={() => navigate("/home")}
        >
          blogs
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={buttonStyle}
          onClick={() => navigate("/users")}
        >
          users
        </Button>
        {loginState.user.username} logged in
        <Button
          variant="contained"
          color="success"
          sx={buttonStyle}
          onClick={() => logout()}
        >
          logout
        </Button>
      </Box>
      <Typography variant="h2" sx={headerStyle}>
        Blogs app
      </Typography>
    </Box>
  );
};

export default Banner;
