const Category = require("../models/Category");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new ApiError(400, "Validation Error", ["Category name is required"]);
  }

  const category = new Category({
    name,
    user: req.user._id,
  });

  await category.save();
  res
    .status(201)
    .json(new ApiResponse(201, { category }, "Category created successfully"));
});

exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ user: req.user._id });
  res
    .status(200)
    .json(
      new ApiResponse(200, { categories }, "Categories retrieved successfully")
    );
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findOneAndDelete({
    _id: id,
    user: req.user._id,
  });
  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Category deleted successfully"));
});
