import { Router } from "express";
import TodosController from "../controller/TodosController";
import * as validator from "express-validator";
import TodoService from "../service/TodoService";
import TodoRepository from "../repository/TodoRepository";

const router = Router();
const todoRepository = new TodoRepository();
const todoService = new TodoService(todoRepository);
const todosController = new TodosController(todoService);

router.get("/all", todosController.get.bind(todosController));
router.get("/id/:id", todosController.getById.bind(todosController));
router.post(
  "/add",
  [
    validator
      .check("title", "Enter a valid title. Length should be 5 to 12")
      .isString()
      .isLength({ min: 5, max: 12 }),
    validator.check("isDone", "Please enter only true or false").isBoolean(),
  ],
  todosController.add.bind(todosController)
);
router.put("/update/:id", todosController.update.bind(todosController));
router.delete("/delete/:id", todosController.deleteById.bind(todosController));
export default router;
