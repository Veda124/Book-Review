const Review = require('../models/Review');
const mongoose = require('mongoose')
exports.addReview = async (req, res) => {
    try {
        const { rating, review } = req.body;
        const bookId = req.params.id;

        const existingReview = await Review.findOne({
            book: bookId,
            user: req.user._id
        });

        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this book' });
        }
        const reviewAdd = new Review({
            book: req.params.id,
            user: req.user._id,
            rating,
            review
        });
        await reviewAdd.save();
        res.status(200).json({ message: 'Review added successfully', review: reviewAdd });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add review', error: err.message });
    }
}


exports.updateReview = async (req, res) => {
    const reviewId = req.params.review_id;

    const { review, rating } = req.body;

    try {
        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { review, rating },
            { new: true } // return the updated document
        );

        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.json(updatedReview);
    } catch (err) {
        console.error('Update failed:', err);
        res.status(500).json({ message: 'Server error', err });
    }
};

exports.deleteReview = async (req, res) => {
    const reviewId = req.params.review_id;

    try {
        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.json({ message: "Review deleted successfully", deletedReview });
    } catch (err) {
        console.error('Delete failed:', err);
        res.status(500).json({ message: 'Server error', err });
    }
};

exports.getAverageRating = async (req, res) => {
    const bookId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: "Invalid book ID" });
    }

    try {
        const result = await Review.aggregate([
            {
                $match: {
                    book: new mongoose.Types.ObjectId(bookId)
                }
            },
            {
                $group: {
                    _id: "$book",
                    averageRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 }
                }
            }
        ]);


        if (result.length === 0) {
            return res.status(404).json({ message: "No reviews found for this book" });
        }

        res.json({
            bookId,
            averageRating: result[0].averageRating.toFixed(2),
            totalReviews: result[0].totalReviews
        });
    } catch (err) {
        console.error('Aggregation failed:', err);
        res.status(500).json({ message: 'Server error', err });
    }
};