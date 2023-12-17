module.exports = {
    mutipleMongooseToObject: function (mongooses) {
        return mongooses.map((mongoose) => (mongoose && mongoose.toObject) ? mongoose.toObject() : mongoose);
    },
    mongooseToObject: function (mongoose) {
        return mongoose && mongoose.toObject ? mongoose.toObject() : mongoose;
    },
};
