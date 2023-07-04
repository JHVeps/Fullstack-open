const router = require("express").Router();
const { Blog, User } = require("../models");

const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

//middleware for finding blog
const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res) => {
  console.log(req.body);
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
    date: new Date(),
  });
  //const blog = await Blog.create(req.body);
  console.log(blog);
  res.json(blog);
});

router.delete("/:id", blogFinder, tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (user.id === req.blog.userId) {
    await req.blog.destroy();
    res.status(204).end();
  } else {
    res.status(404).end();
  }
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
