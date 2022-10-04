import pool from "../dbconfig/dbconnector";
import { Response, Request } from "express";
import * as validator from "express-validator";

class TodosController {
  public async get(req: Request, res: Response) {
    try {
      const client = await pool.connect();

      const sql = "SELECT * FROM todos ORDER BY id DESC";
      const { rows } = await client.query(sql);
      const todos = rows;
      console.log(todos);

      client.release();

      res.status(200).send(todos);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const client = await pool.connect();
      const id = req.params.id;
      console.log(id);
      const { rows } = await client.query("SELECT * FROM todos WHERE id=$1", [
        id,
      ]);
      const todo = rows;
      client.release();
      if (todo.length === 0) {
        res.status(404).send({
          message: `todo with id:${id} not found`,
        });
      } else {
        console.log(todo);
        res.status(200).send(todo);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async add(req: Request, res: Response) {
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      try {
        const client = await pool.connect();
        const title: string = req.body.title;
        const isDone: boolean = req.body.isDone;

        await client.query("Insert INTO todos (title, is_done) VALUES($1,$2)", [
          title,
          isDone,
        ]);

        client.release();

        res.status(201).send({
          message: "todo added successfully!!",
          data: { title, isDone },
        });
      } catch (error) {
        res.status(400).send("add " + error);
      }
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const client = await pool.connect();
      const id = req.params.id;
      const title: string = req.body.title;
      const isDone: boolean = req.body.isDone;

      const { rows } = await client.query("SELECT * FROM todos WHERE id=$1", [
        id,
      ]);
      const todo = rows;
      if (todo.length === 0) {
        res.status(404).send({
          message: `todo with id:${id} not found`,
        });
      } else {
        await client.query(
          "UPDATE todos SET title=$1, is_done=$2 WHERE id=$3",
          [title, isDone, id]
        );

        client.release();

        res.status(201).send({
          message: "todo updated successfully!!",
          data: { id, title, isDone },
        });
      }
    } catch (error) {
      res.status(400).send("add " + error);
    }
  }

  public async deleteById(req: Request, res: Response) {
    try {
      const client = await pool.connect();
      const id = req.params.id;
      console.log(id);

      const { rows } = await client.query("SELECT * FROM todos WHERE id=$1", [
        id,
      ]);
      const todo = rows;
      if (todo.length === 0) {
        res.status(404).send({
          message: `todo with id:${id} not found`,
        });
      } else {
        await client.query("DELETE FROM todos WHERE id=$1", [id]);
        client.release();

        res.status(201).send({
          message: `todo with id:${id} is deleted successfully!!`,
        });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default TodosController;
