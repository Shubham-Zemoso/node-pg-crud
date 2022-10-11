process.env.NODE_ENV = "test";

import { expect } from "chai";
import { agent as request } from "supertest";
import sinon from "sinon";
import app from "../src/app";
import * as dotenv from "dotenv";
import TodosController from "../src/controllers/TodosController";
import { Request, Response } from "express";

dotenv.config();

describe("CRUD calls testing", () => {
  const req = {
    body: {
      title: "test",
      isDone: false,
    },
    params: {
      id: "1",
    },
  } as unknown as Request;

  const res = [
    {
      id: 1,
      title: "test1",
      isDone: true,
    },
  ] as unknown as Response;

  it("checks fetching of all todos", async () => {
    // const getStub = sinon.stub(new TodosController(), "get").resolves(res);

    // const todos = new TodosController().get(req, res, sinon.stub());
    // todos.then((data) => _{
    // })
    // sinon.assert.called(getStub);

    const res = await request(app).get("/todos/all").send({});
    console.log(res.body);
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("array");
  });

  it("checks fetching of a todo", async () => {
    const res = await request(app).get("/todos/id/2");
    console.log(res.body);
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
  });

  it("checks not found todo", async () => {
    const res = await request(app).get("/todos/id/2000");
    console.log(res.body);
    expect(res.status).to.equal(404);
    expect(res.body).not.to.be.empty;
  });

  it("checks adding a todo", async () => {
    const res = await request(app).post("/todos/add").send({
      title: "testadd",
      isDone: false,
    });
    console.log(res.body);
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
  });

  it("checks updating a todo", async () => {
    const res = await request(app).put("/todos/update/1").send({
      title: "testUpdate",
      isDone: false,
    });
    console.log(res.body);
    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
  });

  it("checks deleting a todo", async () => {
    const res = await request(app).delete("/todos/delete/13");
    console.log(res.body);
    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
  });
});
