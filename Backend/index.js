const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const port = process.env.PORT || 3002;
const app = express();

const mongocon = process.env.mongoCon;
mongoose.connect('mongodb+srv://jawadeagleyeDB:mydbpassword@cluster1-nb35w.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology:true});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));
const cors = require('cors');
app.use(cors());


const Users = mongoose.model('Users', {
    email: String,
    password: String,
    name: String,
    age: Number,
    gender: String,
    institute: String,
   });

   const Customers = mongoose.model('Customers', {
    name: String,
    ShopName: String,
    Address: String,
    Service: Number,
    Category: String,
   });
  
  
   app.get('/', (req, res) => { 
    res.send('Welcome to my Node.js app mere wala');
  });
  
  app.get('/getusers', async (req, res) => {

    const allUsers = await Users.find();
    console.log('allusers', allUsers);
  
    res.send(allUsers);
  });

// app.post('/signup', async (req, res) => {
//     const body = req.body;
//     console.log('req.body', body);
//     try{
//         const student = new Student(body);
        
//         const result = await student.save();
        
//     res.send({
//       message: 'Success'
//     });
//     }
//     catch(ex){
//         console.log('ex',ex);
//         res.send({message: 'Error'}).status(401);
//       }
    
//       });

app.post('/signup', async (req, res) => {

  try{
    const body = req.body;

    // there must be a password in body

    // we follow these 2 steps

    const password = body.password;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    body.password = hash;

    console.log('hash - > ', hash);
     const user = new Users(body);


     const result = await user.save();

    res.send({
      message: 'Student signup successful'
    });

  }

  catch(ex){
    console.log('ex',ex)

    res.send({
      message: 'Error in signup',
      detail: ex
    }).status(500);
  }

  });

  app.post('/signupCustomer', async (req, res) => {

    try{
      const body = req.body;
  
      // there must be a password in body
  
      // we follow these 2 steps
  
      // const name = body.password;
  
      // // var salt = bcrypt.genSaltSync(10);
      // // var hash = bcrypt.hashSync(password, salt);
      // //body.password = hash;
  
      // console.log('hash - > ', hash);
      
      const customer = new Customers(body);
  
  
       const result = await customer.save();
  
      res.send({
        message: 'Student signup successful'
      });
  
    }
  
    catch(ex){
      console.log('ex',ex)
  
      res.send({
        message: 'Error in signup',
        detail: ex
      }).status(500);
    }
  
    });




    //   app.post('/login',  async (req, res) => {
    //     const body = req.body;
    //     console.log('req.body', body);
    
    //     const email = body.email;
    
    //     // lets check if email exists
    
    //     const result = await Student.findOne({"email":  email});
    //     console.log('result', result);
    //     if(!result) // this means result is null
    //     {
    //       res.status(401).send({
    //         Error: 'This user doesnot exists. Please signup first'
    //        });
    //     }
         
    //     if(body.password === result.password){

    //         // great, allow this user access
    
    //         console.log('match');
    
    //         res.send({message: 'Successfully Logged in'});
    //       }
    
    //         else{
    
    //           console.log('password doesnot match');
    
    //           res.status(401).send({message: 'Wrong email or Password'});
    //         }
    
    //     console.log('result', result);
    //     // 2. if exists, check if password matches
    
    // res.send({result: result});
    
    //   });

    app.post('/login', async (req, res) => {
      try {
        const body = req.body;
    
        const email = body.email;
    
        // lets check if email exists
    
        const result = await Users.findOne({ email: email });
        if (!result) {
          // this means result is null
          res.status(401).send({
            Error: 'This user doesnot exists. Please signup first'
          });
        } else {
          // email did exist
          // so lets match password
          if ( bcrypt.compareSync(body.password, result.password)) {
            // great, allow this user access
    
            console.log('match');
            delete result['password'];
            const token = jsonwebtoken.sign({
               data: result,
               role: 'User'
            }, 'supersecretToken', { expiresIn: '7d' });
            result.password = undefined;
            console.log('token -> ', token)
    
            res.send({ message: 'Successfully Logged in', token: token });
          }
          // if ( bcrypt.compareSync(body.password, result.password))
          // {//if (body.password === result.password) {
          //   // great, allow this user access
    
          //   console.log('match');
    
          //   res.send({ message: 'Successfully Logged in' });
          // }
           else {
            console.log('password doesnot match');
    
            res.status(401).send({ message: 'Wrong email or Password' });
          }
        }
      } catch (ex) {
        console.log('ex', ex);
      }
    });
    
      
// app.get('*', (req, res) => { 
//     res.send('Page doesnot exists');
//   });
  
  app.listen(port, () => {
    console.log('Express application running on localhost:',port);
  });
  

