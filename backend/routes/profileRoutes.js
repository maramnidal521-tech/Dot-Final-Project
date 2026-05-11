const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/profileController');
const { protect, optionalAuth } = require('../middlewares/authMiddleware');

router.use('/me', protect); 
router.get('/me', ctrl.getMyProfile);
router.put('/me', ctrl.updateProfile);
router.get('/me/posts', ctrl.getMyPosts);
router.get('/me/saved', ctrl.getSavedPosts);
router.post('/me/save/:postId', ctrl.toggleSavePost); 
<<<<<<< HEAD
router.post('/me/refresh-stats', ctrl.refreshStats);
router.get('/:identifier', optionalAuth, ctrl.getPublicProfile);
router.get('/:id/posts', optionalAuth, ctrl.getUserPosts);

module.exports = router;
=======
router.post('/me/save/:postType/:postId', ctrl.toggleSavePost);
router.post('/me/refresh-stats', ctrl.refreshStats);
router.get('/:id/posts', optionalAuth, ctrl.getUserPosts);

router.get('/:identifier', optionalAuth, ctrl.getPublicProfile);

module.exports = router;
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
