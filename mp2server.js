const express = require("express");
const session = require("express-session");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const mongoose = require("mongoose");

const {User} = require("./user.js");
const {Org} = require("./student-org.js");

const {OrgMember} = require("./org-member.js");
const {PendOrgMember} = require("./org-member.js");
const {PendOrgOfficer} = require("./org-member.js");

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/webapde", {
    useNewUrlParser: true
});

const urlencoder = bodyparser.urlencoded({
    extended: true
})

app.use(cookieparser())
app.use(express.static(__dirname + "/public"))
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "secret",
    name: "mp2-cookie",
    cookie: {
        maxAge: 1000*60*60*24*365*5
    }
}))

app.get(["/", "/home"], function(req, res){
    //res.sendFile(__dirname + "/public/login.html")
    
    if(req.session.username){
        res.render("home.hbs", {
            username : req.session.username,
            realname : req.session.realname, 
            idNo : req.session.idNo,
            birthday : req.session.birthday,
            school: req.session.school,
            grade: req.session.grade,
            job: req.session.job,
            email: req.session.email,
            contactNo: req.session.contactNo,
            address: req.session.address,
            residence: req.session.residence,
        })
    }
    else{
        res.sendFile(__dirname + "/public/login.html")
    }
})

app.post("/login", urlencoder, function(req, res){
    var //userId,
    username,
    password,
    realname,
    idNo,
    birthday,
    school,
    grade,
    job,
    residence,
        
    email,
    contactNo,
    address;
    
   //userId = req.body.userId;
    username = req.body.username;
    password = req.body.password;
    realname = req.body.rn;
    idNo = req.body.idno;
    birthday = req.body.birthdate;
    school  = req.body.school;
    grade = req.body.schooltitle;
    job = req.body.job;
    
    residence = req.body.residence;
    favAlbums = req.body.favAlbums;
    
    email = req.body.email;
    contactNo = req.body.contactno;
    address = req.body.address;
    
    User.findOne(
        {username: username,
         password: password
        },
        function(err, doc){
            if(err){
                res.send(err)
            }
            else if(!doc){
                res.send("User does not exist. :(")
            }
            else{
                console.log(doc)

                req.session.username = doc.username
                res.redirect("/")
            }

        }
    )
    
})

app.post("/register", urlencoder, function(req, res){
    var userId,
    username,
    password,
    realname,
    idNo,
    birthday,
    school,
    degree,
    job,
    residence,
        
    email,
    contactNo,
    address;
    
    username = req.body.username;
    password = req.body.password;
    realname = req.body.rn;
    idNo = req.body.idno;
    birthday = req.body.birthdate;
    school  = req.body.school;
    degree = req.body.schooltitle;
    job = req.body.job;
    
    residence = req.body.residence;
    
    email = req.body.email;
    contactNo = req.body.contactno;
    address = req.body.address;
    
    let user = new User({
        userId,
        username,
        password,
        realname,
        idNo,
        birthday,
        grade,
        email,
        contactNo,
        address,
        residence,
    })
    
    user.save().then(
        function(doc){
            console.log(doc);
            req.session.username = doc.username;
            req.session.password = doc.password;
            req.session.realname = doc.realname;
            req.session.idNo = doc.idNo;
            req.session.birthday = doc.birthday;
            req.session.degree = doc.degree;
            req.session.residence = doc.residence;
            
            req.session.email = doc.email;
            req.session.contactNo = doc.contactNo;
            req.session.address = doc.address;
            
            res.redirect("/");
        },
        
        function(err){
            res.send(err);
        }
    );
})

app.post("/profile", urlencoder, function(req, res){
    var username,
    password,
    realname,
    idNo,
    birthday,
    school,
    grade,
    job,
    residence,
        
    email,
    contactNo,
    address;

    username = req.body.username;
    realname = req.body.rn;
    idNo = req.body.idno;
    birthday = req.body.birthdate;
    grade = req.body.schooltitle;
    job = req.body.job;
    
    residence = req.body.residence;
    
    email = req.body.email;
    contactNo = req.body.contactno;
    address = req.body.address;
    
    console.log("User " + username);
    
    User.findOne(
        {username: username
         //,password: password
        },
        function(err, doc){
            if(err){
                res.send(err)
            }
            else if(!doc){
                res.send("User does not exist. :(")

            }
            else{
                console.log(doc)
                res.render("profile.hbs", {
                    user: doc,
                    username : req.session.username
                })
            }
            
        }
    )
    
})

