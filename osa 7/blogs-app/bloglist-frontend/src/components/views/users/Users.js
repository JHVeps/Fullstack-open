import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initializeUsers } from "../../../features/usersSlice";
import Banner from "../../banner/Banner";
import { Link } from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const Users = () => {
  const dispatch = useDispatch();

  const usersInState = useSelector((state) => {
    return state.usersInState;
  });

  console.log("users in state: ", usersInState);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const style = {
    p: 10,
    margin: 5,
    borderRadius: 2,
    bgcolor: "#bada55",
  };
  const headerStyle = { p: 2 };
  const tableStyle = { margin: 5 };

  return (
    <Box sx={style}>
      <Banner />
      <Typography variant="h4" sx={headerStyle}>
        Users
      </Typography>
      <Table sx={tableStyle}>
        <TableHead>
          <TableRow>
            <TableCell>NAME</TableCell>
            <TableCell>BLOGS CREATED</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersInState.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to={`/users/${user.id}`}
                >
                  {user.name}
                </Link>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Users;
