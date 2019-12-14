const express = require('express');
const router = express.Router();
const User = require('../models/user')

// get all the users
router.get('/', async (req, res) => {
    console.log("Trying to get users")
    const users = await User.find()
       res.send(users)
  });

//create a user
router.post('/', async (req, res) => {
    let user = new User({ 
        name: req.body.name,
        code: req.body.code,
        role: req.body.role,
        parentId: req.body.parentId,
        grade: req.body.grade,
        mobile: req.body.mobile,
        address: req.body.address,
        created: new Date()
      });
      user = await user.save();
      res.send(user)
});



module.exports = router;




