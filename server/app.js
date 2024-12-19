const express = require("express");
const dbConnect = require("./db/dbConfig.js")
const app = express();
const userRouter = require("./routes/userRouter.js");
const taskRouter = require("./routes/taskRouter.js");
const cors = require("cors")
const {config} = require("dotenv");
config()

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:" http://localhost:5173"}))

//demoAPI
app.get("/", (req, res) => res.send({ message: "SERVER AT WORK" }))

//Routes
app.use("/user",userRouter)
app.use("/user/task",taskRouter)

const PORT = process.env.PORT || 4000;
const hostname = process.env.hostname || "localhost";

app.listen(PORT,hostname,()=>{
    console.log(`Server running at http://${hostname}:${PORT}`);
    dbConnect();
});