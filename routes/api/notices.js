const express = require('express');
const router = express.Router();
const { notices: ctrl } = require('../../controllers');

//================ GET NOTICES BY CATEGORY ================
router.get('/:category', ctrl.getByCategory);

//================ GET NOTICE BY ID ================
router.get('/:noticeId', async (req, res) => {
  res.json({ message: '' });
});

//================ GET USER FAVORITE NOTICES ================
router.get('/:userId/favorites', async (req, res) => {
  res.json({ message: '' });
});

//================ GET USER NOTICES ================
router.get('/:userId', async (req, res) => {
  res.json({ message: '' });
});

//================ DELETE USER NOTICE ================
router.delete('/:notiveId', async (req, res) => {
  res.json({ message: '' });
});

//================ ADD/DELETE NOTICE TO FAVORITE ================
router.patch('/:noticeId/favorite', async (req, res) => {
  res.json({ message: '' });
});

//================ CREATE NOTICE ================
router.post('/', ctrl.addNotice);

module.exports = router;
