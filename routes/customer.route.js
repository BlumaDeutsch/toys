const express = require("express");
//const { Customer } = require("../models/Customer.model");
const { register, login, editCustomer, deleteCustomer } = require("../controllers/customer.controller");
const router = express.Router();



router.post("/register", register);
router.post("/login", login);
router.patch("/editCustomer/:id", editCustomer);
router.delete("/deleteCustomer/:id", deleteCustomer);




// router.get("/", async (req, res, next) => {
//     try {
//         const customers = await Customer.find({});
//         res.send(customers);
//     } catch (error) {
//         console.log(error);
//     }
// });

// router.post("/register",register);
// router.post("/login",login);

// router.patch("/:id", async (req, res, next) => {
//     const id = req.params.id;
//     const body = req.body
//     try {
//          await Customer.updateOne({id},body);
//         res.status(201).send("update customer");
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(400);
//     }
// });
// router.delete("/:id", async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         await Customer.deleteOne({ id });
//         res.status(200).send("deleted");
//     } catch (error) {
//         console.log(error);
//     }
// });

module.exports = router;