const express = require("express");
const dataBase = require("./projectModel");
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
    .then(project => {
      res.status(200).send(project);
    })
    .catch(error => {
      res.send(error);
    });
});

router.post("/", (req, res) => {
  const newProject = req.body;
  if (!newProject.name || !newProject.description) {
    res.status(400).json({
      errorMessage: "Please provide name and description for the project."
    });
  } else {
    dataBase
      .insert(newProject)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res.json({ message: "error saving the project" });
      });
  }
});

router.delete("/:id", validatePostId, (req, res) => {
  dataBase
    .remove(req.params.id)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      res.status(500).json({ message: "error deleting the user" });
    });
});

router.put("/:id", validatePostId, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  dataBase
    .update(id, changes)
    .then(user => {
      dataBase.get(req.params.id).then(project => {
        res
          .status(200)
          .send({ message: "Here is your updated project", project });
      });
    })
    .catch(error => {
      res.status(500).json({ message: "The target could not be modified" });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  dataBase.get(req.params.id).then(project => {
    if (project < 1) {
      res.status(404).send({ message: "No project with the specified ID" });
    } else {
      next();
    }
  });
}

module.exports = router;
