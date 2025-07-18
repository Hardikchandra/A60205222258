const express = require('express');
const router = express.Router();
const {
  createShortUrl,
  redirectToOriginal,
  getStats
} = require('../controllers/shorturlController');

router.post('/shorturls', createShortUrl);
router.get('/:shortcode', redirectToOriginal);
router.get('/shorturls/:shortcode', getStats);

module.exports = router;
