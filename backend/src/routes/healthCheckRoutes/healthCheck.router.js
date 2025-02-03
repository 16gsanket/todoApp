import express from "express";
import logger from "../../utils/logger.js";

const healthCheckRouter = express.Router();

healthCheckRouter.get("/health", (req, res) => {
  logger.info("Health Check Route Hit");
  res.status(200).json({ succcess: true, message: "Server is up and running" });
});

export { healthCheckRouter };
