process.env.NODE_ENV = "test";

import { expect } from "chai";
import { Request } from "express";
import request from "supertest";
import app from "../src/app";
import sinon from "sinon";
import TodoService from "../src/service/TodoService";
import TodosController from "../src/controller/TodosController";

describe("TodoController", () => {
  let res;
  let todoService;
  res = {
    status: function () {
      return res;
    },
    send: function () {},
  };
  const todoRepo = sinon.spy();
  todoService = new TodoService(todoRepo);

  it("checks fetching of all todos", async () => {
    const stubValue = [
      {
        id: 1,
        title: "test1",
        isDone: true,
      },
    ];
    const req = { body: {} } as unknown as Request;
    const todoController = new TodosController(todoService);
    const stub = sinon.stub(todoController, "get").returns(stubValue);
    const result = await todoController.get(req, res, sinon.stub());
    expect(stub.calledOnce).to.be.true;
    expect(result).not.to.be.empty;
    expect(result).to.be.an("array");
  });

  it("checks fetching of a todo", async () => {
    const stubValue = {
      found: true,
      todo: {
        title: "test1",
        isDone: false,
      },
    };
    const req = { params: { id: "1" } } as unknown as Request;
    const todoController = new TodosController(todoService);
    const stub = sinon.stub(todoController, "getById").returns(stubValue);
    const result = await todoController.getById(req, res, sinon.stub());
    expect(stub.calledOnce).to.be.true;
    expect(result).not.to.be.empty;
  });
  it("checks not found todo", async () => {
    const stubValue = {
      found: false,
      message: `todo with id:990 not found`,
    };
    const req = { params: { id: "990" } } as unknown as Request;
    const todoController = new TodosController(todoService);
    const stub = sinon.stub(todoController, "getById").returns(stubValue);
    const result = await todoController.getById(req, res, sinon.stub());

    expect(stub.calledOnce).to.be.true;
    expect(result).not.to.be.empty;
  });

  it("checks adding of a todo", async () => {
    const stubValue = {
      todo: {
        title: "test1",
        isDone: false,
      },
    };
    const req = {
      body: { title: stubValue.todo.title, isDone: stubValue.todo.isDone },
    } as unknown as Request;
    const todoController = new TodosController(todoService);
    const stub = sinon.stub(todoController, "add").returns(stubValue);
    const result = await todoController.add(req, res, sinon.stub());

    expect(stub.calledOnce).to.be.true;
    expect(result).not.to.be.empty;
  });

  it("checks updating of a todo with given id", async () => {
    const stubValue = {
      found: true,
      todo: {
        title: "test1",
        isDone: false,
      },
    };
    const req = {
      params: { id: "1" },
      body: { title: stubValue.todo.title, isDone: stubValue.todo.isDone },
    } as unknown as Request;
    const todoController = new TodosController(todoService);
    const stub = sinon.stub(todoController, "update").returns(stubValue);
    const result = await todoController.update(req, res, sinon.stub());

    expect(stub.calledOnce).to.be.true;
    expect(result).not.to.be.empty;
  });

  it("checks deleting of a todo with given id", async () => {
    const stubValue = {
      found: true,
      todo: {
        title: "test1",
        isDone: false,
      },
    };
    const req = { params: { id: "1" } } as unknown as Request;
    const todoController = new TodosController(todoService);
    const stub = sinon.stub(todoController, "deleteById").returns(stubValue);
    const result = await todoController.deleteById(req, res, sinon.stub());

    expect(stub.calledOnce).to.be.true;
    expect(result).not.to.be.empty;
  });
});
