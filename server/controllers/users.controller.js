const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const express = require('express');
const { type } = require('os');
const router = express.Router();
// const User = require('../models/auth.model');
const User = mongoose.model('User');

router.registerUsers = (req, res, next) => {
    const reg = new User(req.body);
    reg.name = req.body.name;
    reg.email = req.body.email;
    reg.contact = req.body.contact;
    reg.address = req.body.address;
    reg.password = req.body.password;
    reg.type = req.body.type;
    reg.save((err, data) => {
        if (!err)
            res.send({status: "success", "message": "User Registered Successfully." });
        else {
            if (err.code == 11000)
                res.status(422).send({ status: "error", message: 'Duplicate email address found.' });
            else
                return next(err);
        }

    });
}

router.getAllUsers = (req, res, next) =>{
    User.find({type: 0}, (err, data) => {
       const isEmpty =  _.isEmpty(data); 
            if (isEmpty)
                return res.status(404).json({ status: "error", message: 'Users record not found.' });
            else
                return res.status(200).json({ status: "success", data : data });
        }
        
    );
}

router.updateUsers = async (req, res, next) =>{
    const id = req.params._id;
    const params = {_id: id};
    const UserData = req.body;
    const result = await User.findOneAndUpdate(
        params, UserData, { new: true }
      );
    if (!result)
        return res.status(404).json({ status: "error", message: 'Users Data not Update.' });
    else
        return res.status(200).json({ status: "success", message: 'User Updated Successfully.' });
};

router.deleteUsers = async (req, res, next) =>{
    const params = req.params._id;
    const result = await User.findByIdAndRemove(
        params,
      );
    if (!result)
        return res.status(404).json({ status: "error", message: 'User not deleted.' });
    else
        return res.status(200).json({ status: "success", message: 'User Delete Successfully.' });
};

module.exports = router;