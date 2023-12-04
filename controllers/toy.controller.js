const bcrypt = require("bcryptjs")
const { Toy } = require("../models/Toy.model")
const Joi = require("joi")
const { generateToken } = require("../utils/jwt")


const toyJoiSchema = {
    addToy: Joi.object().keys({
        name: Joi.string().required(),
        info: Joi.string(),
        category: Joi.string().required(),
        price: Joi.number().required(),
    })
}


exports.getToys = async (req, res, next) => {
    console.log("success from getToys");
    const page = req.query.page;
    const perPage = 2;
    const skip = (page - 1) * perPage;

    try {
        const toys = await Toy.find()
            .skip(skip).limit(perPage);
        res.send(toys);
    } catch (error) {
        next(error);
    }
}

exports.search = async (req, res, next) => {
    console.log("success from search");
    const page = req.query.page;
    const s = req.query.s;
    const perPage = 2;
    const skip = (page - 1) * perPage;


    try {
        const toys = await Toy.find({ $or: [{ name: s }, { info: s }] })
            .skip(skip).limit(perPage);
        res.send(toys)
    } catch (error) {
        next(error);
    }
}

exports.getToyByCategory = async (req, res, next) => {
    console.log("success from getToyByCategory");
    const cat = req.params.catname;
    console.log(cat);
    try {
        const toys = await Toy.find({ "category": cat });
        res.send(toys);
    } catch (error) {
        next(error);
    }
}

exports.addToy = async (req, res, next) => {
    console.log("success from addToy");
    const body = req.body;
    try {
        const validate = toyJoiSchema.addToy.validate(body);
        console.log("validate: ", validate);
        if (validate.error) {
            next(Error(validate.error));
        }
        const newtoy = new Toy(body);
        newtoy.id = newtoy._id;
        newtoy.id_user=res.locals.userId;

        await newtoy.save();
        return res.status(201).send(newtoy)
    } catch (error) {
        next(error)
    }
}

exports.editToy = async (req, res, next) => {
    console.log("success from editToy");
    const id = req.params.editId;
    console.log(id);
    const body = req.body
    try {
        await Toy.updateOne({ id }, body);
        res.status(201).send("update Toy");
    } catch (error) {
        next(error);
    }
}

exports.deleteToy = async (req, res, next) => {
    console.log("success from deleteToy");
    try {
        const id = req.params.delId;
        await Toy.deleteOne({ id });
        res.status(200).send("deleted");
    } catch (error) {
        next(error);
    };
}

exports.getToyById = async (req, res, next) => {
    console.log("success from getToyById");
    const id = req.params.id;
    console.log(id);
    try {
        const toy = await Toy.findOne({ "id": id });
        res.send(toy);
    } catch (error) {
        next(error);
    }
}