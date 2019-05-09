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

// define the login route
router.post("/", auth);

// export login route
export default router;