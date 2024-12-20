const express = require ("express")
const router = express.Router();
const { booksControllers } = require("../controllers/book")

router.get('/book/search', booksControllers.getBookByTitle)
router.post ('/book', booksControllers.Add )
router.get ("/books", booksControllers.Find)
router.get("/book-ten",booksControllers.FindTen)
router.get("/books/recent", booksControllers.RecentBooks)
router.get("/book/featuredBooks", booksControllers.featured)
router.get("/book/fiction",booksControllers.getBooksByFiction)
router.get("/book/nonfiction",booksControllers.getBooksByNonFiction)
router.get("/book/drama", booksControllers.getBooksByDrama)
router.get("/books/user/:id",booksControllers.FindBooks)
router.get("/book/:id",booksControllers.FindOne)
router.patch("/book/:id",booksControllers.Update)
router.delete("/book/:id",booksControllers.Delete)


module.exports.booksRoute = router