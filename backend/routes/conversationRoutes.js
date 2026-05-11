const express = require("express");
const {
  createOrGetConversation,
  getMyConversations,
  getConversationById,
  deleteConversationForMe,
} = require("../controllers/conversationController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
router.use(protect);


<<<<<<< HEAD
router.post("/", protect, createOrGetConversation);
router.get("/", protect, getMyConversations);
router.get("/:id", protect, getConversationById);
router.delete("/:id", protect, deleteConversationForMe);
=======
router.post("/", createOrGetConversation);
router.get("/",  getMyConversations);
router.get("/:id",  getConversationById);
router.delete("/:id",  deleteConversationForMe);
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba

module.exports = router;
