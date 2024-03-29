const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express ();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+ "/signup.html");
});

app.post("/", function(req, res){
var firstName = req.body.fName;
var lastName = req.body.lName;
var email = req.body.email;

var data = {
    members: [
        {
            email_address: email, 
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
    ]
};

var jsonData = JSON.stringify(data);


var options = {
    url : "https://us5.api.mailchimp.com/3.0/lists/7f6adaf182",
    method : "POST",
    headers: {
        "Authorization": "frotuck aa8abb24181963257f25f2ffa6d7fcd0-us5"
    },
    body: jsonData
};

request(options, function(error, response, body){
if (error){
    console.log(error);
}else {
    console.log(response.statusCode);
}
});

});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});


//API Key
//aa8abb24181963257f25f2ffa6d7fcd0-us5

//list id
//7f6adaf182