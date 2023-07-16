const router = require("express").Router();

// Ticket Model
const Ticket = require("../models/ticket.model");

// Index (get all tickets)
router.get("/", (req, res) => {
  Ticket.find()
    .then((tickets) => res.json(tickets))
    .catch((err) => res.status(400).json("Error: " + err));
});

// CREATE
router.post("/create", (req, res) => {
  const { title, description, projectName, assignee, priority, status, type } =
    req.body;

  const newTicket = new Ticket({
    title,
    description,
    projectName,
    assignee,
    priority,
    status,
    type,
  });

  newTicket
    .save()
    .then(() => res.json("Ticket successfully created."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// READ
router.get("/:id", (req, res) => {
  Ticket.findById(req.params.id)
    .then((ticket) => res.json(ticket))
    .catch((err) => res.status(400).json("Error: " + err));
});

// UPDATE
router.post("/update/:id", (req, res) => {
  Ticket.findById(req.params.id)
    .then((ticket) => {
      ticket.title = req.body.title;
      ticket.description = req.body.description;
      ticket.projectName = req.body.projectName;
      ticket.assignee = req.body.assignee;
      ticket.priority = req.body.priority;
      ticket.status = req.body.status;
      ticket.type = req.body.type;

      ticket
        .save()
        .then(() => res.json("Ticket updated."))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE
router.delete("/:id", (req, res) => {
  Ticket.findByIdAndDelete(req.params.id)
    .then(() => res.json("Ticket deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
