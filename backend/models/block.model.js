const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blockSchema = new Schema({
  patientId: { type: String, required: true },
  condition: { type: String, required: true },
  symptoms: { type: [String], required: true },
  symptomLength: { type: Number, required: true },
  severity: { type: String, required: true },
  treatments: { type: [String], required: false },
  treatmentLength: { type: Number, required: false },
  comments: { type: String, required: false },
  treatmentCenter: { type: String, required: false },
});

const Block = mongoose.model("Block", blockSchema);

module.exports = Block;
