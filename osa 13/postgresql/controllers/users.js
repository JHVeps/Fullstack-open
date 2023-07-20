const router = require("express").Router();
const { User, Blog, ReadList } = require("../models");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Blog,
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
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: [""] },
    include: [
      {
        model: Blog,
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

  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
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
