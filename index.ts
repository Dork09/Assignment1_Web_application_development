const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    const db = mongoose.connection;
   db.on("error", (error: Error) => console.error(error));
   db.once("open", () => console.log("Connected to MongoDB"));

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  console.error("Mongo connection failed:", message);
  process.exit(1);
}

}

startServer();
