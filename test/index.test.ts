import app from "../server";
import supertest from 'supertest'
import { DataModel } from "../src/models/data.model";

test('toContain',async ()=>{
    await supertest(app)
        .get('/data')
        .expect(200)
        .then((result)=>{
            expect(result && result.body )
        })
}, 20000); // increase timeout value to 10000 ms

test("get /data/:id", async () => {
  const data = {
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "1234567890",
  };
  const savedData = await DataModel.create(data);
  jest.setTimeout(2000)
  const res = await supertest(app).get(`/data/${savedData.id}`).expect(200);

  expect(res.body.success).toBe(true);
  expect(res.body.data).toMatchObject(data);
},10000);
//for testing delete

describe("DELETE /data/:id", () => {
  it("should delete data successfully", async () => {
    const data = {
      name: "John Doe",
      email: "johndoe@example.com",
      mobile: "1234567890",
      age: 30,
      address: "123 Main St, Anytown USA",
    };

    // Create a new data document in the database
    const createdData = await DataModel.create(data);
    jest.setTimeout(2000);
    // Send a DELETE request to delete the data document
    const response = await supertest(app)
      .delete(`/data/${createdData._id}`)
      .expect(200);

    // Check that the response indicates success
    expect(response.body.success).toBe(true);

    // Check that the data document has been deleted from the database
    const deletedData = await DataModel.findById(createdData._id);
    expect(deletedData).toBe(null);
  });
});


//patch

describe("PATCH /data/:id", () => {
  it("should update data successfully", async () => {
    const data = {
      name: "John Doe",
      email: "johndoe@example.com",
      mobile: "1234567890",
      age: 30,
      address: "123 Main St, Anytown USA",
    };

    // Create a new data document in the database
    const createdData = await DataModel.create(data);

    // Send a PATCH request to update the data document
    const updatedData = {
      email: "johndoe2@example.com",
      mobile: "0987654321",
    };
    jest.setTimeout(2000);
    const response = await supertest(app)
      .patch(`/data/${createdData._id}`)
      .send(updatedData)
      .expect(200);

    // Check that the response indicates success
    expect(response.body.success).toBe(true);

    // Check that the data document has been updated in the database
    const fetchedData = await DataModel.findById(createdData._id);
    expect(fetchedData?.email).toBe(updatedData.email);
    expect(fetchedData?.mobile).toBe(updatedData.mobile);
  });
});


//testing post
describe("POST /data", () => {
  it("should create new data successfully", async () => {
    const data = {
      name: "John Doe",
      email: "johndoe@example.com",
      mobile: "1234567890",
      age: 30,
      address: "123 Main St, Anytown USA",
    };

    // Send a POST request to create a new data document
    const response = await supertest(app).post(`/data`).send(data).expect(201);

    // Check that the response indicates success
    expect(response.body.success).toBe(true);

    // Check that the data document has been created in the database
    const createdData = await DataModel.findById(response.body.data._id);
    expect(createdData?.name).toBe(data.name);
    expect(createdData?.email).toBe(data.email);
    expect(createdData?.mobile).toBe(data.mobile);
  });
});





