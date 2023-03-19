import mongoose from "mongoose";
import express from "express";
import { DataModel } from "../models/data.model";
import { body, validationResult } from "express-validator";
/**
 * @swagger
 * components:
 *   schemas:
 *     Data:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         mobile:
 *           type: string
 *         isMarried:
 *           type: boolean
 *       required:
 *         - name
 *         - email
 *         - mobile
 *         - isMarried
 * /data:
 *   get:
 *     summary: Get all data
 *     description: Retrieve a list of all data
 *     responses:
 *       200:
 *         description: A list of data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Data'
 *   post:
 *     summary: Add a new data entry
 *     description: Add a new data entry to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Data'
 *     responses:
 *       200:
 *         description: Data object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Data'
 * /data/{id}:
 *   get:
 *     summary: Get data by ID
 *     description: Retrieve data by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the data to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Data'
 *   patch:
 *     summary: Update an existing data entry
 *     description: Update an existing data entry in the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the data to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Data'
 *     responses:
 *       200:
 *         description: Data object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Data'
 *   delete:
 *     summary: Delete a data entry
 *     description: Delete a data entry from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the data to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Data'
 */

const router = express.Router();
//making a get request to get the data from the data base
router.get("/", async (req, res) => {
  try {
    const data = await DataModel.find().lean().exec(); //lean is used convert mongoose object to plain javascript obejct
    return res.status(200).send({
      success: true,
      data,
    });
  } catch (er) {
    console.error(er);
    let message = "An unknown error occurred";
    if (er instanceof mongoose.Error.CastError) {
      message = "Invalid parameter";
    }
    return res.status(400).send({
      success: false,
      message,
    });
  }
});

//get a single user data by their id
router.get("/:id", async (req, res) => {
  try {
    const data = await DataModel.findById(req.params.id).lean().exec(); //lean is used convert mongoose object to plain javascript obejct
    return res.status(200).send({
      success: true,
      data,
    });
  } catch (er) {
    console.error(er);
    let message = "An unknown error occurred";
    if (er instanceof mongoose.Error.CastError) {
      message = "Invalid parameter";
    }
    return res.status(400).send({
      success: false,
      message,
    });
  }
});

//post request to add data to the database
router.post(
  "/",
  body("name").notEmpty().isLength({ min: 2, max: 50 }),
  body("mobile").notEmpty().isNumeric(),
  body("isMarried").notEmpty(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const data = await DataModel.create(req.body);
      if (!errors.isEmpty()) {
        return res.status(404).send({ message: errors.array() });
      } else {
        return res.status(201).send({
          success: true,
          data,
        });
      }
    } catch (er) {
      console.error(er);
      let message = "An unknown error occurred";
      if (er instanceof mongoose.Error.CastError) {
        message = "Invalid parameter";
      }
      return res.status(400).send({
        success: false,
        message,
      });
    }
  }
);

//update request to update the data;
router.patch("/:id", async (req, res) => {
  try {
    const data = await DataModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    res.status(200).send({
      success: true,
      data,
    });
  } catch (er) {
    console.error(er);
    let message = "An unknown error occurred";
    if (er instanceof mongoose.Error.CastError) {
      message = "Invalid parameter";
    }
    return res.status(400).send({
      success: false,
      message,
    });
  }
});

//delete request
router.delete("/:id", async (req, res) => {
  try {
    const data = await DataModel.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({
      success: true,
      data: data,
    });
  } catch (er) {
    console.error(er);
    let message = "An unknown error occurred";
    if (er instanceof mongoose.Error.CastError) {
      message = "Invalid parameter";
    }
    return res.status(400).send({
      success: false,
      message,
    });
  }
});

export default router;
