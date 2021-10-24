const router = require("express").Router();
let Block = require("../models/block.model");

router.route("/").get((req, res) => {
  Block.find()
    .then((blocks) => res.json(blocks))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const patientId = req.body.patientId;
  const condition = req.body.condition;
  const symptoms = req.body.symptoms;
  const symptomLength = req.body.symptomLength;
  const severity = req.body.severity;
  const treatments = req.body.treatments;
  const treatmentLength = req.body.treatmentLength;
  const comments = req.body.comments;
  const treatmentCenter = req.body.treatmentCenter;

  const newBlock = new Block({
    patientId,
    condition,
    symptoms,
    symptomLength,
    severity,
    treatments,
    treatmentLength,
    comments,
    treatmentCenter,
  });

  newBlock
    .save()
    .then(() => res.json("Block added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Block.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/:id").delete((req, res) => {
  Block.findByIdAndDelete(req.params.id)
    .then(() => res.json("Request deleted."))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/update/:id").post((req, res) => {
  Block.findById(req.params.id)
    .then((request) => {
      request.patientId = req.body.patientId;
      request.condition = req.body.condition;
      request.symptoms = req.body.symptoms;
      request.symptomLength = req.body.symptomLength;
      request.severity = req.body.severity;
      request.treatments = req.body.treatments;
      request.treatmentLength = req.body.treatmentLength;
      request.comments = req.body.comments;
      request.treatmentCenter = req.body.treatmentCenter;

      request
        .save()
        .then(() => res.json("Block updated!"))
        .catch((err) => res.status(400).json("Error" + err));
    })
    .catch((err) => res.status(400).json("Error" + err));
});

module.exports = router;
