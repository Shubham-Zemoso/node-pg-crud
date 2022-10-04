import { Router } from "express";
import TodosController from "../controllers/TodosController";
import * as validator from "express-validator";

const router = Router();
const todosController = new TodosController();

router.get("/all", todosController.get);
router.get("/id/:id", todosController.getById);
router.post(
  "/add",
  [
    validator
      .check("title", "Enter a valid title. Length should be 5 to 12")
      .isString()
      .isLength({ min: 5, max: 12 }),
    validator.check("isDone", "Please enter only true or false").isBoolean(),
  ],
  todosController.add
);
router.put("/update/:id", todosController.update);
router.delete("/delete/:id", todosController.deleteById);
export default router;
