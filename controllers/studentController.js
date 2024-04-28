const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Student = mongoose.model('Student');

router.get('/', (req, res) => {
    res.render('student/addOrEdit', {
        viewTitle: 'Insert Student',
    });
});

router.post('/', async (req, res) => {
    if (req.body._id == '') {
        await insertRecord(req, res);
    } else {
        await updateRecord(req, res);
    }
});

async function insertRecord(req, res) {
    let student = new Student();
    student.fullName = req.body.fullName;
    student.email = req.body.email;
    student.mobile = req.body.mobile;
    student.city = req.body.city;
    try {
        const doc = await student.save();
        res.redirect('student/list');
    } catch (err) {
        console.log('Error during insert: ' + err);
    }
}

async function updateRecord(req, res) {
    try {
        const doc = await Student.findOneAndUpdate(
            {_id: req.body._id},
            req.body,
            {new: true}
        )
        res.redirect('/student/list');
    } catch (err) {
        console.log('Error during update: ' + err);
    }
}

router.get('/list', async (req, res) => {
    try {
        const docs = await Student.find({});
        res.render('student/list', {
            list: docs,
        });
    } catch (err) {
        console.log('Error in retrieval: ' + err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const doc = await Student.findById(req.params.id);
        res.render('student/addOrEdit', {
            viewTitle: 'Update Student',
            student: doc,
        });
        console.log(doc);
    } catch (err) {
        console.log('Error in retrieval of student by id: ' + err);
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        const doc = await Student.findByIdAndDelete(req.params.id);
        res.redirect('/student/list');
    } catch (err) {
        console.log('Error in deletion: ' + err);
    }
});

module.exports = router;