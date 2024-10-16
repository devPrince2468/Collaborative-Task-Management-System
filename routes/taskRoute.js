const express = require("express");
const taskController = require("../controllers/taskController");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/create-task",
  authMiddleware,
  [
    check("title", "Task title is required").not().isEmpty(),
    check("description", "Task description is required").not().isEmpty(),
    check("assifnee", "Assifnee is required").not().isEmpty(),
    check("project", "Project id is required").not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  taskController.createTask
);

router.post(
  "/get-task/:id",
  authMiddleware,
  [
    check("title", "Task title is required").not().isEmpty(),
    check("description", "Task description is required").not().isEmpty(),
    check("assifnee", "Assifnee is required").not().isEmpty(),
    check("project", "Project id is required").not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  taskController.getTaskById
);
router.post("/get-task/:id", authMiddleware, taskController.getTaskByProjectId);

router.post(
  "/update-task/:id",
  authMiddleware,
  [
    check("title", "Task title is required").optional().not().isEmpty(),
    check("description", "Task description is required")
      .optional()
      .not()
      .isEmpty(),
    check("assifnee", "Assifnee is required").optional().not().isEmpty(),
    check("project", "Project id is required").optional().not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  taskController.updateTask
);

module.exports = router;
