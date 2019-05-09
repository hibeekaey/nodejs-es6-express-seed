/*!
 * nodejs-es6-express-seed
 * Copyright (c) 2019 Ibukun Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

import mailer from "nodemailer";

// create a SMTP transporter object
const transporter = mailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_USERNAME,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN
  }
});

// export mailer module
export default function (req, res, next) {
  if (req.body.type && req.body.email && req.body.message) {
    // payload configuration
    let payload = {
      from: "Hibeekaey <admin@hibeekaey.me>",
      to: req.body.email,
      subject: req.body.subject || (
        req.body.type == "registration" ? "Registration Completed" : "Notification"
      ),
      html: req.body.message
    };

    transporter.sendMail(payload, (err) => {
      if (err && req.body.type == "notification") {
        res.status(400).json({
          status: false,
          message: "email notification sending failed"
        });
      } else {
        next();
      }
    })
  } else {
    res.status(400).json({
      status: false,
      message: "invalid request"
    });
  }
}