const express = require('express');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper');

const ctrlAuth = require('../controllers/auth.controller');
const orgCtrl = require('../controllers/org.controller');
const adminCtrl = require('../controllers/admins.controller');
const usersCtrl = require('../controllers/users.controller');

router.post('/register', ctrlAuth.register);
router.post('/authenticate', ctrlAuth.authenticate);
router.put('/logout/:id', ctrlAuth.Logout);
// router.post('/forgot-password', ctrlAuth.forgotPassword);
router.post('/changePassword', ctrlAuth.changePassword);
// router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
//  -- for organizations  --
router.post('/createOrg', orgCtrl.registerOrg);
router.get('/getOrganizations', orgCtrl.getAllOrganizations);
router.put('/updateOrganizations/:_id', orgCtrl.updateOrg);
router.delete('/deleteOrganizations/:_id', orgCtrl.removeOrg);
//  -- for admins  --
router.post('/createAdmin', adminCtrl.registerAdmins);
router.get('/getAdmins', adminCtrl.getAllAdmins);
router.put('/updateAdmins/:_id', adminCtrl.updateAdmins);
router.delete('/deleteAdmins/:_id', adminCtrl.deleteAdmins);
//  -- for users  --
router.post('/createUser', usersCtrl.registerUsers);
router.get('/getUsers', usersCtrl.getAllUsers);
router.put('/updateUsers/:_id', usersCtrl.updateUsers);
router.delete('/deleteUsers/:_id', usersCtrl.deleteUsers);

module.exports = router;



