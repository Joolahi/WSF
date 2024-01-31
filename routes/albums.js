const express = require('express')
const router = express.Router()

const {
    getAlbums,
    createAlbum,
    updateAlbum,
    deleteAlbum,
} = require('../controller/albums')

const auth = require('../middleware/auth')

router.get('/', async (req, res, next) => {
    try {
        await getAlbums(req, res)
    } catch (error) {
         return res.status(401).json({ error })
    }
})


router.post('/', auth, async (req, res, next) => {
    try {
        await createAlbum(req, res)
    } catch (error) {
         return res.status(401).json({ error})
    }
})

router.put('/:id', auth, async (req, res, next) => {
    try {
        updateAlbum(req, res)
    } catch (error) {
         return res.status(401).json({ error })
    }
})

router.delete('/:id', auth, async (req, res, next) => {
    try {
        deleteAlbum(req, res)
    } catch (error) {
        return res.status(401).json({ error })
    }
})

module.exports = router