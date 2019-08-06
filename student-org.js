const mongoose = require("mongoose")

var orgSchema = mongoose.Schema({
    orgName: String,
    room: String,
    description: String,
    openPositions: [String],
    exclusivePositions: [String]
})

var Org = mongoose.model("orgs", orgSchema)

module.exports = {
    Org
}