const express = require("express")
const app = express();
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const PORT = 3005;
const path = require("path");
const cors = require('cors');
require("dotenv").config();

app.use(require("body-parser").json());
app.use(cors());
app.use(require("morgan")("dev"));

app.use(async (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith(`Bearer `) ? auth.slice(7) : null;

  try {
    const { id } = jwt.verify(token, process.env.JWT);
    req.userId = id;

    const user = await prisma.user.findUnique({
      where: { id }, // Could possibly need to turn into Number(id)
    });

    req.isAdmin = user.isAdmin;
  } catch (error) {
    req.userId = null;
  }

  next();
});
app.use(express.static(path.join(__dirname, "..", "client/dist")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client/dist/index.html"));
});

app.get('/hockey', (req, res) => {
  res.send('Hockey');
})

// app.get("/api/users", async (req, res) => {
//   try {
//     if (!req.userId) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const user = await prisma.user.findUnique({
//       where: { id: req.userId },
//     });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// const brandsRouter = require("./api/hockey/brands");
// app.use(`/api/hockey/brands`, brandsRouter);

app.use(`/api`, require(`./api`));
app.use(`/auth`, require(`./auth`));

app.listen(PORT, (err) => {
  if(!err){
    console.log(`Server is fuckin vibin on port ${PORT}`);
  }
  else{
  console.log(`Something went wrong`);
  }
});