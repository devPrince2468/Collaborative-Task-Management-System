const express = require("express");
const authController = require("../controllers/authController");
const projectController = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");
const { check, validationResult } = require("express-validator");

const router = express.Router();

router.post("/create-project", authMiddleware, projectController.createProject);
router.get(
  "/get-all-projects",
  authMiddleware,
  [
    check("name", "Project name is required").not().isEmpty(),
    check("description", "Project description is required").not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  projectController.getAllProjects
);
router.get(
  "/get-project/:id",
  authMiddleware,
  [
    check("name", "Project name is required").not().isEmpty(),
    check("description", "Project description is required").not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  projectController.getProjectById
);
router.put(
  "/update-project/:id",
  authMiddleware,
  [
    check("name", "Project name is required").not().isEmpty(),
    check("description", "Project description is required").not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  projectController.updateProject
);
router.delete(
  "/remove-project/:id",
  authMiddleware,
  [
    check("name", "Project name is required").not().isEmpty(),
    check("description", "Project description is required").not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  projectController.removeProjectById
);

module.exports = router;
