import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
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
