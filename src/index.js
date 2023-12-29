const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");

const SortMiddleware = require("./app/middlewares/SortMiddleware");

const app = express();
const port = 3000;
const route = require("./routes");
const db = require("./config/db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Connecting to MongoDB
db.connect();

// method overrride
app.use(methodOverride("_method"));

// Middleware
app.use(SortMiddleware);

//HTTP logger
app.use(morgan("combined"));

//Template engine
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const icons = {
                    default: "oi oi-elevator",
                    asc: "oi oi-sort-ascending",
                    desc: "oi oi-sort-descending",
                };

                const types = {
                    default: "desc",
                    asc: "desc",
                    desc: "asc",
                };

                const sortType = field === sort.column ? sort.type : "default";
                const icon = icons[sortType];
                const type = types[sortType];

                return `
                    <a href="?_sort&column=${field}&type=${type}">
                        <i class="${icon} ms-1"></i>
                    </a>
                `;
            },
        },
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//route init
route(app);

// 127.0.0.1 - localhost:3000
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
