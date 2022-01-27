const router = require('express').Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {registreValidation, loginValidation} = require('../validation');
//const verify = require('./verifyToken');


router.post('/registre',async (req,res)=>{
    //validate the data before we a user
    const {error} = registreValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

  // checking if the user exist in the database
  const emaiExist = await User.findOne({email: req.body.email});
  if(emaiExist) return res.status(400).send({"message" : "Email already exists"});

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPaswword = await bcrypt.hash(req.body.password,salt);
   //create a new user
const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPaswword

});
try {
   const saveUser= await user.save() ;
   res.send(saveUser);
} catch (error) {
   res.status(400).send(error); 
}
});
//login
router.post('/login',async(req,res)=>{
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

     // checking if the email exist
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send('email not found');

  //checking password that is correct
  const validPass = await bcrypt.compare(req.body.password,user.password)
  if(!validPass) return res.status(400).send('invalid pass word !');

  //create and assign a token
  const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
})

//logout



module.exports = router;
