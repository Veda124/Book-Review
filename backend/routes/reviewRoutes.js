const express = require('express');
const router = express.Router();
const { addReview, updateReview, deleteReview, getAverageRating } = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/:id/review', authMiddleware, addReview); //id : book_id
// router.get('/:id/reviews', getReviews);
router.get('/:id/average-rating', getAverageRating);
router.put('/:review_id/update-review', authMiddleware, updateReview);
router.delete('/:review_id/reviews', authMiddleware, deleteReview);


module.exports = router;

