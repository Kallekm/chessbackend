const express = require("express");
const app = express();
const User = require('./models/blog');
const mongoose  = require('mongoose');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const dbURI = 'mongodb+srv://Kalle:KalleMongodb@cluster0.hca77rd.mongodb.net/chessapp?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(4000, () => {
        console.log("Listening 4000 port")
    }))
    .catch((err) => console.log(err));

app.use(cors())
app.use(express.json())

app.post('/register', async (req, res) => {
    console.log(req.body)
    try {
            await User.create({
                name: req.body.name,
                password: req.body.password
            })
            res.json({status: 'ok'})
    }catch (err){
        console.log(err)
        res.json({status: 'error'})
    }
     
    })

    app.post('/login', async (req, res) => {
        console.log(req.body)
            const user = await User.findOne({
                    name: req.body.name,
                    password: req.body.password
                })
        if (user) {
            const token = jwt.sign(
            {
                name:user.name
                
            }, 'secret123',
        )
    
            return res.json({ status: 'ok', user:token}) // before user:token
        } else {
            return res.json({ status: 'error', user:false})
        }
                
         
        })


app.get('/newblog', (req, res) => {
 const blog = new Blog({
    title: 'Username',
    snippet: 'rating',
    body: 'lisaa tietoaa'
 });

 blog.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
})
app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result)=> {
        res.send(result);
    })
    .catch((err)=>{
        console.log(err)
    });
})

app.get('/single-blog', (req,res) => {
    Blog.findById('637c3c28510f5257d5c66c2f')
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    })
})
