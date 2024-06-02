//inkluderar beroenden:

//dotenv:
require('dotenv').config() 
//express:
const express = require('express');
//mongoose:
const mongoose = require('mongoose');
//bodyparser
const bodyParser = require('body-parser');
//routing:
const albumRoutes = require('./routes/albumRoutes');
//CORS:
const cors = require('cors');

//skapar ett app-objekt med express:
const app = express();
//definierar vilken port vi ska använda:
const PORT = process.env.PORT || 3000;

//ansluter till mongoDB med connection-strängen genom mongoose:
mongoose.connect('mongodb://localhost:27017/MusicDB', { useNewUrlParser: true, useUnifiedTopology: true });

//använder bodyParser för att parsera begäran i JSON:
app.use(bodyParser.json());

//använder Cors:
app.use(cors());

// använder album-routingen:
app.use('/Album', albumRoutes);

//ser till att konsoll-logga att vi lyssnar på rätt port:
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });