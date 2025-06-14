import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  // Clear the cookie by setting it to an empty value and a past expiration date
  req.session = null;

  res.send({ message: "Signed out successfully" });
});

export { router as signoutRouter };
