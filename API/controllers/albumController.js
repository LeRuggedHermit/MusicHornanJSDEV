const Music = require('../models/Album');

const albumController = {
  getAll: async (req, res) => {
    // Implementerar logik för att hämta alla dokument:
    try {
      //använder mongoose-find metod för att hitta dokument:
        const musicList = await Music.find();
        //returnerar listan som JSON
        res.json(musicList);
        //om vi får error
      } catch (error) {
        //vill jag veta det här:
        res.status(500).json({ error: error.message });
      }
  },

  getById: async (req, res) => {
    // Implementerar logik för att GET:a ett dokument med ID
    try {
      //Hämta parametrar från parametrar i begäran:
        const music = await Music.findById(req.params.id);
        //använder en if-sats för att se om vi kan hitta id:
        if (music) {
          //om ID kan lokaliseras: 
          res.json(music);
        } else {
          //annars felmeddelande:
          res.status(404).json({ message: 'Kunde inte hittas' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  },

  create: async (req, res) => {
    // Implementerar logik för POST 
    try {
      //skapar variabel för data i begäran:
        const newMusic = new Music(req.body);
        //använder denna variabel för post-anrop till DB
        const savedMusic = await newMusic.save();
        //om svaret är okej:
        res.status(201).json(savedMusic);
      } catch (error) {
        //annars ge mig error:
        res.status(400).json({ error: error.message });
      }
  },

  update: async (req, res) => {
    // Implementerar logik för PUT med id 
    try {
      //för att uppdatera måste vi hitta det vi ska uppdatera:
        const updatedMusic = await Music.findByIdAndUpdate(
          //vi använder id från parametrar och kroppen
          req.params.id,
          req.body,
          { new: true }
        );
        if (updatedMusic) {
          res.json(updatedMusic);
        } else {
          res.status(404).json({ message: 'Kunde inte hittas' });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
  },

  delete: async (req, res) => {
    // Implementera logik för att radera med id 
    try {
        const deletedMusic = await Music.findByIdAndDelete(req.params.id);
        if (deletedMusic) {
          res.json(deletedMusic);
        } else {
          res.status(404).json({ message: 'Kunde inte hittas' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }
};

module.exports = albumController;