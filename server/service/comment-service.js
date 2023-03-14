const CommentSchema = require("../models/comment-model");

class CommentService {
  async createComment(req) {
    try {
      const doc = await new CommentSchema({
        comment_date: req.body.comment_date,
        comment_text: req.body.comment_text,
        comment_creator: req.comment_creator,
        comment_item: req.body.comment_item,
      });

      const comment = await doc.save();

      return { comment, success: true };
    } catch (error) {
      console.log("COMMENT CREATE ERROR: ", error);
      return { error, success: false };
    }
  }

  async getComments(req) {
    try {
      const comments = await CommentSchema.find({
        comment_item: req.params.comment_item,
      }).exec();

      return { comments, success: true };
    } catch (error) {
      console.log("COMMENT GET ERROR: ", error);
      return { error, success: false };
    }
  }

  async updateComment(req) {
    try {
      await CommentSchema.updateOne(
        { _id: req.body._id },
        { comment_text: req.body.comment_text }
      );
      return { success: true };
    } catch (error) {
      console.log("COMMENT UPDATE ERROR: ", error);
      return { error, success: false };
    }
  }
}
module.exports = new CommentService();
