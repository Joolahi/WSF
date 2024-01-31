const mongoose = require("mongoose")
const dbName = 'Albums'
const collectionName = 'Albums'
require('dotenv').config()

const mongoURL = process.env.MONGO_URI
mongoose.connect(mongoURL, { dbName: dbName});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

const albumSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: false
    },
    artist: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: false,
    },
    year: {
        type: Number,
        required: false,
    },
    genre: {
        type: String,
        required: false,
    },
    tracks: {
        type: Number,
        required: false,
    }
    
},  {collection: collectionName})

const Albums = mongoose.model('Albums', albumSchema, collectionName)


const createAlbum = async (req, res) => {
    const { artist, title, year, genre, tracks } = req.body
    const newId = await generateNewId()
    const newAlbum = new Albums({ id: newId, artist, title, year, genre, tracks })
    await newAlbum.save()
    res.send(newAlbum)
}


const getAlbums = async (req, res) => {

    const { sortBy, releaseYear, fields, search } = req.query
    let result = Albums.find()

    if (releaseYear) {
        result = result.where('year').equals(releaseYear)
    }

    if (fields) {
        const selectFields = fields.split(',').join(' ')
        result = result.select('-_id ' + selectFields)
    }

    if (search) {
        result = result.where('artist').regex(new RegExp(search, 'i'))
    }

    if (sortBy) {
        const sortList = sortBy.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('artist')
    }

    const albums = await result
    res.send(albums)
}


const updateAlbum = (req, res) => {
    const id = req.params.id
    const { artist, title, year, genre, tracks } = req.body
    Albums.updateOne({ id: id }, { artist, title, year, genre, tracks }).then(result => {
        res.send(result)
    })
}
const deleteAlbum = (req, res) => {
    const id = req.params.id
    Albums.deleteOne({ id: id }).then(result => {
        res.send(result)
    })
}

module.exports = {
    getAlbums,
    createAlbum,
    updateAlbum,
    deleteAlbum
}
