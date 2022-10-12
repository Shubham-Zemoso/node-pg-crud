import { expect } from "chai";
import { agent as request } from "supertest";
import sinon from "sinon";
import TodoService from "../src/service/TodoService";
import TodoRepository from "../src/repository/TodoRepository";

describe("TodoService", () => {
  it("checks fetching of all todos", async () => {
    const stubValue = [
      {
        id: 1,
        title: "test1",
        isDone: true,
      },
    ];

    const todoRepo = new TodoRepository();

    const stub = sinon.stub(todoRepo, "getTodos").returns(stubValue);

    const todoService = new TodoService(todoRepo);

    const result = await todoService.getAll();

    expect(stub.calledOnce).to.be.true;
    expect(result).not.to.be.empty;
    expect(result).to.be.an("array");
  });

  it("checks fetching of a todo with given id", async () => {
    const stubValue = {
      found: true,
      todo: {
        title: "test1",
        isDone: false,
      },
    };

    const todoRepo = new TodoRepository();

    const stub = sinon.stub(todoRepo, "getById").returns(stubValue);

    const todoService = new TodoService(todoRepo);

    const result = await todoService.getById("1");

    expect(stub.calledOnce).to.be.true;
    expect(result).not.to.be.empty;
    expect(result.found).to.equal(stubValue.found);
    expect(result.todo).to.be.equal(stubValue.todo);
  });

  it("checks adding of a todo", async () => {
    const stubValue = {
      todo: {
        title: "test1",
        isDone: false,
      },
    };

    const todoRepo = new TodoRepository();

    const stub = sinon.stub(todoRepo, "add").returns(stubValue);

    const todoService = new TodoService(todoRepo);

    const result = await todoService.addTodo({
      title: stubValue.todo.title,
      isDone: stubValue.todo.isDone,
    });

    expect(stub.calledOnce).to.be.true;
    expect(result).not.to.be.empty;
    expect(result.todo).to.be.equal(stubValue.todo);
  });

  it("checks updating of a todo with given id", async () => {
    const stubValue = {
      found: true,
      todo: {
        title: "test1",
        isDone: false,
      },
    };

    const todoRepo = new TodoRepository();

    const stub = sinon.stub(todoRepo, "update").returns(stubValue);

    const todoService = new TodoService(todoRepo);

    const result = await todoService.updateTodo("1", {
      title: stubValue.todo.title,
      isDone: stubValue.todo.isDone,
    });

    expect(stub.calledOnce).to.be.true;
    expect(result).not.to.be.empty;
    expect(result.found).to.equal(stubValue.found);
    expect(result.todo).to.be.equal(stubValue.todo);
  });

  it("checks deleting of a todo with given id", async () => {
    const stubValue = {
      found: true,
      todo: {
        title: "test1",
        isDone: false,
      },
    };

    const todoRepo = new TodoRepository();

    const stub = sinon.stub(todoRepo, "deleteById").returns(stubValue);

    const todoService = new TodoService(todoRepo);

    const result = await todoService.deleteTodo("1");

    expect(stub.calledOnce).to.be.true;
    expect(result).not.to.be.empty;
    expect(result.found).to.equal(stubValue.found);
  });
});
