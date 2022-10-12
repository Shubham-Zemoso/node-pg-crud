import pool from "../dbconfig/dbconnector";
import { Todo } from "../model/Todo";

class TodoRepository {
  public async getTodos() {
    try {
      const client = await pool.connect();

      const sql = "SELECT * FROM todos ORDER BY id DESC";
      const { rows } = await client.query(sql);
      const todos = rows;
      console.log(todos);

      client.release();

      return { todos: todos };
    } catch (error) {
      return { error: error };
    }
  }

  public async getById(id: string) {
    try {
      const client = await pool.connect();
      const { rows } = await client.query("SELECT * FROM todos WHERE id=$1", [
        id,
      ]);
      const todo = rows;
      client.release();
      if (todo.length === 0) {
        return {
          found: false,
          message: `todo with id:${id} not found`,
        };
      } else {
        return { found: true, todo: todo };
      }
    } catch (error) {
      return { error: error };
    }
  }

  public async add(todo: Todo) {
    try {
      const client = await pool.connect();
      const title: string = todo.title;
      const isDone: boolean = todo.isDone;

      await client.query("Insert INTO todos (title, is_done) VALUES($1,$2)", [
        title,
        isDone,
      ]);

      client.release();

      return {
        message: "todo added successfully!!",
        todo: { title, isDone },
      };
    } catch (error) {
      return { error: error };
    }
  }

  public async update(id: string, todoUpdate: Todo) {
    try {
      const client = await pool.connect();
      const title: string = todoUpdate.title;
      const isDone: boolean = todoUpdate.isDone;

      const { rows } = await client.query("SELECT * FROM todos WHERE id=$1", [
        id,
      ]);
      const todo = rows;
      if (todo.length === 0) {
        return {
          found: false,
          message: `todo with id:${id} not found`,
        };
      } else {
        await client.query(
          "UPDATE todos SET title=$1, is_done=$2 WHERE id=$3",
          [title, isDone, id]
        );

        client.release();

        return {
          found: true,
          message: "todo updated successfully!!",
          todo: { id, title, isDone },
        };
      }
    } catch (error) {
      return { error: error };
    }
  }

  public async deleteById(id: string) {
    try {
      const client = await pool.connect();

      const { rows } = await client.query("SELECT * FROM todos WHERE id=$1", [
        id,
      ]);
      const todo = rows;
      if (todo.length === 0) {
        return {
          found: false,
          message: `todo with id:${id} not found`,
        };
      } else {
        await client.query("DELETE FROM todos WHERE id=$1", [id]);
        client.release();

        return {
          found: true,
          message: `todo with id:${id} is deleted successfully!!`,
        };
      }
    } catch (error) {
      return { error: error };
    }
  }
}

export default TodoRepository;
