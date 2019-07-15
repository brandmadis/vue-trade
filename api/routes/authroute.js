require("dotenv").config();
const express = require('express');
const routerauth = new express.Router()
const User = require('../models/user')
const {
    ObjectID
} = require('mongodb')

const authenticate = require('../middleware/auth')

routerauth.post('/users', async (req, res) => {
    const user = new User(req.body);
    console.log('User object is ' + user);
    try {
        const token = await user.newAuthToken()
        res.status(201).send({
            user,
            token
        })
    } catch (e) {
        console.log('post user ' + e);
        res.status(400).send(e)
    }
})

routerauth.get('/users/me', authenticate, async (req, res) => {
    res.send(req.user)
})


routerauth.patch('/users/me', authenticate, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    const _id = req.user._id

    if (!isValidOperation) {
        res.status(400).send({
            error: 'Invalid request'
        })
    }

    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user);
    } catch (error) {
        res.status(400).send()
    }

})

routerauth.delete('/users/me', authenticate, async (req, res) => {
    if (!ObjectID.isValid(req.user._id)) {
        return res.status(404).send();
    }

    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

routerauth.post('/users/login', async (req, res) => {
    try {
        console.log('users/login ', req.body.username, req.body.password)
        const user = await User.checkValidCredentials(req.body.username, req.body.password)
        const token = await user.newAuthToken()
        res.send({
            user,
            token
        })
    } catch (error) {
        res.status(400).send()
    }
})

routerauth.post('/users/logout', authenticate, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


routerauth.post('/users/logoutall', authenticate, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = routerauth;
