/*!
 * nodejs-es6-express-seed
 * Copyright (c) 2019 Ibukun Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

import "regenerator-runtime/runtime";

import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import morgan from "morgan";
import dotenv from "dotenv";
import rfs from "rotating-file-stream";
import { mount } from "./routes";

// use .env
dotenv.config();

// initialize app
const app = express();

// public directory
app.use(express.static(`${process.cwd()}/public`));

let logDirectory = `${process.cwd()}/logs`; // log directory
 
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
const accessLogStream = rfs("access.log", {
  interval: "1d", // rotate daily
  path: logDirectory
});

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log only 4xx and 5xx responses to console
app.use(morgan("dev", {
  skip: (req, res) => res.statusCode < 400
}));

// log all requests to access.log
app.use(morgan("common", { stream: accessLogStream }));

// enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, DELETE, PUT");
  res.header("Access-Control-Max-Age", "3600");
  res.header("Access-Control-Allow-Headers", "Content-Type, Range, X-Access-Token");
  res.header("Access-Control-Expose-Headers", "Accept-Ranges, Content-Encoding, Content-Length, Content-Range");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.options("*", (req, res) => {
  res.send(201);
});

// for testing
app.get("/", (req, res) => {
  res.send("Hooray!");
});

// use app routes
mount(app);

// listen to the app on port process.env.PORT
app.listen(process.env.PORT);

export default app; // export app entry point