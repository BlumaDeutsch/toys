const express = require("express");
const cors = require("cors")

const app = express();
const customerRoutes = require("./routes/customer.route");
const toyRoutes = require("./routes/toy.route");
const { login } = require("./controllers/toy.controller");
// app.get("/test", (req, res)=>{
//     res.send("works");
// })
app.use(express.json());
app.use(cors());
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/toys", toyRoutes);
app.use((err, req, res, next) => {
    console.log(err);
    res.status(400).json({
        status: "fail",
        message: err.message
    });
});


module.exports.app = app;