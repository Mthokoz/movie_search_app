import express from express
import ReviewCtrl from "./reviews.controller.js"

const router = express.Router()

//router.route("/").get((req, res) => res.send("hello world"))

router.route("/movie/:id").get(ReviewCtrl.apiGetReviews)
router.route("/new").post(ReviewsCtrl.apiPostReview)
router.route("/:id")
    .get(ReviewsCtrl.apiGetReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewCtrl.apiDeleteReview)

export default router