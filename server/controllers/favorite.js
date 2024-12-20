const { favoritesModel } = require("../models/favorites");

const Add = async (req, res) => {
    console.log("Request Body:", req.body); 
    const { userId, bookId } = req.body; 
    try {
        const existingFavorite = await favoritesModel.findOne({ userId, bookId });
        
        if (existingFavorite) {
            return res.status(400).json({ message: 'Book already in favorites' });
        }

        const favorite = new favoritesModel({ userId, bookId });
        await favorite.save();

        res.status(201).json(favorite);
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ msg: error.message });
    }
}

const Find = async (req, res) => {
    const { userId } = req.query; 
    try {
        const favorite = await favoritesModel.find({ userId }).populate('bookId');
        res.status(200).json(favorite);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const Delete = async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        const favoriteDeleted = await favoritesModel.findOneAndDelete({ userId, bookId });

        if (!favoriteDeleted) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        res.status(200).json({ message: 'Favorite removed' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const TotalFavorites = async (req, res) => {
    try {
        const totalFavorites = await favoritesModel.find();
        res.status(200).json({ message: 'Favorites books fetched', data: totalFavorites })
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ msg: error.message });
    }
};

module.exports.favoritesControllers = {
    Add,
    Find,
    Delete,
    TotalFavorites,
}
