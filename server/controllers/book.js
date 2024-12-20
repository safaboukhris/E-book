const { bookModel } = require ("../models/book")
const upload = require("../utils/upload");
const uploadBook = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'cover', maxCount: 1 }])

const Add = async ( req, res) => {
    try {
        uploadBook(req, res, async function (err) {
         
              const book = await bookModel.create({
                ...req.body,
                file: req.files.file[0].filename,
                coverImage: req.files.cover[0].filename
            });
            res.send (book)  
        })
    } catch (error){
        console.log(error)
    }
};

const Find = async (req , res) => {
    try {
        const books = await bookModel.find().populate('user', '-password')
        res.send (books)

    } catch (error){
        console.log(error)
    }
}

const FindTen = async(req,res) =>{
    try{
        const tenBooks = await bookModel.find().sort({ createdAt: -1 }).limit(8);
        res.status(200).json({ message: ' ten Books retrieved successfully', data: tenBooks })

    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const FindOne = async (req, res) => {
    const {id} = req.params
    try {
        const book = await bookModel.findById(id).populate('user', '-password')
        if (!book){
            return res.status(404).json({message: "Book not found"})
        }
        res.status(200).json({msg:" get single book !!!!", book})
        console.log(book)
    } catch (error) {
        res.status(500).json ({msg : error.message})
    }
}

//get books by userId
const FindBooks = async (req, res) => {
    try {
        const books = await bookModel.find({ user: req.params.id }).populate('user', '-password'); 
        if (books.length > 0) {
            res.status(200).json({ msg: "Books retrieved successfully", books });
        } else {
            res.status(404).json({ msg: "No books found for this user" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
//get books by category Fiction
const getBooksByFiction = async (req, res) => {
    try {
      const books = await bookModel.find({ category: { $in: ['Fiction'] } });
      res.status(200).json({ message: `Books in category: Fiction`, data: books });
    } catch (error) {
      
      res.status(500).json({ success: false, message: error.message });
    }
  };

// get books by category Non Fiction
const getBooksByNonFiction = async (req, res) => {
    try {
      const books = await bookModel.find({ category: { $in: ['Non-Fiction'] } });
      res.status(200).json({ message: `Books in category: Non-Fiction`, data: books });
    } catch (error) {
      
      res.status(500).json({ success: false, message: error.message });
    }
  };

  // get books by category Drama 
  const getBooksByDrama = async (req, res) => {
    try {
      const books = await bookModel.find({ category: { $in: ['Drama'] } });
      res.status(200).json({ message: `Books in category: Drama`, data: books });
    } catch (error) {
      
      res.status(500).json({ success: false, message: error.message });
    }
  };
const Update = async (req, res) => {
    try{
        const updatedbook = await bookModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: {...req.body} },
            { new : true }
        );
        res.send(updatedbook)
    }catch(err){
        console.log(err)
    }
}

const Delete = async (req,res) => {
    try{
        const bookdeleted = await bookModel.deleteOne({ _id : req.params.id})
        res.send(bookdeleted)
    }catch(err){
        console.log(err)
    }
}

    //get searched book by title
const getBookByTitle = async (req,res) => {
    try{
        const searchQuery = req.query.title;
        const regex = new RegExp (searchQuery, 'i');
        const books = await bookModel.find({ title: regex });
        res.status(200).json({ message: 'Books retrieved successfully', data: books })
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//get recent books
const RecentBooks = async (req,res) => {
    try {
        const recentBooks = await bookModel.find().sort({ createdAt: -1 }).limit(4);
        res.status(200).json({ message: ' recent Books retrieved successfully', data: recentBooks })
    } catch (error){
        res.status(500).json({ success: false, message: error.message });
    }
}

//get featured  books
const featured = async (req, res) => {
    try {
        const featuredBook = await bookModel.find({ featured: true }).sort({ createdAt: -1 }).limit(4);
        res.status(200).json({ message: 'Featured books', data: featuredBook });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports.booksControllers = {
    Add,
    Find,
    FindOne,
    Update,
    Delete,
    getBookByTitle,
    RecentBooks,
    featured,
    FindTen,
    FindBooks,
    getBooksByFiction,
    getBooksByNonFiction,
    getBooksByDrama,
};