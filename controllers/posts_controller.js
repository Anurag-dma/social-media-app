const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function (req, res) {
  Post.create({
    content: req.body.content,
    user: req.user._id
  })
    .then((post) => {
      return res.redirect('back');
    })
    .catch((err) => {
      console.log('Error in creating a post:', err);
      return res.redirect('back');
    });
};


module.exports.destroy = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if (post.user == req.user.id) {
            await post.deleteOne();
    
            await Comment.deleteMany({ post: req.params.id });
    
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        // Handle the error
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};
