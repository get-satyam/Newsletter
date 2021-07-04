    //jshint esversion:6

    const express = require("express");
    const request = require("request");
    const bodyParser = require("body-parser");
    const https = require("https");
    const {
        post
    } = require("request");

    const app = express();

    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.get("/", function (req, res) {
        res.sendFile(__dirname + "/signup.html");
    });
    app.post("/", function (req, res) {
        var fname = req.body.fname;
        var sname = req.body.lname;
        var email = req.body.email;

        var data = {
            members: [{
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: sname
                }
            }]
        }

        const jsonData = JSON.stringify(data);
        const url = "https://us6.api.mailchimp.com/3.0/lists/ac7038130c";

        const options = {
            method: "POST",
            auth: "Satyam:298ad77f032bd498cc4277d28af25e5f-us6"


        }
        const request = https.request(url, options, function (response) {

            if (response.statusCode === 200)
                res.sendFile(__dirname + "/success.html");
            else
                res.sendFile(__dirname + "/failure.html");

            response.on("data", function (data) {
                console.log(JSON.parse(data));
            })
        });

        request.write(jsonData);
        request.end();

    });

    app.post("/failure", function(req, res){
        res.redirect("/");
    })

    app.listen(process.env.PORT || 300, function () {
        console.log("Server is running on port 300");
    });


    //API KEY
    //298ad77f032bd498cc4277d28af25e5f-us6

    //LIST id
    // ac7038130c