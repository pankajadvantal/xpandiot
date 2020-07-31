const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const express = require('express');
const { type } = require('os');
const router = express.Router();

const User = mongoose.model('User');

router.register = (req, res, next) => {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.contact = req.body.contact;
    user.address = req.body.address;
    user.password = req.body.password;
    user.type = req.body.type;
    user.save((err, doc) => {
        if (!err)
            res.send({status: "success", "message": "Registered Successfully." });
        else {
            if (err.code == 11000)
                res.status(422).send({ status: "error", message: 'Duplicate email address found.' });
            else
                return next(err);
        }

    });
}

router.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user){
            const params = { email: user.email, type: user.type };
            const tokenNo = user.generateJwt();
            const data = { token: tokenNo, status: 1 };
            const update = tokenUpdate(params, data);
            if(!update){
                return res.status(404).json({status: "error", "message": "token update error" });
            }
            const userDetail = {
               id: user._id,
               name: user.name,
               email: user.email,
               type: user.type
            };
            return res.status(200).json({status: "success", "token": tokenNo, "user": userDetail });
        }
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

    const tokenUpdate = async (params, data) => {
        const updateResult = await User.updateOne(
            params, data, { new: true }
          );
          if(updateResult) return 1;
          else return 0;
    };

router.changePassword = (req, res, next) => {
        // error from passport middleware
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(400).json(err);
        else if (user){
            // var user = new User();
            // User.findOne({"email": req.body.email}, (err, user) => {
            user.password = req.body.new_password;
            user.save(function(err, doc) {
                if (!err){
                    res.send({status: "success", "message": "Password Changed Successfully" });
                }else {
                    return next(err);
                }
                // res.send(user)
            })
        // })
        }
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

router.Logout = (req, res, next) => {
    const paramsId = req.params.id;
    const params = { _id: paramsId, email: req.body.email, type: req.body.type };
    const data = { token: "", status: 0 };
    const update = tokenUpdate(params, data);
    if(!update){
        return res.status(404).json({status: "error", "message": "token update error" });
    }
    return res.status(200).json({status: "success", "message": "Logout Successfully." });
}

// module.exports.userProfile = (req, res, next) =>{
//     User.findOne({ _id: req._id },
//         (err, user) => {
//             if (!user)
//                 return res.status(404).json({ status: false, message: 'User record not found.' });
//             else
//                 return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
//         }
//     );
// }

module.exports = router;