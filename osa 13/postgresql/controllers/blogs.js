const router = require("express").Router();
const { Blog } = require("../models");

//middleware for finding blog
const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/", async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
});

router.delete("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
  }
  res.status(204).end();
});

router.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.blog.likes + req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

module.exports = router;

// use code below if not using express-async-errors
// const router = require("express").Router();
// const { Blog } = require("../models");
// const { blogFinder } = require("../middlewares");

// router.get("/", async (req, res, next) => {
//   try {
//     const blogs = await Blog.findAll();
//     res.json(blogs);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const blog = await Blog.create(req.body);
//     res.json(blog);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:id", blogFinder, async (req, res, next) => {
//   try {
//     if (req.blog) {
//       await req.blog.destroy();
//     }
//     res.status(204).end();
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:id", blogFinder, async (req, res, next) => {
//   try {
//     if (req.blog) {
//       req.blog.likes = req.blog.likes + req.body.likes;
//       await req.blog.save();
//       res.json(req.blog);
//     } else {
//       res.status(404).end();
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;