app.get("/org-list", function(req, res){
    
    console.log("Organization List Accessed")
    var err, msg;
    
    err = req.session.err;
    msg = req.session.msg;
    
    req.session.err = null;
    req.session.msg = null;
    
    Org.find({
        
    },
    function(err, docs){
        if(err){
            res.render("org-list.hbs", {
                err
            })
        }
        else{
            res.render("org-list.hbs", {
                orgs: docs,
                err,
                msg,
                username : req.session.username
            })
        }
    }
    )
})


app.get("/my-org-list", function(req, res){
    console.log("Organization List Accessed")
    var err, msg;
    
    err = req.session.err;
    msg = req.session.msg;
    
    req.session.err = null;
    req.session.msg = null;
    
    Org.find({
        
    },
    function(err, docs){
        if(err){
            res.render("org-list.hbs", {
                err
            })
        }
        else{
            res.render("my-orgs-list.hbs", {
                orgs: docs,
                err,
                msg,
                username : req.session.username
            })
        }
    }
    )
})

app.get("/my-org-members", function(req, res){
    res.render("members-list.hbs")
    
})

app.post("/result-request", urlencoder, function(req, res){
    res.render("members-list.hbs",{
        username : req.session.username
    })
    
})

app.post("/org-profile", urlencoder, function(req, res){
    var //userId,
    orgName,
    room,
    description;

    orgName = req.body.orgName;
    room = req.body.room;
    description = req.body.description;
    
    console.log("User " + orgName);
    
    Org.findOne(
        {orgName: orgName,
         description: description
        },
        function(err, doc){
            if(err){
                res.send(err)
            }
            else if(!doc){
                res.send("User does not exist. :(")

            }
            else{
                console.log(doc)
                res.render("org-profile.hbs", {
                    org: doc,
                    username : req.session.username
                })
            }
            
        }
    )
    
})

app.post("/my-org-profile", urlencoder, function(req, res){
    var //userId,
    orgName,
    room,
    description;

    orgName = req.body.orgName;
    room = req.body.room;
    description = req.body.description;
    
    console.log("User " + orgName);
    
    Org.findOne(
        {orgName: orgName,
         description: description
        },
        function(err, doc){
            if(err){
                res.send(err)
            }
            else if(!doc){
                res.send("Org does not exist.")

            }
            else{
                console.log(doc)
                res.render("my-org-profile.hbs", {
                    org: doc,
                    username : req.session.username
                })
            }
            
        }
    )
})


app.get("/requests", urlencoder, function(req, res){
    
    res.render("requests.hbs",{
        username : req.session.username
    })
    
    //full implementation of sending moderator request to be fulfilled in phase 3
})

app.post("/delete", urlencoder, function(req, res){
    res.render("requests.hbs", {
        username : req.session.username
    })
})

app.post("/apply-membership", urlencoder, function(req, res){
    var username;
    
    var orgName, description, positions;

    username = req.body.username;
    
    orgName = req.body.orgName;
    description = req.body.description;
    positions = req.body.openPositions;
    
    res.render("org-profile.hbs", {
        username : req.session.username
    })
    
    //full implementation of sending moderator request to be fulfilled in phase 3
})

app.post("/check-membership", urlencoder, function(req, res){
    
    res.render("members-list.hbs", {
        username : req.session.username
    })
    
    //full implementation of sending moderator request to be fulfilled in phase 3
})

app.post("/submit-application", urlencoder, function(req, res){
    var username,
    idNo,
    orgName,
    orgId,
    curPosition,
    isAccepted;
    
    idNo = req.body.username;
    username = req.body.username;
    password = req.body.password;
    isAccepted = false;
    
    User.findOne(
        {username: username
        },
        function(err, doc){
            if(err){
                res.send(err)
            }
            else if(!doc){
                res.send("User does not exist. :(")

            }
            else{
                console.log(doc)
                res.render("org-profile.hbs", {
                    username: username
                })
            }
            
        }
    )
    
    //adding pending members would be implemented in phase 3
    
})



app.get("/logout", function(req, res){
    req.session.destroy(
        function(err){
            console.log("Logged out.")
        }
    )
    res.redirect("/")
})


app.listen(3000, function(){
    console.log("MP2 server is now connected. :)")
})