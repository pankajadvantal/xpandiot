const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const express = require('express');
const { type } = require('os');
const router = express.Router();
// import  { Organization } from "../models/org.model";
const Organization = require('../models/org.model');

// const Organization = mongoose.model('Organization');

router.registerOrg = (req, res, next) => {
    var org = new Organization(req.body);
    org.name = req.body.name;
    org.email = req.body.email;
    org.password = req.body.password;
    org.type = req.body.type;
    org.save((err, data) => {
        if (!err)
            res.send({status: "success", "message": "Organization Registered Successfully." });
        else {
            if (err.code == 11000)
                res.status(422).send({ status: "error", message: 'Duplicate email address found.' });
            else
                return next(err);
        }

    });
}

router.getAllOrganizations = (req, res, next) =>{
    Organization.find((err, data) => {
       const isEmpty =  _.isEmpty(data); 
            if (isEmpty)
                return res.status(404).json({ status: "error", message: 'Organizations record not found.' });
            else
                return res.status(200).json({ status: "success", data : data });
        }
        
    );
}

router.updateOrg = async (req, res, next) =>{
    const id = req.params._id;
    const params = {_id: id};
    const OrgData = req.body;
    const result = await Organization.findOneAndUpdate(
        params, OrgData, { new: true }
      );
    if (!result)
        return res.status(404).json({ status: "error", message: 'Organization Data not Update.' });
    else
        return res.status(200).json({ status: "success", message: 'Organization Updated Successfully.' });
};

router.removeOrg = async (req, res, next) =>{
    const params = req.params._id;
    const result = await Organization.findByIdAndRemove(
        params,
      );
    if (!result)
        return res.status(404).json({ status: "error", message: 'Organization not deleted.' });
    else
        return res.status(200).json({ status: "success", message: 'Organization Delete Successfully.' });
};

module.exports = router;