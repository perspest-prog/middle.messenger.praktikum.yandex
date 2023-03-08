const express = require('express')
const path = require('path')

const app = express()
const DEV_PORT = 3000
const PROD_PORT = 80
const dist = path.resolve(__dirname, 'dist')

app.use(express.static(dist))

app.get('/signin', (req, res) => {
    res.sendFile(path.resolve(dist, 'pages', 'auth', 'auth.html'))
})

app.get('/signup', (req, res) => {
    res.sendFile(path.resolve(dist, 'pages', 'reg', 'reg.html'))
})

app.get('/profile', (req, res) => {
    res.sendFile(path.resolve(dist, 'pages', 'profile', 'profile.html'))
})

app.get('/chat', (req, res) => {
    res.sendFile(path.resolve(dist, 'pages', 'chat', 'chat.html'))
})

app.get('/error', (req, res) => {
    res.sendFile(path.resolve(dist, 'pages', 'error', 'error.html'))
})

app.get('/edit', (req, res) => {
    res.sendFile(path.resolve(dist, 'pages', 'edit', 'edit.html'))
})

app.listen(DEV_PORT, () => {
    console.log(`The ${DEV_PORT}'s port is being listened!`)
})
