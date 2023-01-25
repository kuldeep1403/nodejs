const express = require("express");
const app = express();
app.use(express.json());
const {
  sequelize,
  User,
  Post,
  Test,
  AllCourses,
  SubCourses,
  SubCoursesModel,
} = require("./models");

app.post("/users", async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const user = await User.create({ name, email, role });

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();

    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid },
      include: "posts",
    });

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({ where: { uuid } });

    await user.destroy();

    return res.json({ message: "User deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const { name, email, role } = req.body;
  try {
    const user = await User.findOne({ where: { uuid } });

    user.name = name;
    user.email = email;
    user.role = role;

    await user.save();

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/posts", async (req, res) => {
  const { userUuid, body } = req.body;

  try {
    const user = await User.findOne({ where: { uuid: userUuid } });

    const post = await Post.create({ body, userId: user.id });

    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({ include: "user" });

    return res.json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

////////////////////////////

app.post("/allcourses", async (req, res) => {
  try {
    const course = await AllCourses.create(req.body);
    return res.json(course);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/allcourses", async (req, res) => {
  try {
    const courses = await AllCourses.findAll();
    return res.json(courses);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/allcourses/Cryptocurrencyinvesting", async (req, res) => {
  try {
    const courses = await AllCourses.findAll({
      where: {
        subHeading: "Cryptocurrency investing",
      },
    });
    return res.json(courses);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/allcourses/Stockmarketinvesting", async (req, res) => {
  try {
    const courses = await AllCourses.findAll({
      where: {
        subHeading: "Stock market investing",
      },
    });
    return res.json(courses);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/allcourses/Allinone", async (req, res) => {
  try {
    const courses = await AllCourses.findAll({
      where: {
        subHeading: "All in one",
      },
    });
    return res.json(courses);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/allcourses/:uuid", async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const courses = await AllCourses.findOne({
      where: { uuid },
      include: {
        model: SubCourses,
        include: SubCoursesModel,
      },
    });
    return res.json(courses);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/allcourses/:uuid", async (req, res) => {
  console.log("hiii");
  try {
    const uuid = req.params.uuid;
    const doc = await AllCourses.findOne({ where: { uuid } });

    await doc.destroy();

    return res.json({ message: "Doc deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/allcourse/subcourses", async (req, res) => {
  try {
    const { uuid, name, duration, videosNumber, subHeading } = req.body;
    const docs = await AllCourses.findOne({ where: { uuid: uuid } });
    const doc = await SubCourses.create({
      name,
      duration,
      videosNumber,
      subHeading,
      descriptionId: docs.id,
    });
    return res.json(doc);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/allcourse/subcourses", async (req, res) => {
  try {
    const docs = await SubCourses.findAll({
      include: "subcourses",
    });
    return res.json(docs);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/allcourse/subcourses/:uuid", async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const doc = await SubCourses.findOne({
      where: { uuid },
      include: "subcourses",
    });

    return res.json(doc);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/allcourse/subcourses/sub", async (req, res) => {
  try {
    const { uuid, name, duration } = req.body;
    const docs = await SubCourses.findOne({ where: { uuid: uuid } });
    const doc = await SubCoursesModel.create({
      name,
      duration,
      subcourseId: docs.id,
    });

    return res.json(doc);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.listen({ port: 5001 }, async () => {
  console.log("Server up on http://localhost:5001");
  await sequelize.authenticate();
  console.log("Database Connected!");
});
