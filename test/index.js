/*!
 * nodejs-es6-express-seed
 * Copyright (c) 2019 Ibukun Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

import chai from "chai";
import chaiHttp from "chai-http";

import server from "../src/index"; // server entry point

// set up chai
const should = chai.should();

chai.use(chaiHttp);

describe("Server", () => {
  let token;

  /**
   * Test for active server
   */

  describe("Server", () => {
    it("it should return 200", done => {
      chai.request(server)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  /**
   * Test to authenticate user
   */

  describe("Authentication endpoint", () => {
    let data = { // user data
      username: "hibeekaey",
      password: "hibeekaey"
    };

    it("it should authenticate user", done => {
      chai.request(server)
        .post("/login")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("token");

          token = res.body.token; // use token for tests
          
          done();
        });
    });
  });

  /**
   * Test to get user
   */

  describe("User endpoint", () => {
    it("it should get user", done => {
      chai.request(server)
        .get("/user")
        .set('X-Access-Token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.data.should.have.property("username");

          done();
        });
    });
  });
});