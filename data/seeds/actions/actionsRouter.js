const express = require("express");
const dataBase = require("../../dbConfig");
const router = express.Router();

router.get("/", (req, res) => {
  dataBase.get().then(projects => {
    res.status(200).send(projects);
  });
});

router.get("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
