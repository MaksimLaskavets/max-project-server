import CommentModel from "../model/comment.js";

export const create = async (req, res) => {
  if (!req.body.name && !req.body.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  const comment = new CommentModel({
    name: req.body.name,
    body: req.body.body,
  });

  await comment
    .save()
    .then((data) => {
      res.send({
        message: "Comment created successfully!!",
        comment: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating comment",
      });
    });
};

export const findAll = async (req, res) => {
  try {
    const comment = await CommentModel.find();
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const findOne = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await CommentModel.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Comment not found.`,
        });
      } else {
        res.send({ message: "Comment updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

export const destroy = async (req, res) => {
  await CommentModel.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Comment not found.`,
        });
      } else {
        res.send({
          message: "Comment deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
