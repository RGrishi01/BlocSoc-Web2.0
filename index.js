require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const port = 3000;

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

//Schema for blogs
const schema = new mongoose.Schema({ firstName: "string", blog: "string" });
const blogs = mongoose.model("blog", schema);

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

//Create-Blog route
app.post("/create-blog", authenticateToken, async (req, res) => {
    let { firstName, blog } = req.body;
    console.log(blog.slice(0, 10));
    try {
        if (firstName && blog.length >= 10) {
            const newBlog = new blogs({ firstName, blog });
            await newBlog.save();
            return res.json({
                error: false,
                message: "Blog saved."
            })
        } else if (!firstName) {
            return res.json({
                error: true,
                message: "No first name available."
            })
        } else {
            return res.json({
                error: true,
                message: "Blog length should be atleast 10 characters."
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: true,
            message: "Error received"
        })
    }
})

//view-blog route
app.get("/view-blog", authenticateToken, async (req, res) => {
    const all_blogs = await blogs.find();
    res.json(all_blogs);
})

//delete-blog route
app.post("/delete-blog", authenticateToken, async (req, res) => {

})