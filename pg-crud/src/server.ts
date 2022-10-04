import express, {Application, Router} from "express";
import todosRouter from "./routers/TodosRouter";
import pool from "./dbconfig/dbconnector";

export default class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
    this.dbConnect();
  }

  private config() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json({ limit: "1mb" })); // 100kb default
  }

  private dbConnect() {
    pool.connect(function (err, client, done) {
      if (err) throw new Error(err.message);
      console.log("Connected");
    });
  }

  private routerConfig() {
    this.app.use("/todos", todosRouter);
  }

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port);
        })
        .on("error", (err: Object) => reject(err));
    });
  };
}

