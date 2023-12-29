const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../util/mongoose");

class MeController {
    // [GET], /me/stored/courses
    meCourses(req, res, next) {
        let courseQuery = Course.find({});
        if (req.query.hasOwnProperty("_sort")) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([
            courseQuery,
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
