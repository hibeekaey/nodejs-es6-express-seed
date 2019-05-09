/*!
 * nodejs-es6-express-seed
 * Copyright (c) 2019 Ibukun Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

import login from "./login";
import user from "./user";

// export route model
export function mount(app) {
  app.use("/login", login); // login route
  app.use("/user", user); // user route
}