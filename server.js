const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');
const users = require("./routes/api/users");

const app = express();
app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

app.get('/message', function (req, res) {
    res.send({ 'message': 'This is the test message' });
});

app.use("/api/users", users);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

module.exports = app;