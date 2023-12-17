const Course = require("../models/Course");
const { mongooseToObject } = require("../util/mongoose");

class CourseController {
    // [GET], /courses:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((courses) => {
                res.render("courses/show", {
                    courses: mongooseToObject(courses),
                });
            })
            .catch(next);
    }

    // [GET], /courses/create
    create(req, res, next) {
        res.render("courses/create");
    }

    // [POST], /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/default.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect("/"))
            .catch((error) => {
                console.error(error);
                res.status(500).send("Internal Server Error");
            });
    }
}

module.exports = new CourseController();
