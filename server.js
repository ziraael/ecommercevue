const express = require('express')
const serveStatic = require('serve-static')
const app = express()
const path = require('path')

app.use('/',serveStatic(path.join(__dirname ,"/dist")))
const port = process.env.PORT || 8080
app.listen(port)

console.log('Server started')
