import pool from "../dbconfig/dbconnector";
import { Response, Request, NextFunction } from "express";
import * as validator from "express-validator";
import TodoService from "../service/TodoService";

class TodosController {
  public todoService: TodoService;

  constructor(todoService: TodoService) {
    this.todoService = todoService;
  }

  async get(req: Request, res: Response, next: NextFunction) {
    const result = await this.todoService.getAll();

    if (result.todos) {
      res.status(200).send(result.todos);
    } else {
      res.status(400).send(result.error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const result = await this.todoService.getById(id);

    if (result.todo) {
      res.status(201).send(result.todo);
    } else if (!result.found) {
      res.status(404).send(result.message);
    } else {
      res.status(400).send(result.error);
    }
  }

  public async add(req: Request, res: Response, next: NextFunction) {
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      const title: string = req.body.title;
      const isDone: boolean = req.body.isDone;

      const result = await this.todoService.addTodo({ title, isDone });

      if (result.todo) {
        res.status(200).send(result.message);
      } else {
        res.status(400).send(result.error);
      }
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const title: string = req.body.title;
    const isDone: boolean = req.body.isDone;

    const result = await this.todoService.updateTodo(id, { title, isDone });

    if (result.found) {
      res.status(201).send(result.message);
    } else if (!result.found) {
      res.status(404).send(result.message);
    } else {
      res.status(400).send(result.error);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    const result = await this.todoService.deleteTodo(id);

    if (result.found) {
      res.status(201).send(result.message);
    } else if (!result.found) {
      res.status(404).send(result.message);
    } else {
      res.status(400).send(result.error);
    }
  }
}

export default TodosController;
