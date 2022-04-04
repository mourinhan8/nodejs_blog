module.exports = {
    multipleMongooseToObj: function (mongooseArrays) {
        return mongooseArrays.map((mongooseArray) => mongooseArray.toObject());
    },
    mongooseToObj: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
