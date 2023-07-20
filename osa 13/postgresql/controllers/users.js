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
  const user = await User.create(req.body);
  res.json(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["created_at", "updated_at"] },

    include: [
      {
        model: Blog,
        attributes: {
          exclude: ["created_at", "updated_at", "userId", "isRead"],
        },
        as: "Readings", // Use the alias "Readings" for the many-to-many association
        through: {
          attributes: ["id", "read"], // Include only the id property from the through table (readlist)
        },
        include: [
          {
            model: User,
            attributes: ["username", "name"], // Include only the desired attributes from the User model
            as: "Adder", // Use the alias "Adder" for the belongsTo association
          },
        ],
      },
    ],
  });

  res.json(user);
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
