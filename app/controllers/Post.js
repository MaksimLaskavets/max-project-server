const PostModel = require("../model/post");

exports.create = async (req, res) => {
  if (!req.body.title && !req.body.body && !req.body.id) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  const post = new PostModel({
    title: req.body.title,
    body: req.body.body,
  });

  await post
    .save()
    .then((data) => {
      res.send({
        message: "Post created successfully!!",
        post: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating post",
      });
    });
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
    const post = await PostModel.findById(req);
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
