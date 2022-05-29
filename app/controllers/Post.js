const PostModel = require("../model/post");
const User = require("../model/user");
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  try {
    const { title, body, user } = req.body;

    if (!title && !body && !user) {
      res.status(400).send({ message: "Content can not be empty!" });
    }

    const currentUser = await User.findById(user);

    if (!currentUser) {
      res.status(404).send({ message: "User doesn't exist " });
    }

    const post = new PostModel({
      title: title,
      body: body,
      user: user,
    });

    const newPost = await post.save();

    currentUser.posts.push(post._id);

    await currentUser.save();

    res.status(200).json({
      message: "Post created successfully!!",
      post: newPost,
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
    res.status(400).json({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id).populate("user");
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, body } = req.body;
    const id = req.params.id;

    if (!title || !body) {
      res.status(400).send({ message: "Data to update can not be empty!" });
    }

    if (id.length !== 24) {
      res.status(400).send({ message: "Id is not valid" });
    }

    //  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    //    res.status(404).send({ message: "Post doesn't exist " });
    //  }

    const post = await PostModel.findById(id).populate("user");

    if (!post) {
      res.status(404).send({ message: "Post doesn't exist " });
    }

    await PostModel.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });

    res.status(200).json({
      message: "Post updated successfully!!",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.destroy = async (req, res) => {
  try {
    const id = req.params.id;

    const post = await PostModel.findById(id).populate("user");

    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }

    await PostModel.findByIdAndRemove(id);

    const currentUser = await User.findById(post.user._id).populate("posts");

    //  currentUser.posts = currentUser.posts.filter(
    //    (post) => post.user._id !== req.params.id
    //  );

    currentUser.save();

    res.status(200).json({
      message: "Post deleted successfully!!",
      currentUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
