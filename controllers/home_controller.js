const Post = require('../models/post');



module.exports.home = async function (req, res) {
    // try {
    //     const posts = await Post.find({});
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // } catch (err) {
    //     // Handle the error
    //     console.error(err);
    //     return res.status(500).send("Internal Server Error");
    // }

    // populate the user of each post
    try {
        const posts = await Post.find({}).populate('user').exec();
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    } catch (err) {
        // Handle the error
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};
