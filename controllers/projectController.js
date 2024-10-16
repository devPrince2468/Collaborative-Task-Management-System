const Project = require("../Models/Project");

exports.createProject = async (req, res) => {
  const { name, description, teamMembers } = req.body;
  console.log(req.body);

  try {
    const project = new Project({
      name,
      description,
      user: req.user.id,
      teamMembers: teamMembers || [],
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.status(201).json(projects);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error Fetching All Projects");
  }
};

exports.getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(201).json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error Fetching All Projects");
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, teamMembers } = req.body;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    project.name = name || project.name;
    project.description = description || project.description;
    project.teamMembers = teamMembers || project.teamMembers;
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error while updating the project");
  }
};

exports.removeProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    await project.remove();
    res.status(201).json({ message: "Project Removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error while removing the project");
  }
};
