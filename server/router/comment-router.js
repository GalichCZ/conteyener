const { Router } = require("express");
const router = new Router();
const CommentController = require("../controllers/comment-controller");
const CheckAuth = require("../utils/check-auth");

router.get("/api/comment/:comment_item", CommentController.getComments);
router.patch("/api/comment", CommentController.updateCommetn);
router.post(
  "/api/comment",
  CheckAuth.checkToken,
  CommentController.createComment
);

module.exports = router;
