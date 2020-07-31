const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const express = require('express');
const { type } = require('os');
const router = express.Router();
// const User = require('../models/auth.model');
const User = mongoose.model('User');

router.registerAdmins = (req, res, next) => {
    const reg = new User();
    reg.name = req.body.name;
    reg.email = req.body.email;
    reg.contact = req.body.contact;
    reg.address = req.body.address;
    reg.password = req.body.password;
    reg.type = req.body.type;
    reg.save((err, data) => {
        if (!err)
            res.send({status: "success", "message": "Admin Registered Successfully." });
        else {
            if (err.code == 11000)
                res.status(422).send({ status: "error", message: 'Duplicate email address found.' });
            else
                return next(err);
        }

    });
}

router.getAllAdmins = (req, res, next) =>{
    const token = req.token;
    User.find({$and: [{type: 1}, {token: {$ne: token}}]}, (err, data) => {
       const isEmpty =  _.isEmpty(data); 
            if (isEmpty)
                return res.status(404).json({ status: "error", message: 'Admins record not found.' });
            else
                return res.status(200).json({ status: "success", data : data });
        }
        
    );
}

router.updateAdmins = async (req, res, next) =>{
    const id = req.params._id;
    const params = {_id: id};
    const AdminData = req.body;
    const result = await User.findOneAndUpdate(
        params, AdminData, { new: true }
      );
    if (!result)
        return res.status(404).json({ status: "error", message: 'Admins Data not Update.' });
    else
        return res.status(200).json({ status: "success", message: 'Admin Updated Successfully.' });
};

router.deleteAdmins = async (req, res, next) =>{
    const params = req.params._id;
    const result = await User.findByIdAndRemove(
        params,
      );
    if (!result)
        return res.status(404).json({ status: "error", message: 'Admin not deleted.' });
    else
        return res.status(200).json({ status: "success", message: 'Admin Delete Successfully.' });
};

module.exports = router;