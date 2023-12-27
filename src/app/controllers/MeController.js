const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../util/mongoose");

class MeController {
    // [GET], /me/stored/courses
    meCourses(req, res, next) {
        Promise.all([
            Course.find({}),
            Course.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([courses, deletedCount]) => {
                res.render("me/courses", {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    // [GET], /me/trash/courses
    trashCourses(req, res, next) {
        Promise.all([
            Course.findDeleted({}),
            Course.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([courses, deletedCount]) => {
                res.render("me/trash", {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}
module.exports = new MeController();
