import express from "express";
import { config } from "dotenv";

import dbConnect from "./config/dbConnect.js";
import contactRoutes from "./routes/contact.js";

config();
dbConnect();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is Working" });
});
app.use("/api/v1/contact", contactRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
