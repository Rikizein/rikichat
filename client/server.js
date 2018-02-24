const path = require('path')
const express = require('express')

const app = express()

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3001, function(){
  console.log("server berjalan di port 3000")
})
