const rateLimit = require("express-rate-limit");

export const limiter = rateLimit({
    windowMs: 30 * 1000,
    max: 5,
  });
