import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./src/routes/index.js";
import connectDatabase from "./src/configs/database.js";

const app = express();
const port = process.env.PORT;
connectDatabase();
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Sever runing http://localhost:${port}`);
});
