const listHelper = require("../utils/list_helper");

describe("total likes", () => {
  test("of empty list returns zero", () => {
    const blogs = [];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("of a bigger list is calculated correctly", () => {
    const blogs = [
      {
        likes: 7,
      },
      {
        likes: 5,
      },
      {
        likes: 12,
      },
      {
        likes: 10,
      },
      {
        likes: 0,
      },
      {
        likes: 2,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe("Most likes", () => {
  test("of empty list returns zero", () => {
    const blogs = [];

    const result = listHelper.favoriteBlog(blogs);
    expect(result).toBe(0);
  });

  test("when list has only one blog and that blog will be the return value", () => {
    const listWithOneBlog = [
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
    ];
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });

  test("of a bigger list, blog with most likes will be the return value", () => {
    const blogs = [
      {
        title: "React patterns",
        author: "Michael Chan",
        likes: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        likes: 10,
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        likes: 0,
      },
      {
        title: "Type wars",
        author: "Robert C. Martin",
        likes: 2,
      },
    ];
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(blogs[2]);
  });
});
