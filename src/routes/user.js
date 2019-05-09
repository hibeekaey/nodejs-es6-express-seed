/*!
 * nodejs-es6-express-seed
 * Copyright (c) 2019 Ibukun Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

import express from "express";
import auth from "../lib/auth"; // import authentication module

// use express router
const router = express.Router();

// define the user route
router.get('/', auth, (req, res) => {
  res.status(200).json({
    status: true,
    message: 'user information',
    data: {
      username: req.user.username,
    }
  })
});

// export user route
export default router;
