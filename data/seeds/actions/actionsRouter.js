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

router.delete("/:id", (req, res) => {
  dataBase
    .remove(req.params.id)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      res.status(500).json({ message: "error deleting the user" });
    });
});

router.put("/", tooLong, (req, res) => {
  const id = req.body.project_id;
  const changes = req.body;
  dataBase
    .update(id, changes)
    .then(user => {
      if (!user) {
        res.status(500).json({ message: "no user of that ID to modify" });
      } else {
        dataBase.get(id).then(project => {
          res
            .status(200)
            .send({ message: "Here is your updated project", project });
        });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "The target could not be modified" });
    });
});

router.post("/", tooLong, (req, res) => {
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
        res.json({ message: "Project_id doesn't match any users" });
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

function tooLong(req, res, next) {
  if (newAction.description > 128) {
    res.status(413).json({
      errorMessage: "The description must be less than 128 characters!"
    });
  } else {
    next();
  }
}

module.exports = router;
