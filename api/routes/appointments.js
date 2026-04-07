const express = require("express");
const router = express.Router();
const db = require("../database");

/**
 * @api {get} /appointments Get all appointments
 */
router.get("/", (req, res) => {
  db.all("SELECT * FROM appointments", [], (err, rows) => {
    res.json(rows);
  });
});

/**
 * @api {post} /appointments Create appointment
 */
router.post("/", (req, res) => {
  const { first_name, last_name, date, time, treatment } = req.body;

  db.run(
    `INSERT INTO appointments (first_name, last_name, date, time, treatment)
     VALUES (?, ?, ?, ?, ?)`,
    [first_name, last_name, date, time, treatment],
    function () {
      res.json({ id: this.lastID });
    }
  );
});

/**
 * @api {put} /appointments/:id Update appointment
 */
router.put("/:id", (req, res) => {
  const { first_name, last_name, date, time, treatment } = req.body;

  db.run(
    `UPDATE appointments SET first_name=?, last_name=?, date=?, time=?, treatment=? WHERE id=?`,
    [first_name, last_name, date, time, treatment, req.params.id],
    () => res.json({ message: "Updated" })
  );
});

/**
 * @api {delete} /appointments/:id Delete appointment
 */
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM appointments WHERE id=?", [req.params.id], () => {
    res.json({ message: "Deleted" });
  });
});

module.exports = router;