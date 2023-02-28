const dummy = (arrayOfBlogs) => {
  return 1;
};

const totalLikes = (arrayOfBlogs) => {
  const likesAmount = arrayOfBlogs.reduce((sum, blog) => sum + blog.likes, 0);
  return arrayOfBlogs.length === 0 ? 0 : likesAmount;
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

const favoriteBlog = (arrayOfBlogs) => {
  if (arrayOfBlogs.length === 0) {
    return 0;
  }
  const max = arrayOfBlogs.reduce(
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

const mostBlogs = (arrayOfBlogs) => {
  const duplicateCount = {};

  arrayOfBlogs.forEach(
    (e) =>
      (duplicateCount[e.author] = duplicateCount[e.author]
        ? duplicateCount[e.author] + 1
        : 1)
  );

  const result = Object.keys(duplicateCount).map((e) => {
    return { key: e, blogs: duplicateCount[e] };
  });

  result.sort(function (a, b) {
    return a.blogs - b.blogs;
  });

  const bloggerWithMostBlogs = {
    author: result[result.length - 1].key,
    blogs: result[result.length - 1].blogs,
  };

  return bloggerWithMostBlogs;
};

const mostLikes = (arrayOfBlogs) => {
  const sumLikes = arrayOfBlogs.reduce((e, { author, likes }) => {
    e[author] = e[author] || 0;
    e[author] += likes;
    return e;
  }, {});

  const result = Object.keys(sumLikes).map((e) => {
    return { key: e, likes: sumLikes[e] };
  });

  console.log("result: ", result);

  result.sort(function (a, b) {
    return a.likes - b.likes;
  });

  console.log("sorted result: ", result);

  const bloggerWithMostLikes = {
    author: result[result.length - 1].key,
    likes: result[result.length - 1].likes,
  };
  return bloggerWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
