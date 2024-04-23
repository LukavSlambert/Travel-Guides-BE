const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const validate = require('../../libs/validation');
const usersSchemas = require('../../libs/schemas/users.js')
const handleServerError = require('../../libs/utility/ErrorHandlers.js')
const auth = require('../../libs/authentication.js')
const userQuerys = require('../../database/userQuerys.js')


router.post('/', validate(usersSchemas.newUserSchema), async (req, res) => {
    try {
        const UserExist = await userQuerys.GetUserByEmail(req.body.email)
        if (UserExist) {
            res.statusMessage = "User with this email already exist";
            res.status(400).end();
        } else {
            const hash_password = await bcrypt.hash(req.body.password, saltRounds);
            const user = {
                username: req.body.username,
                email: req.body.email,
                password: hash_password,
            }
            await userQuerys.CreateUser(user)
            delete user.password
            const token = auth.sign({ id: user._id });
            res.send({ user, token })
        }

    } catch (err) {
        handleServerError(err, res)
    }
})

module.exports = router;