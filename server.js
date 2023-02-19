/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Maria Joy Student ID: 176251213 Date: 18 Feb 2023
*
********************************************************************************/ 

var express = require("express");
var path = require("path");
var app = express();

var HTTP_PORT = process.env.PORT || 8080;

const f = require('./modules/collegeData.js')
app.use(express.static('./views'));

// setup a 'route' to listen on the default url path
app.get("/students", (req, res) => {
    f.getAllStudents().then((data) => {
        res.send(data);

    }).catch((err) => {
        res.send({ message: "no results" })
    });
   
});

app.get("/studentCourse/:course", (req, res) => {
    f.getStudentsByCourse(req.params.course).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send({ message: "no results" });
    });
});

app.get("/tas", (req, res) => {
    f.getTAs().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send({ message: "no results" });
    });
});

app.get("/courses", (req, res) => {
    f.getCourses().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send({ message: "no results" });
    });
});

app.get("/studentNum/:studentNum", (req, res) => {
    f.getStudentByNum(req.params.studentNum).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send({ message: "no results" });
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
  });
  
  app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
  });
  
  app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
  });
  
app.use((req, res) => {
    res.status(404).send("Page Not Found");
  });

// setup http server to listen on HTTP_PORT

f.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log("server listening on port: " + HTTP_PORT)
    });
}).catch((err) => {
    console.log(err);
});



