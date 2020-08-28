const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Video = require('../models/video')
const cors = requrie('cors')

const db = "mongodb://localhost:27017/videoplayer"
mongoose.Promise = global.Promise;

mongoose.connect(db, function(err) {
    if(err) {
        console.log("ERROR! " + err)
    } else {
        console.log("Connect to mongodb successfully")
    }
})



router.get('/videos',cors(), function(req, res){
    console.log('Get Request for All Videos')
    Video.find({})
        .exec(function(err, videos){
            if(err){
                console.log("Error Retrieving Videos")
            }
            else{
                res.json(videos)
            }
        });
});


router.get('/videos/:id', function(req, res){
    console.log('Get Request for a single Video')
    Video.findById(req.params.id)
        .exec(function(err, video){
            if(err){
                console.log("Error Retrieving Video")
            }
            else{
                res.json(video)
            }
        });
});

router.post('/video', function(req, res){
    console.log("Post a videos");

    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;

    newVideo.save(function(err, insertedVideo){
        if(err){
            console.log("Error Saving videos");
        }
        else{
            res.json(insertedVideo);
        }
    })
   
});

router.put('/video/:id', function(req, res){
    console.log("Updating a videos");

    Video.findByIdAndUpdate(req.params.id,
        
        {
            $set:{title:req.body.title, url:req.body.url, description:req.body.description}
        },
        {
            new:true
        },
        function(err, updatedVideo){
            if(err){
                res.send("Error Updating a Video");
            }
            else{
                res.json(updatedVideo);
            }
        }
        
        )
});

router.delete('/video/:id', function(req, res){
    console.log("Deleting a videos");

    Video.findByIdAndRemove(req.params.id, function(err, deletedVideo){
        
        if(err){
            res.send("Error deleting a Video");
        }
        else{
            res.json(deletedVideo);
        }
    }
    )
}); 


module.exports = router