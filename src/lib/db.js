/*!
 * nodejs-es6-express-seed
 * Copyright (c) 2019 Ibukun Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

import pg from "pg";

// config for pooling and client options
const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  idleTimeoutMillis: 30000
};

// initialize connection pool
const pool = new pg.Pool(config);

// client error
pool.on("error", (err, client) => {
  console.error(`Idle client error: ${err.message}\n${err.stack}`);

  process.exit(-1);
});

// export error handler
export function error(res, err, message, code) {
  console.error(`DB connection error: ${err.message}\n${err.stack}`);

  res.status(code || 500).json({
    "status": false,
    "message": message
  });
}

// export query handler
export function query(text, values, callback) {
  console.log(`Executed query: ${text}`);

  return pool.query(text, values, callback);
}

// export client connection handler
export function connect(callback) {
  pool.connect(callback);
}