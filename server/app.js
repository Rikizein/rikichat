const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const COMMENTS_FILE = path.join(__dirname, 'comments.json')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

// untuk menampilkan semua daftar komentar
app.get('/api/comments', function(req, res){
  fs.readFile(COMMENTS_FILE, function(err, data){
    if(err){
      console.log(err)
    }
    res.json(JSON.parse(data))
  })
})

// untuk menambahkan komentar
app.post('/api/comments', function(req, res){
  fs.readFile(COMMENTS_FILE, function(err, data){
    if(err){
      console.log(err)
    }
    var comments  = JSON.parse(data)
    var newComment = {
      id: req.body.id,
      author: req.body.author,
      text: req.body.text
    };
    comments.push(newComment)
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err){
      if(err){
        console.log(err)
      }
      res.json(comments)
    })
  })
})

app.listen(3000, function(){
  console.log("server berjalan di port 3000")
})
