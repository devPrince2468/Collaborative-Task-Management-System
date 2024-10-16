const Task = require("../Models/Task");

exports.createTask = async (req, res) => {
  const { title, description, status, assignee, project } = req.body;
  console.log(req.body);

  try {
    const task = new Task({
      title,
      description,
      status,
      assignee,
      project,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error while creating Task");
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("assignee");
    res.status(201).json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error while Getting Task By Id");
  }
};

exports.getTaskByProjectId = async (req, res) => {
  try {
    const task = await Task.findById(req.params.projectId).populate("assignee");
    res.status(201).json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error while Getting Task By Project Id");
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, status, assignee } = req.body;
  console.log(req.body);

  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.assignee = assignee || task.assignee;
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error while updating Task");
  }
};
