const mongoose = require("mongoose")

var ObjectId = mongoose.Types.ObjectId;

var pendOrgMemberSchema = mongoose.Schema({
    userIdNo: String,
    orgId: ObjectId,
    curPosition: String,
    isAccepted: Boolean
})

var PendOrgMember = mongoose.model("pendOrgMembers", pendOrgMemberSchema)

var orgMemberSchema = mongoose.Schema({
    userIdNo: String,
    orgId: ObjectId,
    curPosition: String,
    isMod: Boolean
})

var OrgMember = mongoose.model("orgMembers", orgMemberSchema)

var pendOrgOfficerSchema = mongoose.Schema({
    userIdNo: String,
    orgId: ObjectId,
    curPosition: String,
    isOfficer: Boolean
})

var PendOrgOfficer = mongoose.model("pendOrgOfficers", pendOrgOfficerSchema)

module.exports = {
    OrgMember,
    PendOrgMember,
    PendOrgOfficer
}