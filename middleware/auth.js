const jwt  = require('jsonwebtoken')
const fs = require('fs');
const profile = require('../models/profile')

const auth = (req,res,next) => {
    try {
        const privateKey = fs.readFileSync('./config/private.key');
        const getToken = profile.checkValidCredentials(req.body.email, req.body.password)
        const token = getToken.replace('Bearer', '').trim()
        const decoded = jwt.verify(token, privateKey)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({error:'email or password is invalid!'})
    }
}

module.exports = auth