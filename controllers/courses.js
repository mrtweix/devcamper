const Course = require("../models/Course");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
// const asyncHandler = require("express-async-handler");

// @desc      Get courses
// @route     GET /api/v1/courses
// @route     GET /api/v1/bootcamps/:bootcampId/courses
// @access    Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    query = await Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: "bootcamp", // model name in path to populate
      select: "_id name description", // select particular fields of a bootcamp collection
    });
  }

  const course = await query;
  return res.status(200).json({
    success: true,
    count: course.length,
    data: course,
  });
});
