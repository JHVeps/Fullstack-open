import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initializeUsers } from "../../../features/usersSlice";
import Banner from "../../banner/Banner";
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
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {usersInState.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
