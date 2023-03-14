const CommentService = require("../service/comment-service");

class CommentController {
  async createComment(req, res) {
    const comment = await CommentService.createComment(req);

    if (comment.success) res.status(200).json(comment.comment);
    else res.json(comment);
  }

  async getComments(req, res) {
    const comments = await CommentService.getComments(req);

    if (comments.success) res.status(200).json(comments.comment);
    else res.json(comments);
  }

  async updateCommetn(req, res) {
    const comment = await CommentService.updateComment(req);

    if (comment.success) res.status(200).json(comment);
    else res.json(comment);
  }
}

module.exports = new CommentController();
