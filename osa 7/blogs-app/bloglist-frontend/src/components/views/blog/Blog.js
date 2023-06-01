import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../features/notificationSlice";
import { likeBlog, deleteBlog } from "../../../features/blogsSlice";
import Banner from "../../banner/Banner";
import { Link } from "react-router-dom";

const Blog = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const blogsInState = useSelector((state) => {
    return state.blogsInState;
  });

  const blog = blogsInState.find((blog) => blog.id === blogId);

  console.log("blogs in state: ", blogsInState);

  console.log("blog found from state: ", blog);

  const token = useSelector((state) => {
    console.log("token: ", state.userInState.token);
    return state.userInState.token;
  });

  const addLike = async (event) => {
    event.preventDefault();
    try {
      const data = { id: blog.id, updatedBlog: blog };
      dispatch(likeBlog(data, token));
      dispatch(setMessage(`Liked "${blog.title}"!`));
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
    } catch (exception) {
      console.log("Error", exception.response.data);
      dispatch(setMessage(`Error: ${exception.response.data.error}`));
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
    }
  };

  const remove = async (event) => {
    event.preventDefault();
    if (window.confirm(`Delete ${blog.title} ?`)) {
      try {
        dispatch(deleteBlog(blog.id, token));
        dispatch(setMessage(`Deleted "${blog.title}"!`));
        setTimeout(() => {
          dispatch(setMessage(null));
        }, 5000);
      } catch (exception) {
        console.log("Error", exception.response.data.error);
        dispatch(setMessage(`Error: ${exception.response.data.error}`));
        setTimeout(() => {
          dispatch(setMessage(null));
        }, 5000);
      }
    }
  };

  return (
    <div>
      <Banner />
      <h2>{blog.title}</h2>
      <ul className="blog__info">
        <li id="titleAndAuthor">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </li>
        <li id="url">{blog.url}</li>
        <li id="likes">
          likes {blog.likes}
          <button className="like__button" type="button" onClick={addLike}>
            like
          </button>
        </li>
        <li id="user">{blog.user.name}</li>

        <li>
          <button className="delete__button" type="button" onClick={remove}>
            remove
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Blog;
