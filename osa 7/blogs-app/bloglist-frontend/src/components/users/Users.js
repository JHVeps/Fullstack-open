import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initializeUsers } from "../../features/usersSlice";
import Banner from "../banner/Banner";
import { Link } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();

  const usersInState = useSelector((state) => {
    return state.usersInState;
  });

  console.log("users in state: ", usersInState);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div>
      <Banner />

      <button type="button">
        <Link
          style={{
            textDecoration: "none",
          }}
          to="/home"
        >
          home
        </Link>
      </button>
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th>Blogs created</th>
        </tr>
        {usersInState.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Users;
