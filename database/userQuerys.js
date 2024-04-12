const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const NewUser = new Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', NewUser)

async function GetAllUsers() {
    try {
        const users = await User.find({})
        return users
    } catch (err) {
        console.log(err)
    }
}

async function GetUserByName(name) {
    try {
        const user = await User.find({ username: name })
        return user
    } catch (err) {
        console.log(err)
    }
}

async function GetUserByEmail(email) {
    try {
        const user = await User.find({ email: email })
        return user
    } catch (err) {
        console.log(err)
    }
}

async function CreateUser(user) {
    try {
        await User.create({
            username: user.username,
            email: user.email,
            password: user.password
        });
        return
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    GetAllUsers,
    GetUserByName,
    GetUserByEmail,
    CreateUser
}