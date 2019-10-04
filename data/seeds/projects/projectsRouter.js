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

router.get("/:id", (req, res) => {
  dataBase
    .get(req.params.id)
    .then(project => {
      if (project < 1) {
        res.status(404).send({ message: "No project with the specified ID" });
      } else {
        res.status(res.status(200).send(project));
      }
    })
    .catch(error => {
      res.send(error);
    });
});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
