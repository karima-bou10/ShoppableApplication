const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.order = require("./order.model");
db.orderDetail = require("./orderDetail.model");
db.tag = require("./tag.model");
db.collection = require("./collection.model");
db.ROLES = ["user", "admin"];

db.category = require("./category.model");
db.product = require("./product.model");

module.exports = db;
