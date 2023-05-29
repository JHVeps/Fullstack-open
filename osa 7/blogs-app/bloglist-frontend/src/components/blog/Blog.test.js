import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders: title by: author", () => {
  const blog = {
    title: "Title for show",
    url: "http://example.com",
    author: "John Doe",
    likes: 0,
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText("Title for show by: John Doe");
  expect(element);
});

test("clicking the view button renders blog title, author, url, likes and user correctly", async () => {
  const blog = {
    title: "Title for show everything",
    url: "http://example.com",
    author: "Jane Doe",
    likes: 0,
    user: {
      name: "random user",
    },
  };

  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const titleAndAutor = container.querySelector("#titleAndAuthor");
  const url = container.querySelector("#url");
  const likes = container.querySelector("#likes");
  const username = container.querySelector("#user");

  expect(titleAndAutor).toHaveTextContent(
    "Title for show everything by: Jane Doe"
  );
  expect(url).toHaveTextContent("http://example.com");
  expect(likes).toHaveTextContent("0");
  expect(username).toHaveTextContent("random user");
});

test("clicking the like button twice calls event handler twice", async () => {
  const blog = {
    title: "Title for show everything",
    url: "http://example.com",
    author: "Jane Doe",
    likes: 0,
    user: {
      name: "random user",
    },
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} addLike={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);
  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
