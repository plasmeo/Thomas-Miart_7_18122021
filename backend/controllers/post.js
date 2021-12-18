const { debug } = require('console');
const fs = require('fs');
const Models = require('../models');
const jwt = require('jsonwebtoken');

exports.findPost = (req, res, next) => {
    const posts = Models.Post.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
      };

      
exports.getComments = (req, res, next) => {
  const comments = Models.Comments.findAll()
  .then(comments => res.status(200).json(comments))
  .catch(error => res.status(400).json({ error }));
    };

exports.findOnePost = (req, res, next) =>{
    Post.findOne({_id: req.params.id})
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({error}));
};

exports.createPost = (req, res, next) =>{
  console.log(req.file);
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, process.env.token);
  const userId = decodedToken.userId;
  let fileUrl;
  if (req.file != null){
  fileUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  }
    const postObject = req.body;
    delete postObject._id;
    const post = Models.Post.create({
      title: postObject.postTitle,
      content: postObject.postContent,
      picURL: fileUrl,
      likes: '0',
      dislikes: '0',
      UserId:userId,
      usersLiked: userId
  }
  )
  .then(() => res.status(200).json({message: "Post créé"}))
  .catch(error => {//console.log(error);
    res.status(400).json({error})
//console.log(error)
})
};




exports.updatePost = (req, res, next) => {
    const postObject = req.file ?
    {        
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
     } : { ...req.body };

  Post.updateOne({_id: req.params.id}, {...postObject, _id: req.params.id})
  .then(() =>res.status(200).json({ message: 'Objet modifié'}))
  .catch(error => res.status(400).json({ error }));
  };





exports.deletePost = (req, res, next) => {

  Models.Comments.findAll({ 
    where: {
      postId: req.params.postId
    }
   })
  .then(comments => {
    comments.forEach(comment => {
      comment.destroy();
    })
  })
  .catch(error => {console.log(error);res.status(500).json({error});})
  
  Models.Post.findOne({ _id: req.params.postId })
    .then(post => {
     post.destroy();
     res.status(200).json({message: "post deleted"})
    })
    .catch(error => {console.log(error);res.status(500).json({error});

})

  };





  exports.likePost = (req, res, next) => {

   // console.log(req.body.like);

const post = Models.Post.findOne({ where: { id: req.body.postId } })
.then((post) => {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, process.env.token);
  const userId = decodedToken.userId;

  let like = parseInt(req.body.like);

  if (userId != post.UserId){
   
    if (like >0){
      let usersLiked = post.usersLiked;
      let usersArray = usersLiked.split(',');
      let found = false;
      usersArray.forEach(id => {
        if (id == userId){
          found = true;
          res.status(401).json({ message: 'AlreadyLiked'})
        }
      });
      if (!found){
  
        let usersDisliked = post.usersDisliked;
        let dislikes = post.dislikes;
        let userDislkedArray = usersDisliked.split(',')
        userDislkedArray.forEach(id => {
          if (id == userId){
            if (post.dislikes > 0){
              dislikes --;
            }
            userDislkedArray.splice(userDislkedArray.indexOf(id),1);
            usersDisliked = userDislkedArray.join(',');
          }
        })
  
  
        usersLiked+= (","+userId);  
        console.log(usersLiked);
       // post.usersLiked = usersLiked;
       let likes = post.likes;     
        likes ++;
        post.set({
          usersLiked:usersLiked,
          likes: likes,
          usersDisliked:usersDisliked,
          dislikes: dislikes
        });
        post.save();
    
        res.status(200).json({ 
          message: 'Like pris en compte',        
          likes: likes,
          dislikes: dislikes})
      }
    }
  
    if (like <0){
      let usersDisliked = post.usersDisliked;
      let found = false;
      if (usersDisliked != null){
  
        let usersDislikeArray = usersDisliked.split(',');
        console.log(usersDislikeArray);
        usersDislikeArray.forEach(id => {
          if (id == userId){
            found = true;
            res.status(401).json({ message: 'AlreadyDisliked',})
          }
        });
      }
      
      if (!found){
  
        
        let usersLiked = post.usersLiked;
        let likes = post.likes;
        let userLikedArray = usersLiked.split(',')
        userLikedArray.forEach(id => {
          if (id == userId){
            if (post.likes > 0){
              likes --;
            }
            userLikedArray.splice(userLikedArray.indexOf(id),1);
            usersLiked = userLikedArray.join(',');
          }
        })
  
        usersDisliked+= (","+userId);  
  
       // post.usersLiked = usersLiked;
       let dislikes = post.dislikes;     
       dislikes ++;
        post.set({
          usersDisliked:usersDisliked,
          dislikes: dislikes,
          likes: likes,
          usersLiked: usersLiked
        });
        post.save();
    
        res.status(200).json({ 
          message: 'Dislike pris en compte',
          likes: likes,
          dislikes: dislikes})
      }
    }

  } else{
    res.status(401).json({ message: 'Cant like or dislike your own post',})
  }
  
})
.catch(error => res.status(400).json({error}));
};


exports.addComment = (req, res, next) => {
  console.log(req.body);

  
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, process.env.token);
  const userId = decodedToken.userId;
  let username;
  Models.User.findOne({ where: {id: userId} })
  .then(user => {
    username = user.dataValues.email;
    console.log(user);
    console.log(username);
    
    const commentObject = req.body;
    delete commentObject._id;
    const comment = Models.Comments.create({
      Content: commentObject.commentContent,
      UserId:userId,
      userName: username,
      PostId: commentObject.postId
  }
  )
  .then(() => res.status(200).json({message: "Comment posté"}))
  .catch(error => {console.log(error);res.status(400).json({error})
console.log(error)})  
  });

};

exports.deleteComment = (req, res, next) => {

  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, process.env.token);
  const userId = decodedToken.userId;
  let username;
  Models.User.findOne({ where: {id: userId} })
  .then(user => {
    Models.Comments.findOne({ _id: req.params.commentId })
      .then(comment => {
        if (user.isAdmin || comment.UserId == userId){
          comment.destroy();
          res.status(200).json({message: "Comment deleted"})
        }
      })
      .catch(error => {console.log(error);res.status(500).json({error})})
    .catch( {

    })

  })


}