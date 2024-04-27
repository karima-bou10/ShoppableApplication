const router = require('express').Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken')
const User = require('../models/user'); // Corrected typo here

    router.post('/register', async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10); // Corrected method name here
            const hashedPassword = await bcrypt.hash(req.body.password, salt); // Corrected method name and removed extra dot here
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword, // Store hashed password
            });
            const savedUser = await user.save(); // Save user to database
            const {password, ...data} = await savedUser.toJSON()
            res.send(data); // Send saved user object as response
        } catch (error) {
            console.error(error); // Log any errors
            res.status(500).send("Error registering user"); // Send error response
        }
    })

    router.post('/login',async (req,res)=>{
        const user = await User.findOne({
            email:req.body.email
        })

        if(!user){
            return res.status(404).send({
                message : 'user not found '
            })
        }

        if(!await bcrypt.compare(req.body.password,user.password)){
            return res.status(404).send({
                message:'invalid credentials'
            })
        }

        const token = jwt.sign({id: user.id},"secret")
        res.cookie('jwt',token,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.send({
            message :'succes'
        } )
    })

    router.get('/user', async (req,res)=>{
        try{
        const cookie = req.cookies['jwt']

        const claims = jwt.verify(cookie,'secret')

        if(!claims){
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }
        const user = await User.findOne({_id: claims.id });
    
        if (!user) {
            return res.status(404).send({
                message: 'User not found'
            });
        }

        const {password,...data} = await user.toJSON()
        res.send(data);
            }catch(e){
                return res.status(401).send({
                    message : 'unauthenticated'
                })
            }
        })
    router.post('/logout',(req,res) => {
        res.cookie('jwt','',{
            maxAge: 0 //to remove the cookie 
        })
        res.send({
            message: 'success'
        })    
        }
    )

module.exports = router;
