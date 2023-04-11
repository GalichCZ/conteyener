const CommentSchema = require("../models/comment-model");
const UserSchema = require("../models/user-model");
const { SendBotMessage } = require("./bot-service");
const dayjs = require("dayjs");
class CommentService {
  async createComment(req, creator) {
    try {
      const user = await UserSchema.findById(creator);

      const doc = await new CommentSchema({
        comment_date: req.body.comment_date,
        comment_text: req.body.comment_text,
        comment_creator: creator,
        comment_item: req.body.comment_item,
        creator_name: user,
      });

      const comment = await doc.save();

      return { comment, success: true };
    } catch (error) {
      console.log("COMMENT CREATE ERROR: ", error);
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nCOMMENT CREATE ERROR:\n${error}`
      );
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
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nCOMMENT GET ERROR:\n${error}`
      );
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
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nCOMMENT UPDATE ERROR:\n${error}`
      );
      return { error, success: false };
    }
  }
}
module.exports = new CommentService();
