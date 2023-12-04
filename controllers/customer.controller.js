const bcrypt = require("bcryptjs")
const { Customer } = require("../models/Customer.model")
const Joi = require("joi")
const { generateToken } = require("../utils/jwt")


const customerJoiSchema = {
    login: Joi.object().keys({
        password: Joi.string(),
        email: Joi.string().email({ tlds: { allow: ['com'] } }).error(() => Error('Email is not valid'))
    }),
    register: Joi.object().keys({
        password: Joi.string().max(20).required(),
        email: Joi.string().email({ tlds: { allow: ['com'] } }).error(() => Error('Email is not valid')),
        name: Joi.string().required(),
    })
}





exports.register = async (req, res, next) => {
    console.log("success from register");
    const body = req.body;
    try {
        const validate = customerJoiSchema.register.validate(body);
        console.log("validate: ", validate);
        if (validate.error) {
            next(Error(validate.error));
        }
        if (await checkIfcustomerExists(body.email)) {
            next(new Error("already exist"));
        }
        const newcustomer = new Customer(body);
        newcustomer.id = newcustomer._id;
        console.log(newcustomer);
        const hash = await bcrypt.hash(body.password, 10);
        newcustomer.password = hash;
        console.log(newcustomer);

        await newcustomer.save();
        return res.status(201).send(newcustomer)
    } catch (error) {
        next(error)
    }
}



exports.login = async (req, res, next) => {
    console.log("success from login");
    const body = req.body;
    try {
        const validate = customerJoiSchema.login.validate(body);
        if (validate.error) {
            next(Error(validate.error));
        }

        //check is customer exists
        const customer = await checkIfcustomerExists(body.email);
        // if exsits check if password match
        if (!customer || ! await bcrypt.compare(body.password, customer.password)) {
            next(Error('Password or email not valid'));
        }
        //* generate jwt token
        const token = generateToken(customer);
        return res.status(201).send({ customer, token });
        // send the customer object to the client
    } catch (error) {
        next(error);
    }
};


exports.editCustomer = async (req, res, next) => {
    const id = req.params.id;
    const body = req.body
    if (body.password) {
        const hash = await bcrypt.hash(body.password, 10);
        body.password = hash;
    }

    try {
        await Customer.updateOne({ id }, body);
        res.status(201).send("update Customer");
    } catch (error) {
        next(error);
    }
};


exports.deleteCustomer = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Customer.deleteOne({ id });
        res.status(200).send("deleted");
    } catch (error) {
        next(error);
    }
};







async function checkIfcustomerExists(email) {
    const customer = await Customer.findOne({ email });
    return customer;
}