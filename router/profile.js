const express = require('express');
const router = new express.Router()
const profile = require('../models/profile')
const register = require('../models/regiser')
const authenticates  = require('../middleware/auth')
router.post('/login', authenticates, (req, res) => {
    try{
        // const checkProfile = profile.checkValidCredentials(req.body.email, req.body.password)
        res.send(req.user)
    } catch (error) {
        console.log(error);
        res.status(400).send({error})        
    }
})

 router.post('/register', (req, res) => {
    const body = req.body
    const response = register.addProfile(body)
    return res.send(response)
 })

module.exports = router