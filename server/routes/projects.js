const router = require("express").Router();

// Project Model
const Project = require("../models/project.model");

// CREATE
router.post("/create", (req, res) => {
  const { name } = req.body;

  const newProject = new Project({
    name,
  });

  newProject
    .save()
    .then(() => res.json("Project successfully created!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// READ
router.get("/", (req, res) => {
  Project.find()
    .then((projects) => res.json(projects))
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE
router.delete("/:id", (req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => res.json("Project deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
