const router = require('express').Router();
const verify = require('./verifyToken');
const Post = require('../model/Post');
router.get('/', verify,(req,res)=>{
    console.log("reeeeeeq",req.user);
res.send(req.user);
});

//get all tasks
router.get('/p', async (req,res)=>{
    console.log("entreeeeeeeeeeed   ");
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.json({message: error});
    }
});



//add new task
router.post('/', verify, async (req,res)=>{
    console.log("reeeeeeq",req.user);
    const post = new Post({
        text: req.body.text,
        day: req.body.day,
        reminder: req.body.reminder
    });
   /*
    post.save()
    .then(data =>{
        res.json(data);
    })
    .catch (error=> {
        res.json({messages: error})
    })
*/
    try {
        const savedPost = await post.save()
        res.json(savedPost);
    } catch (error) {
        res.json({message: error});
        res.status(400).send(error);
    }
   
});


//specific post
router.get('/:postId', async (req,res)=>{
    try {
        const post = await Post.findById(req.params.postId);
      res.json(post);
    } catch (error) {
        res.json({message: error});
    }

});

//delete task
router.delete('/:postId', async (req,res)=>{
    try {
        const postRemoved = await Post.deleteOne({_id: req.params.postId});
        res.json(postRemoved);
    } catch (error) {
        res.json({message : error});
    }
    });

    //edit reminder Task
    router.patch('/:postId', async (req,res)=>{
        try {
            const updatedPost = await Post.updateOne(
                {_id: req.params.postId},
                {$set: {reminder: req.body.reminder}});
               res.json(updatedPost);
        } catch (error) {
            res.json({message: error});
        }
    } );
module.exports = router;