const {Lcycle} = require('../models/lcycle');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();


router.get('/', auth, async (req, res) => {
    console.log(req.user)
    const lcycles = await Lcycle.find().sort('name');
    res.send(lcycles);
});

// creating a learning group
router.post('/', auth, async (req, res) => {

    if (error) 
        return res.status(400).send(error.details[0].message);
    
    //
    let lcycle = new Lcycle({
        authorId: req.user._id,
        lcycleTitle: req.body.lcycleTitle,
        code: Date.now(),
        members: [req.user._id], // this should be userId
        tasks: [], // array of taskIds
    });
    lcycle = await lcycle.save();
    res.send(lcycle);
});


// Joining a Lgroup
router.put('/:lcycleCode', auth, async (req, res) => {

    var query = {
        code: req.params.lcycleCode
    };

    const lcycle = await Lcycle.findOne(query)

    const memberId = lcycle.members.find(memberId => memberId === req.user._id)

    if (memberId) {

        let query2 = {
            authorId: req.user._id
        };
        const lcyclesAsAuthor = await Lcycle.find(query2)

        const allLcycles = await Lcycle.find()

        const lcyclesAsMember = allLcycles.filter(group => (group.members).indexOf(req.user._id) > -1)

        const lcycles = merge_array(lcyclesAsMember, lcyclesAsAuthor)

        if (! lcycles) 
            return res.status(404).send('You do not have any learning group');
        

        return res.send(lcycles)
    }

    lcycle.members.push(req.user._id)

    Lcycle.where({_id: lcycle._id}).updateOne({members: lcycle.members}).exec()

    if (! lcycle) 
        return res.status(404).send('The task with the given code was not found.');
    

    let query2 = {
        authorId: req.user._id
    };
    const lcyclesAsAuthor = await Lcycle.find(query2)

    const allLcycles = await Lcycle.find()

    const lcyclesAsMember = allLcycles.filter(group => (group.members).indexOf(req.user._id) > -1)

    const lcycles = merge_array(lcyclesAsMember, lcyclesAsAuthor)

    if (! lcycles) 
        return res.status(404).send('You do not have any learning group');
    

    res.send(lcycles);
});


// Getting the list of lgroups for the user
router.get('/:userId', auth, async (req, res) => {
    const {error} = validate(req.body);
    if (error) 
        return res.status(400).send(error.details[0].message);
    

    const allLcycles = await Lcycle.find()

    const lcycles = allLcycles.filter(group => (group.members).indexOf(req.params.userId) > -1)

    if (! lcycles) 
        return res.status(404).send('You do not have any learning group');
    

    res.send(lcycles);
});


// deleting a learning group and the task inside it
router.delete('/:id', async (req, res) => {

    query = {
        _id: req.params.id
    }

    const lcycle = await Lcycle.findOneAndDelete(query);


    if (! lcycle) 
        return res.status(404).send('The learning group with the given ID was not found.');
    

    res.send(req.params.id);
});


// Getting a learning group
router.get('/:id', async (req, res) => {
    const lcycle = await Lcycle.findById(req.params.id);
    if (! lcycle) 
        return res.status(404).send('The task with the given ID was not found.');
    res.send(lcycle);
});


function merge_array(array1, array2) {
    const result_array = [];
    const arr = array1.concat(array2);
    let len = arr.length;
    const assoc = {};

    while (len--) {
        const item = arr[len];

        if (! assoc[item]) {
            result_array.unshift(item);
            assoc[item] = true;
        }
    }

    return result_array;
}

module.exports = router;
