const Task = require("../models/Task");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

exports.createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, category } = req.body;

  if (!title) {
    throw new ApiError(400, "Validation Error", ["Title is required"]);
  }

  const task = new Task({
    title,
    description,
    dueDate,
    category,
    user: req.user._id,
    status: "pending",
  });

  await task.save();
  res
    .status(201)
    .json(new ApiResponse(201, { task }, "Task created successfully"));
});

exports.updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, status, category } = req.body;

  const task = await Task.findOne({ _id: id, user: req.user._id });
  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.dueDate = dueDate || task.dueDate;
  task.status = status || task.status;
  task.category = category || task.category;

  await task.save();
  res
    .status(200)
    .json(new ApiResponse(200, { task }, "Task updated successfully"));
});

exports.deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });
  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  res.status(200).json(new ApiResponse(200, {}, "Task deleted successfully"));
});

exports.getTasks = asyncHandler(async (req, res) => {
  const { category, status, dueDate, page = 1, limit = 10 } = req.query;

  const query = { user: req.user._id };
  if (category) query.category = category;
  if (status) query.status = status;
  if (dueDate)
    query.dueDate = {
      $gte: new Date(dueDate),
      $lt: new Date(dueDate).setDate(new Date(dueDate).getDate() + 1),
    };

  const tasks = await Task.find(query)
    .populate("category")
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Task.countDocuments(query);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        tasks,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      },
      "Tasks retrieved successfully"
    )
  );
});
