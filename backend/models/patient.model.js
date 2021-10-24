const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  patientId: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true },
  ethnicity: { type: String, required: false },
  insurance: { type: String, required: false },
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
