import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the ticket cannot be found", async () => {
  const randomId = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${randomId}`).send().expect(404);
});

it("returns the ticket if it is found", async () => {
  const title = "test";
  const price = 30;

  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${res.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
