import { Router } from "express";
import { v1 } from "./routes/v1";

const router = Router();

router.use("/api/v1", v1);

router.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

export { router };
