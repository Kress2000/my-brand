require("dotenv").config();
process.env.DB_URL = "test";
const app = require("../../index");
const chai = require("chai");
const expect = chai.expect;
var chaiHttp = require("chai-http");
const request = require("supertest");
chai.use(chaiHttp);
let should = chai.should();
const authAdmin = require("../middlewares/authAdmin");
let userAdmin = {
  email: "erickress1@gmail.com",
  password: "kress123",
};

//testing Routes -------
describe("Users Routes test", () => {
  it("should let admin get all users when authorized and signes in", (done) => {
    chai
      .request(app)
      .get("/mybrand/api/users")
      .end((err, res) => {
        if (res.status === 401) {
          res.should.have.status(401); //not authorized
          res.body.should.be.a("object");
        } else {
          res.should.have.status(200); //authorize and successful
          res.body.should.be.a("array");
        }
        done();
      });
  });
  it("Should let the user logout if he wants", (done) => {
    chai
      .request(app)
      .delete("/mybrand/actions/logout")
      .end((err, res) => {
        if (res.body === {}) {
          res.should.have.status(404); //no data
          res.body.should.be.eql({});
        }
        done();
      });
  });
  it("it Should create account", (done) => {
    request(app)
      .post("/mybrand/actions/signup")
      .end((err, res) => {
        if (res.status === 201) {
          res.body.should.be.eql({
            message: "Account created",
            user: "user",
            token: "token",
          });
        } else {
          res.body.should.be.eql({});
        }
        done();
      });
  });
  it("it Should login ", (done) => {
    request(app)
      .post("/mybrand/actions/login")
      .end((err, res) => {
        if (res.status === 401) {
          res.body.should.be.eql({ Error: "Not authorized! Only Admin" });
        } else {
          if (res.status === 200) res.body.should.be.a("object");
        }
        done();
      });
  });
});
