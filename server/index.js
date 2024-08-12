import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();
// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes
app.use("/posts", postRoutes);

// Test route for the root URL
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

const CONNECTION_URL =
  "mongodb+srv://memoriesproject:v92xvaj6@memoriescluster.2wjomxe.mongodb.net/?retryWrites=true&w=majority&appName=MemoriesCluster";
const PORT = process.env.PORT;

// mongoose.connect(CONNECTION_URL).then(()=>{console.log(`server running on port: ${PORT}`)})
// Connect to MongoDB and start the server
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => {
    console.error("Connection error", error.message);
  });

// Listen to the MongoDB connection events
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from MongoDB");
});
