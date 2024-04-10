const express = require('express');
const router = express.Router();

const validate = require('../../libs/validation');
const usersSchemas = require('../../libs/schemas/users.js')
const handleServerError = require('../../libs/utility/ErrorHandlers.js')
const auth = require('../../libs/authentication.js')


router.post('/', validate(usersSchemas.newUserSchema), async (req, res) => {
    try {
        const UserExist = false // check if user already exist in DB
        if (UserExist) {
            res.statusMessage = "User with this email already exist";
            res.status(400).end();
        } else {

            const user = {
                id: "test111",
                password: "test"
            } //create user in DB
            delete user.password // make sure password wasn't send in response
            const token = auth.sign({ id: user.id });
            res.send({ user, token })
        }

    } catch (err) {
        handleServerError(err, res)
    }
})

module.exports = router;