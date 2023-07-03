const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function (req, res) {
  Post.create({
    content: req.body.content,
    user: req.user._id
  })
    .then((post) => {
      req.flash('success', 'Post published!');
      return res.redirect('back');
    })
    .catch((err) => {
      req.flash('error', err);
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
            req.flash('success', 'Post and associated comments deleted!');
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        // Handle the error
        req.flash('error', 'You cannot delete this post!');
        return res.status(500).send("Internal Server Error");
    }
};
