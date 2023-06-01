import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Banner from "../../banner/Banner";
import { Box, List, ListItem, Typography } from "@mui/material";

const User = () => {
  const { userId } = useParams();
  const usersInState = useSelector((state) => {
    return state.usersInState;
  });

  const user = usersInState.find((user) => user.id === userId);

  console.log("users in state: ", usersInState);

  console.log("user found from state: ", user);

  if (!user) {
    return null;
  }

  const style = {
    p: 10,
    margin: 5,
    borderRadius: 2,
    bgcolor: "#bada55",
  };
  const headerStyle = { p: 2 };

  return (
    <Box sx={style}>
      <Banner />
      <Typography variant="h5" sx={headerStyle}>
        {user.name}
      </Typography>
      <Typography variant="h6">added blogs</Typography>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>{blog.title}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default User;
