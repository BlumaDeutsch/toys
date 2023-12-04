const express = require("express");
// const { Toy } = require("../models/Toy.model");
const { auth } = require("../middlewares/auth");
const { getToys, search, getToyByCategory, addToy, editToy, deleteToy, getToyById } = require("../controllers/toy.controller");
const router = express.Router();



router.get("/", getToys);
router.get("/search", search);
router.get("/category/:catname", getToyByCategory);
router.post("/",auth(), addToy);
router.patch("/:editId",auth(), editToy);
router.delete("/:delId",auth(), deleteToy);
router.get("/single/:id", getToyById);




// router.get("/", async (req, res, next) => {
//     try {
//         const userId = res.locals.userId
//         const toys = await Toy.find({ ownerId: userId });
//         res.send(toys);
//     } catch (error) {
//         console.log(error);
//     }
// });

// router.post("/", async (req, res, next) => {
//     const body = req.body;
//     const userId = res.locals.userId
//     try {
//         const newtoy = new Toy(body);
//         // add extra things
//         newtoy.id = newtoy._id;
//         newtoy.ownerId = userId;
//         await newtoy.save();
//         res.status(201).send(newtoy);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(400);
//     }
// });

// router.patch("/:id", async (req, res, next) => {
//     const id = req.params.id;
//     const body = req.body
//     try {
//         await Toy.updateOne({ id }, body);
//         res.status(201).send("update toy");
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(400);
//     }
// });

// router.delete("/:id", async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         await Toy.deleteOne({ id });
//         res.status(200).send("deleted");
//     } catch (error) {
//         console.log(error);
//     }
// });


module.exports = router;