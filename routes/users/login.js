const express = require('express');
const router = express.Router();

const handleServerError = require('../../libs/utility/ErrorHandlers.js')
const auth = require('../../libs/authentication.js')
const userQuerys = require('../../database/userQuerys.js')


router.get('/', async (req, res) => {
    try {
        const [user] = await userQuerys.LoginUser(req.body.email, req.body.password)
        if (!user) {
            res.statusMessage = "User email or password is incorrect";
            res.status(400).end();
        } else {
            const token = auth.sign({ id: user._id });
            res.send({ user, token })
        }

    } catch (err) {
        handleServerError(err, res)
    }
})


module.exports = router;