require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.listen method
app.listen(port, (error) => {
    if (error) {
        console.log("Error: " + Error);
    } else {
        console.log(`Server is running at port ${port}`);
    }
}
);

//Connect Database
function connection() {
    try {
        mongoose.connect(process.env.DB_CONNECTION_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        console.log("Connected to the Database");
    } catch (error) {
        console.log("Failed to connect to database" + error.message);
    }
}
connection();

//Schema for Login Details
const schema = new mongoose.Schema({ firstName: "string", lastName: "string", email: "string", password: "string" });
const signUp = mongoose.model("signUp", schema);

//SignUp route
app.post("/signup", async (req, res) => {
    console.log(req.body);
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;
    if (!firstName) {
        return res.json({
            error: true,
            message: "Please enter your First Name"
        })
    } else if (!email || !password) {
        return res.json({
            error: true,
            message: "Please enter your Email/Password"
        })
    }

    try {
        const doesExist = await signUp.findOne({ email });
        if (doesExist) {
            return res.json({
                error: true,
                message: "A user login already exists on this account"
            })
        }

        const newUser = new signUp({ firstName, lastName, email, password });
        await newUser.save();
        return res.json({
            error: false,
            message: "New user signed in"
        })

    } catch (error) {
        return res.json({
            error: true,
            message: error.message
        })
    }
});

//Generate token
function getSignedToken(payload) {
    let options = {
        expiresIn: "365d"
    };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
}

//Login route
app.post("/login", async (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;

    let token = getSignedToken({email});

    try {
        const user = await signUp.findOne({email});
        console.log(user);
        if (user && user.password == password) {
            res.json({
                error: false,
                token: token,
                firstName: user.firstName
            })
        } else {
            res.json({
                error: true,
                message: "Incorrect  credentials."
            })
        }
    } catch(err) {
        res.json({
            error: true,
            message: err.message
        })
    }
});

//Function for authenticating token
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.json({
            error: true,
            message: "Token does not exist"
        })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, data) => {
        if (error) {
            return res.json({
                error: true,
                message: "Wrong token received"
            });
        }
        req.user = data;
        next();
    })
}