/*!
 * nodejs-es6-express-seed
 * Copyright (c) 2019 Ibukun Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

import jwt from "jsonwebtoken"; // used to create, sign, and verify tokens

// export authentication model
export default function (req, res, next) {
  let token = req.body.token || req.query.token || req.headers["x-access-token"];
  
  if (token) { // check if token exists
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          status: false,
          message: "failed to authenticate token"
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.user = decoded;
        next(); // proceed to the next middleware
      }
    });
  } else {
    if (req.body.username && req.body.password) { // authenticate user
      // todo

      // create a token with only our given payload
      // we don't want to pass in the entire user since that has the password
      const payload = {
        username: req.body.username
      };

      let token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: "24h" // expires in 24 hours,
      });

      res.status(200).json({
        status: true,
        message: "user authentication completed",
        token: token
      });
    } else { // response if failed
      res.status(401).json({
        status: false,
        message: "user authentication required"
      });
    }
  }
}