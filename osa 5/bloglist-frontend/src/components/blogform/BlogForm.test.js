import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm />  onSubmit correct information in input fields", async () => {
  const user = userEvent.setup();
  const createBlog = jest.fn();

  render(<BlogForm createBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText("title...");
  const authorInput = screen.getByPlaceholderText("author...");
  const urlInput = screen.getByPlaceholderText("url...");
  const submitButton = screen.getByText("create");

  await user.type(titleInput, "testing title input...");
  await user.type(authorInput, "testing author input...");
  await user.type(urlInput, "testing url input...");
  await user.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toStrictEqual({
    author: "testing author input...",
    title: "testing title input...",
    url: "testing url input...",
  });
});
