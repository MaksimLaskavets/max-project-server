const PostModel = require("../model/post");
const User = require("../model/user");

exports.create = async (req, res) => {
  try {
    const { title, body, user } = req.body;

    if (!title && !body && !user) {
      res.status(400).send({ message: "Content can not be empty!" });
    }

    const currentUser = User.findById(user);

    if (!currentUser) {
      res.status(400).send({ message: "User doesn't exist " });
    }

    const post = new PostModel({
      title: title,
      body: body,
      user: user,
    });

    const newPost = await post.save();

    currentUser.posts.push(post._id);

    await currentUser
      .save()
      .then((newPost) => {
        res.send({
          message: "Post created successfully!!",
          post: newPost,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating post",
        });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const post = await PostModel.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id).populate("user");
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await PostModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Post not found.`,
        });
      } else {
        res.send({ message: "Post updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.destroy = async (req, res) => {
  await PostModel.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Post not found.`,
        });
      } else {
        res.send({
          message: "Post deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
