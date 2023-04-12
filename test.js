const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./index'); // Replace './app' with the path to your app file

chai.use(chaiHttp);
chai.should();

describe("Todos", () => {
  describe("GET /todos", () => {
    it("should get all todos", (done) => {
      chai.request(app)
        .get('/todos')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  // Add tests for POST, PUT, and DELETE here
  describe("POST /todos", () => {
    it("should return an error if title or description is missing", (done) => {
      const newTodo = { title: "", description: "A description without a title" };

      chai.request(app)
        .post('/todos')
        .send(newTodo)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.errors.should.be.a('array');
          res.body.errors[0].should.have.property('msg', 'Title is required');
          done();
        });
    });
  });

  // PUT (update) a todo by ID with validation checks
  describe("PUT /todos/:id", () => {
    it("should return an error if completed is not a boolean", (done) => {
      const updatedTodo = { title: "Updated title", description: "Updated description", completed: "invalid" };

      // You need to create a todo and get its ID before this test
      const id = "your_todo_id_here"; // Replace with the ID of an existing todo

      chai.request(app)
        .put(`/todos/${id}`)
        .send(updatedTodo)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.errors.should.be.a('array');
          res.body.errors[0].should.have.property('msg', 'Completed must be a boolean value');
          done();
        });
    });
  });
});
