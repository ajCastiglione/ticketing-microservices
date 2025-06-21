import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the provided ID doesn't exist", async () => {
  const ticketId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", global.signin())
    .send({
      title: "Concert",
      price: 100,
    })
    .expect(404);
});
it("returns a 401 the user isnt authenticated", async () => {
  const ticketId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .send({
      title: "Concert",
      price: 100,
    })
    .expect(401);
});
it("returns a 401 if the user doesnt own the ticket", async () => {
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "Concert 2",
      price: 200,
    });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "Updated Concert",
      price: 150,
    })
    .expect(401);
});

it("returns a 400 if the user provides an invalid price or title", async () => {
  const cookie = global.signin();
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "Concert 2",
      price: 200,
    });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 10,
    })
    .expect(400);
  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "Valid Title",
      price: -10,
    })
    .expect(400);
});
it("returns a 200 if the update was successful", async () => {
  const cookie = global.signin();
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "Concert 2",
      price: 200,
    });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "Updated Concert",
      price: 175,
    })
    .expect(200);

  const ticketRes = await request(app)
    .get(`/api/tickets/${res.body.id}`)
    .send();

  expect(ticketRes.body.title).toEqual("Updated Concert");
  expect(ticketRes.body.price).toEqual(175);
});
