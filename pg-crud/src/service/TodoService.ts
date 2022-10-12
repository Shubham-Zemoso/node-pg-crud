import { Todo } from "../model/Todo";
import TodoRepository from "../repository/TodoRepository";

class TodoService {
  public todoRepsitory: TodoRepository;

  constructor(todoRepsitory: TodoRepository) {
    this.todoRepsitory = todoRepsitory;
  }

  public async getAll() {
    return this.todoRepsitory.getTodos();
  }

  public async getById(id: string) {
    return this.todoRepsitory.getById(id);
  }

  public async addTodo(todo: Todo) {
    return this.todoRepsitory.add(todo);
  }

  public async updateTodo(id: string, todo: Todo) {
    return this.todoRepsitory.update(id, todo);
  }

  public async deleteTodo(id: string) {
    return this.todoRepsitory.deleteById(id);
  }
}

export default TodoService;
