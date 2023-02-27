const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likesAmount = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  return blogs.length === 0 ? 0 : likesAmount;
};

// same as above
// const totalLikes = (blogs) => {
//   let likesAmount = blogs.reduce(function (sum, blog) {
//     return sum + blog.likes;
//   }, 0);
//   if (blogs.length === 0) {
//     return 0;
//   } else {
//     return likesAmount;
//   }
// };

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  const max = blogs.reduce(
    (prev, current) => (prev.likes > current.likes ? prev : current),
    0
  );
  return max;
};

//same as above
// const favoriteBlog = (blogs) => {
//   console.log("Blog: ", blogs);
//   if (blogs.length === 0) {
//     return 0;
//   }
//   const max = blogs.reduce(function (prev, current) {
//     return prev.likes > current.likes ? prev : current;
//   }); //returns object
//   return max;
// };

const mostBlogs = (blogs) => {
  const authors = [];
  const duplicateCount = {};

  const addAuthors = blogs.forEach((blog) => {
    let count = 1;

    const tempObject = {
      author: blog.author,
      blogs: count,
    };

    authors.push(tempObject);
  });

  authors.sort();

  authors.forEach(
    (e) =>
      (duplicateCount[e.author] = duplicateCount[e.author]
        ? duplicateCount[e.author] + 1
        : 1)
  );
  const result = Object.keys(duplicateCount).map((e) => {
    return { key: e, count: duplicateCount[e] };
  });

  console.log("result: ", result);

  result.sort(function (a, b) {
    return a.count - b.count;
  });

  console.log("sorted result: ", result);

  const blogger = {
    author: result[result.length - 1].key,
    blogs: result[result.length - 1].count,
  };

  return blogger;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
