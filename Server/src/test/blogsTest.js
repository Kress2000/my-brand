require("dotenv").config();
process.env.DB_URL = "test";
const app = require("../../index");
const chai = require("chai");
const expect = chai.expect;
var chaiHttp = require("chai-http");
const request = require("supertest");
chai.use(chaiHttp);
let should = chai.should();
const router = require("../routes/routers");


//testing Routes -------
describe("Routes test", () => {
  it("should let admin get all blogs when authorized", (done) => {
    chai
      .request(app)
      .get("/mybrand/api/blogs")
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
  it("it Should delete a blog", (done) => {
    request(app)
      .delete("/mybrand/api/blogs/:id")
      .end((err, res) => {
        if (res.status === 401) {
          res.should.have.status(401); //not authorized
          res.body.should.be.a("object");
        } else {
          if(res.body){
            res.should.have.status(202); //authorize and successful
            res.body.should.be.a("object");
          }
        }
        done();
      });
  });

});
















//test libraries

//Our parent block
// describe('Books', () => {
//     beforeEach((done) => { //Before each test we empty the database
//         user.remove({}, (err) => {
//            done();
//         });
//     });
// /*
//   * Test the /GET route
//   */
//   describe('/GET user', () => {
//       it('it should GET all the users', (done) => {
//         request(userController)
//             .get('/api/users')
//             .end((err, res) => {
//                   res.should.have.status(200);
//                   res.body.email.should.be.a('string');
//                 //   res.body.length.should.be.eql(0);
//                 done();
//               });
//       });
//   });

// });

// // API tests
// describe("POST /api/blogs/add", function () {
//   it("Adds a blog", function (done) {
//     request(blogsController)
//       .post("api/blogs/add")
//       .set("Accept", "application/json")
//       .send({
//         title: "Blog title",
//         description: "Blog Description",
//         img: "url",
//         category: "category",
//       })
//       .expect(201)
//       .end((err, res) => {
//         if (err) throw err;
//         done();
//       });
//   });
// });
// //get all blogs
// describe("GET /api/blogs", function () {
//   it("List all blogs", function (done) {
//     request(blogsController)
//       .get("/api/blogs")
//       .set("Accept", "application/json")
//       .expect(200)
//       .end((err, res) => {
//         if (err) throw err;
//         done();
//       });
//   });
// });
// //get single blog
// describe("GET /api/blogs/:id", function () {
//   it("Gets a particular blog", function (done) {
//     request(blogsController)
//       .get("/api/blogs/:id")
//       .set("Accept", "application/json")
//       .expect(200)
//       .end((err, res) => {
//         if (err) throw err;
//         done();
//       });
//   });
// });
// //update a blog
// describe("PUT /api/blogs/:id", function () {
//   it("Updates a particular a blog", function (done) {
//     request(blogsController)
//       .put("/api/blogs/:id")
//       .set("Accept", "application/json")
//       .send({
//         title: "Blog title",
//         description: "Blog Description",
//         img: "url",
//         category: "category",
//       })
//       .expect(200)
//       .end((err, res) => {
//         if (err) throw err;
//         done();
//       });
//   });
// });
// // delete a blog
// describe("DELETE /api/blogs/:id", function () {
//   it("Deletes a particular blog", function (done) {
//     request(blogsController)
//       .delete("/api/blogs/:id")
//       .expect(200)
//       .end((err, res) => {
//         if (err) throw err;
//         done();
//       });
//   });
// });
