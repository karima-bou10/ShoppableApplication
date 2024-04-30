 // app.js
 const express = require('express');
 const app = express();
 const mongoose = require('mongoose');
 const cors = require('cors')
 const cookieParser = require('cookie-parser')

 const routes = require('./routes/routes')
 // Connect to MongoDB
 mongoose.connect('mongodb://127.0.0.1:27017/server', {
     useNewUrlParser: true,
     useUnifiedTopology: true
 })
 .then(() => console.log('Connected to MongoDB'))
 .catch(err => console.error('Error connecting to MongoDB:', err));

  // Define your routes here
  app.use(cookieParser())
  app.use(cors({
    credentails:true,
    origin: ['http://localhost:8082'] //add all front path
  }))
  app.use(express.json())
  app.use('/api',routes)
 const port = process.env.PORT || 3000;
 app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
 });
