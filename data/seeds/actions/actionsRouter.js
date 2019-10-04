const express = require("express");
const dataBase = require("./actionModel");
const router = express.Router();

router.get("/", (req, res) => {
  dataBase
    .get()
    .then(projects => {
      res.status(200).send(projects);
    })
    .catch(err => {
      res.send(err);
    });
});

router.get("/:id", validatePostId, (req, res) => {
  dataBase
    .get(req.params.id)
    .then(projects => {
      res.status(200).send(projects);
    })
    .catch(err => {
      res.send(err);
    });
});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

router.post("/", (req, res) => {
  const newAction = req.body;
  if (!newAction.project_id || !newAction.description || !newAction.notes) {
    res.status(400).json({
      errorMessage:
        "Please provide project_id, notes, and description for the action."
    });
  } else {
    dataBase
      .insert(newAction)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res.json({ message: "error saving the project" });
      });
  }
});

// custom middleware

function validatePostId(req, res, next) {
  dataBase.get(req.params.id).then(project => {
    if (!project) {
      res.status(404).send({ message: "No project with the specified ID" });
    } else {
      next();
    }
  });
}

module.exports = router;
