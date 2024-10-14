const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/simposio')
    console.log("Conectou ao Mongoose!")
}

main().catch((err) => console.log(err))

module.exports = mongoose
