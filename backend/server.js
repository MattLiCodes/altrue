const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://matthewli:matthewli143@cluster0.1htjv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const blocksRouter = require("./routes/blocks");
const patientsRouter = require("./routes/patients");
// const conditionsRouter = require("./routes/conditions");
// const symptomsRouter = require("./routes/symptoms");
// const treatmentsRouter = require("./routes/treatments");

app.use("/blocks", blocksRouter);
app.use("/patients", patientsRouter);
// app.use("/conditions", conditionsRouter);
// app.use("/symptoms", symptomsRouter);
// app.use("/treatments", treatmentsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
