const router = require("express").Router();
const { Op } = require("sequelize");
const { Blog, User } = require("../models");

const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");

const { tokenExtractor } = require("../util/middlewares");

//middleware for finding blog
const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const where = {};

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.substring]: req.query.search,
        },
      },
      {
        author: {
          [Op.substring]: req.query.search,
        },
      },
    ];
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: [
      {
        model: User,
        attributes: { exclude: ["id", "created_at", "updated_at"] },
        as: "Adder",
      }, // Include the user who added the blog with the alias "Adder"
      {
        model: User,
        attributes: { exclude: ["id", "created_at", "updated_at"] },
        as: "Readers",
      }, // Include the readers with the alias "Readers"
    ],
    where,
    order: [
      // Will escape title and validate DESC against a list of valid direction parameters
      ["likes", "DESC"],
    ],
  });
  res.json(blogs);

  //   const blogs = await Blog.findAll({
  //     include: {
  //       model: User,
  //     },
  //     where,
  //     order: [
  //       // Will escape title and validate DESC against a list of valid direction parameters
  //       ["likes", "DESC"],
  //     ],
  //   });
  //   res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res) => {
  console.log(req.body);
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
    created_at: new Date(),
    updated_at: new Date(),
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
