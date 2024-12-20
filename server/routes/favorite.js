const express = require ('express')
const router = express.Router();
const { favoritesControllers} = require ('../controllers/favorite')

router.post('/favorite', favoritesControllers.Add )
router.get('/favorite',  favoritesControllers.Find)
router.delete('/favorite', favoritesControllers.Delete)
router.get('/total-favorites', favoritesControllers.TotalFavorites);

module.exports.favoritesRouter = router