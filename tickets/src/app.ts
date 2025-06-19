import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@minervawebdevelopment/common";

import { createTicketRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true); // Trust the reverse proxy (like Nginx or Kubernetes Ingress)
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

// Middleware to check if the user is authenticated
app.use(currentUser);

// Routes
app.use(createTicketRouter);

// Catch-all route for undefined routes
app.all("*", async () => {
  throw new NotFoundError();
});

// Middleware
app.use(errorHandler);

export { app };
