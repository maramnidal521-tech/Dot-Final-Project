const express = require("express");
const {
  sendMessage,
  getMessagesByConversation,
  deleteMessageForEveryone,
} = require("../controllers/messageController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
router.use(protect);

<<<<<<< HEAD
router.post("/", protect, sendMessage);
router.get("/:conversationId", protect, getMessagesByConversation);
router.delete("/:id", protect, deleteMessageForEveryone);
=======
router.post("/",  sendMessage);
router.get("/:conversationId",  getMessagesByConversation);
router.delete("/:id",  deleteMessageForEveryone);
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba

module.exports = router;
