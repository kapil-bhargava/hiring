const mongoose = require("mongoose");
const connection = async () => {
    try {
        console.log(process.env.MONGO_URI)
        const con = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected")
    } catch (err) {
        console.log(err.message)
    }
}
module.exports = connection