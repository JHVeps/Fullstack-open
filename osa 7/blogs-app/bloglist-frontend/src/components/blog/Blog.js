import { Link } from "react-router-dom";
import { Box, List, ListItem } from "@mui/material";

const Blog = ({ blog }) => {
  const blogStyle = {
    border: 4,
    borderRadius: 2,
    marginBottom: 2,
    borderColor: "#96b317e1",
  };

  if (!blog) {
    return null;
  }

  return (
    <Box sx={blogStyle}>
      <List>
        <ListItem>
          <Link
            style={{
              textDecoration: "none",
            }}
            to={`/blogs/${blog.id}`}
          >
            {blog.title}
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default Blog;
