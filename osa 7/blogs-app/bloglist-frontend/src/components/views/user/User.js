import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Banner from "../../banner/Banner";

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

  return (
    <div>
      <Banner />
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
