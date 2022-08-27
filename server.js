'use_strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();
app.use(cors());


const PORT = process.env.PORT || 3005;

app.get('/', handleHome);
app.get('/photo', handleSearch);

// app.get('/search/photos', handlePhoto)



function handleHome(req, res) {
    res.send("im a live")
}
// GET http://localhost:3004/photo?photoName=pen
async function handleSearch(req, res) {
    const photoName = req.query.photoName
    console.log(photoName)

    //send photo what user ask for it 
    const url = (`https://api.unsplash.com/search/photos?client_id=${process.env.ACC_KEY}&query=${photoName} `)
    const getPhoto = await axios.get(url)
    console.log(getPhoto.data.results)
    let photoArr = getPhoto.data.results.map(photoObject => {
        return new Photo(photoObject)
    })



    res.send(photoArr)
}








app.listen(PORT, () => {
    console.log(`server work on port ${PORT} `)
})

class Photo {
    constructor(opject) {
        this.imgUrl = opject.urls.regular;
        this.name = opject.user.name;
        this.description = opject.alt_description;
    }

}