const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likesAmount = blogs.reduce((sum, blog) => sum + blog.likes, 0);
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

module.exports = {
  dummy,
  totalLikes,
};
