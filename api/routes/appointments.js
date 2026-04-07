const express = require("express");
const router = express.Router();
const db = require("../database");

/**
 * @api {get} /appointments Get all appointments
 * @apiName GetAppointments
 * @apiGroup Appointments
 */
router.get("/", (req, res) => {
  db.all("SELECT * FROM appointments", [], (err, rows) => {
    res.json(rows);
  });
});

/**
 * @api {get} /appointments/:id Get single appointment
 * @apiName GetAppointmentById
 * @apiGroup Appointments
 * @apiParam {Number} id Appointment unique ID
 */
router.get("/:id", (req, res) => {
  db.get(
    "SELECT * FROM appointments WHERE id = ?",
    [req.params.id],
    (err, row) => {
      res.json(row);
    }
  );
});

/**
 * @api {post} /appointments Create appointment
 * @apiName CreateAppointment
 * @apiGroup Appointments
 * @apiBody {String} first_name First name of patient
 * @apiBody {String} last_name Last name of patient
 * @apiBody {String} date Appointment date
 * @apiBody {String} time Appointment time
 * @apiBody {String} treatment Treatment type
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
 * @apiName UpdateAppointment
 * @apiGroup Appointments
 * @apiParam {Number} id Appointment unique ID
 * @apiBody {String} first_name First name of patient
 * @apiBody {String} last_name Last name of patient
 * @apiBody {String} date Appointment date
 * @apiBody {String} time Appointment time
 * @apiBody {String} treatment Treatment type
 */
router.put("/:id", (req, res) => {
  const { first_name, last_name, date, time, treatment } = req.body;

  db.run(
    `UPDATE appointments
     SET first_name=?, last_name=?, date=?, time=?, treatment=?
     WHERE id=?`,
    [first_name, last_name, date, time, treatment, req.params.id],
    () => res.json({ message: "Updated" })
  );
});

/**
 * @api {delete} /appointments/:id Delete appointment
 * @apiName DeleteAppointment
 * @apiGroup Appointments
 * @apiParam {Number} id Appointment unique ID
 */
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM appointments WHERE id=?", [req.params.id], () => {
    res.json({ message: "Deleted" });
  });
});

module.exports = router;