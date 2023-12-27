const express = require("express");
const router = express.Router();
const courseController = require("../app/controllers/CourseController ");

router.get("/create", courseController.create);
router.post("/store", courseController.store);
router.post("/handle-form-course", courseController.handleFormCourse);
router.post("/handle-form-trash", courseController.handleFormTrash);
router.get("/:id/edit", courseController.edit);
router.put("/:id", courseController.update);
router.patch("/:id/restore", courseController.restore);
router.delete("/:id", courseController.detele);
router.delete("/:id/force", courseController.destroy);
router.get("/:slug", courseController.show);

module.exports = router;
