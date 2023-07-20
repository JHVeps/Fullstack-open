const router = require("express").Router();
const { User, Blog, ReadList } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        attributes: { exclude: ["id", "created_at", "updated_at"] },
        as: "Readings", // Use the alias "Readings" for the many-to-many association
        through: { attributes: [] }, // Exclude attributes from the join table

        include: [
          {
            model: User,
            attributes: ["id", "username"], // Include only the desired attributes from the User model
            as: "Adder", // Use the alias "Adder" for the belongsTo association
          },
        ],
      },
    ],
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await User.create({
    ...req.body,
    created_at: new Date(),
    updated_at: new Date(),
  });
  res.json(user);
});

router.get("/:id", async (req, res) => {
  const { read } = req.query;

  if (read === "true") {
    // If the read=true parameter is present, filter blogs where read=true
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["created_at", "updated_at"] },
      include: [
        {
          model: Blog,
          attributes: {
            exclude: ["created_at", "updated_at", "userId", "isRead"],
          },
          as: "Readings",
          through: {
            attributes: ["id", "read"],
          },
          include: [
            {
              model: User,
              attributes: ["username", "name"],
              as: "Adder",
            },
          ],
          where: {
            "$Readings->readlist.read$": true,
          },
        },
      ],
    });
    res.json(user);
  } else if (read === "false") {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["created_at", "updated_at"] },
      include: [
        {
          model: Blog,
          attributes: {
            exclude: ["created_at", "updated_at", "userId", "isRead"],
          },
          as: "Readings",
          through: {
            attributes: ["id", "read"],
          },
          include: [
            {
              model: User,
              attributes: ["username", "name"],
              as: "Adder",
            },
          ],
          where: {
            "$Readings->readlist.read$": false,
          },
        },
      ],
    });
    res.json(user);
  } else {
    // If the read=true/false parameter is not present or set to false, fetch all blogs
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["created_at", "updated_at"] },
      include: [
        {
          model: Blog,
          attributes: {
            exclude: ["created_at", "updated_at", "userId", "isRead"],
          },
          as: "Readings",
          through: {
            attributes: ["id", "read"],
          },
          include: [
            {
              model: User,
              attributes: ["username", "name"],
              as: "Adder",
            },
          ],
        },
      ],
    });
    res.json(user);
  }
});

router.put("/:username", async (req, res) => {
  const [rowsAffected] = await User.update(
    { username: req.body.username },
    { where: { username: req.params.username } }
  );

  if (rowsAffected === 0) {
    return res.status(404).end();
  }

  res.status(204).end();
});

module.exports = router;
