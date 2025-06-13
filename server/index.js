import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import todoRoutes from "./routes/todo.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

console.log("🔍 MONGO_URL:", process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("connected"))
  .catch((err) => console.log("error:",err));

  app.listen(PORT,()=>{
    console.log(`server running on https://localhost:${PORT}`)
  })
