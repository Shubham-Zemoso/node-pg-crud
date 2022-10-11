import express, { Application, Router } from "express";
import todosRouter from "./routers/TodosRouter";
import pool from "./dbconfig/dbconnector";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();

const port =
  process.env.ENV === "testing"
    ? parseInt("5000")
    : parseInt(process.env.PORT || "4000");

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "1mb" }));

app.use("/todos", todosRouter);

pool.connect(function (err, client, done) {
  if (err) throw new Error(err.message);
  console.log("Connected");
});

app.listen(port, () => {
  console.log(`Server is listening to port:${port}`);
});

export default app;
