import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler, NotFoundError } from "@minervawebdevelopment/common";

const app = express();
app.set("trust proxy", true); // Trust the reverse proxy (like Nginx or Kubernetes Ingress)
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

// Routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Catch-all route for undefined routes
app.all("*", async () => {
  throw new NotFoundError();
});

// Middleware
app.use(errorHandler);

export { app };
