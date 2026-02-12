const mongoose = require("mongoose");

const schm = mongoose.Schema({
    title: String,
    jobType: String,
    location: String,
    experience: String,
    salary : String,
    description: String

}, {
    timestamps: true
}
)

module.exports = mongoose.model("job", schm)