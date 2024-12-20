const express = require ("express")
const router = express.Router();
const { contactControllers } = require('../controllers/contact')

router.post('/contact', contactControllers.Add )
router.get('/contact', contactControllers.Get)
router.delete('/contact/:id', contactControllers.Delete)


module.exports.contactRoute = router;