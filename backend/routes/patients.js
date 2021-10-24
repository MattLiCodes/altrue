const router = require("express").Router();
let Patient = require("../models/patient.model");

router.route("/").get((req, res) => {
  Patient.find()
    .then((patients) => res.json(patients))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const patientId = req.body.patientId;
  const name = req.body.name;
  const age = req.body.age;
  const sex = req.body.sex;
  const ethnicity = req.body.ethnicity;
  const insurance = req.body.insurance;

  const newPatients = new Patient({
    patientId,
    name,
    age,
    sex,
    ethnicity,
    insurance,
  });

  newPatients
    .save()
    .then(() => res.json("Patient added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
