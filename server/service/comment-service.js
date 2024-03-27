const CommentSchema = require('../models/comment-model')
const ItemSchema = require('../models/item-model')
const { SendBotMessage } = require('./bot-service')
const dayjs = require('dayjs')

class CommentService {
  async createComment(req, creator) {
    try {
      const doc = await new CommentSchema({
        comment_date: req.body.comment_date,
        comment_text: req.body.comment_text,
        comment_creator: creator,
        comment_item: req.body.comment_item,
      })

      await ItemSchema.findByIdAndUpdate(req.body.comment_item, {
        latest_comment: req.body.comment_text,
        latest_comment_id: doc._id,
      })

      const comment = await doc.save()

      return { comment, success: true }
    } catch (error) {
      console.log('COMMENT CREATE ERROR: ', error)
      SendBotMessage(
        `${dayjs(new Date()).format('MMMM D, YYYY h:mm A')}\nCOMMENT CREATE ERROR:\n${error}`
      )
      return { error, success: false }
    }
  }

  async getComments(req) {
    try {
      const comments = await CommentSchema.find({
        comment_item: req.params.comment_item,
      })
        .populate('comment_creator', 'first_name last_name')
        .exec()

      return { comments, success: true }
    } catch (error) {
      console.log('COMMENT GET ERROR: ', error)
      SendBotMessage(
        `${dayjs(new Date()).format('MMMM D, YYYY h:mm A')}\nCOMMENT GET ERROR:\n${error}`
      )
      return { error, success: false }
    }
  }

  async updateComment(req) {
    try {
      await CommentSchema.findByIdAndUpdate(req.body.commentId, {
        comment_text: req.body.commentText,
      })

      const comment = await CommentSchema.findById(req.body.commentId)

      if (req.body.commentId.toString() === comment._id.toString()) {
        await ItemSchema.findByIdAndUpdate(req.body.bidId, {
          latest_comment: req.body.commentText,
        })
      }

      return { success: true }
    } catch (error) {
      console.log('COMMENT UPDATE ERROR: ', error)
      SendBotMessage(
        `${dayjs(new Date()).format('MMMM D, YYYY h:mm A')}\nCOMMENT UPDATE ERROR:\n${error}`
      )
      return { error, success: false }
    }
  }
}
module.exports = new CommentService()
