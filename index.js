const {UserDataToMongo} = require("./db/db.connect");

UserDataToMongo();

const bookModel = require("./models/books.models");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
require("dotenv").config();

//Adding New Books to Database

const individualNewBookDataToDataBase = async (Book)=>{
    try{
const newBookData = new bookModel(Book);
const newBookDataSaved = await newBookData.save();
return newBookDataSaved;
    } catch(error){
console.log("Error Seeding the Data.", error);
    }
}

app.post("/books", async (req,res)=>{
try {
    const addNewBook = await individualNewBookDataToDataBase(req.body);
    res.status(201).json({message:"New Book Added to Database.", addNewBook});
} catch (error) {
    res.status(500).json({error:"Failed to Add New Books to Database."});
}
});

//Getting all the books in the database as response.

const readAllBookData = async () => {
  try {
    const AllBookData = await bookModel.find();
    console.log(AllBookData);
    return AllBookData;
  } catch (error) {
    console.log(error);
  }
};

app.get("/books", async (req,res)=>{
try {
    const readingAllBookData = await readAllBookData();
    if (!readingAllBookData) {
        res.status(404).json({error:"Book Data Not Found."});
    } else {
        res.status(200).json({message:"All Book Data Fetched from the Database.",readingAllBookData});
    }
} catch (error) {
    res.status(500).json({error:"Failed to Fetch All Book Data From the Database."})
}
});

//Getting Book Data using only its Title

const readBookDataByTitle = async (Title) => {
  try {
    const BookDataByTitle = await bookModel.findOne({title:Title});
    console.log(BookDataByTitle);
    return BookDataByTitle;
  } catch (error) {
    console.log(error);
  }
};

app.get("/books/:bookTitle", async (req,res)=>{
try {
    const readingBookDataByTitle = await readBookDataByTitle(req.params.bookTitle);
    if (!readingBookDataByTitle) {
        res.status(404).json({error:"Book Data Not Found."});
    } else {
        res.status(200).json({message:"All Book Data Fetched from the Database using Title.",readingBookDataByTitle});
    }
} catch (error) {
    res.status(500).json({error:"Failed to Fetch Book Data from the Database using Title."});
}
});

//Getting Book Data using only its Authors

const readBookDataByAuthor = async (Author) => {
  try {
    const BookDataByAuthor = await bookModel.findOne({author:Author});
    console.log(BookDataByAuthor);
    return BookDataByAuthor;
  } catch (error) {
    console.log(error);
  }
};

app.get("/books/author/:bookAuthorName", async (req,res)=>{
try {
    const readingBookDataByAuthor = await readBookDataByAuthor(req.params.bookAuthorName);
    if (!readingBookDataByAuthor) {
        res.status(404).json({error:"Book Data Not Found."});
    } else {
        res.status(200).json({message:"All Book Data Fetched from the Database using Author Name.", readingBookDataByAuthor});
    }
} catch (error) {
    res.status(500).json({error:"Failed to Fetch "});
}
});

//Getting Book Data using only its Genre 

const readBooksByGenre = async (genreName) => {
  try {
    const BooksByGenre = await bookModel.findOne({ genre: genreName });
    console.log(BooksByGenre);
    return BooksByGenre;
  } catch (error) {
    console.log("Error fetching books by genre:", error);
  }
};

app.get("/books/genre/:genreName", async (req, res) => {
  try {
    const readingBooksByGenre = await readBooksByGenre(req.params.genreName);

    if (!readingBooksByGenre) {
      return res.status(404).json({ error: "Book Not Found." });
    } else {
res.status(200).json({message:"Book Data Fetched using Genre.", readingBooksByGenre});
    } 
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch books." });
  }
});

//Getting Book Data using only its Release Year

const readBooksByYear = async (year) => {
  try {
    const BooksByYear = await bookModel.findOne({ publishedYear: year });
    console.log(BooksByYear);
    return BooksByYear;
  } catch (error) {
    console.log("Error fetching books by year:", error);
  }
};

app.get("/books/year/:releaseYear", async (req, res) => {
  try {
        const readingBooksByYear = await readBooksByYear(req.params.releaseYear);
        
    if (!readingBooksByYear) {
    res.status(404).json({ error: "Book Not Found." });
    } else {
res.status(200).json({message:"Book Data Fetched using Release Year.", readingBooksByYear});
    } 
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch books." });
  }
});

//update a book's rating with the help of its id

const updateBookRatingById = async (BookId, toUpdateRating)=>{
try {
    const BookRatingById = await bookModel.findByIdAndUpdate(BookId, toUpdateRating, {new:true});
    console.log(BookRatingById);
    return BookRatingById;
} catch (error) {
    console.log(error);
}
}

app.post("/books/rating/:bookId", async (req,res)=>{
try {
    const updatedBookRatingById = await updateBookRatingById(req.params.bookId, req.body);
    if (!updatedBookRatingById) {
        res.status(404).json({error:"Book not found."});
    } else {
        res.status(201).json({message:"Updated Book Data From The Database using Title",updatedBookRatingById});
    }
} catch (error) {
    res.status(500).json({error:"Failed to Update Book Data From The Database using Book Id."});
}
});

//update a book's rating with the help of its Title

const updateBookRatingByTitle = async (bookTitle, updateRatingByTitle)=>{
try {
    const BookRatingByTitle = await bookModel.findOneAndUpdate(bookTitle, updateRatingByTitle, {new:true});
    console.log(BookRatingByTitle);
    return BookRatingByTitle;
} catch (error) {
    console.log(error);
}
}

app.post("/books/rating/title/:bookTitle", async (req,res)=>{
try {
    const updatedBookRatingByTitle = await updateBookRatingByTitle(req.params.bookTitle, req.body);
    if (!updatedBookRatingByTitle) {
            res.status(404).json({error:"Book Data Not Found."});
    } else {
        res.status(201).json({message:"Updated Book Data From The Database using Title", updatedBookRatingByTitle});
    }
} catch (error) {
        res.status(500).json({error:"Failed to Update Book Data From The Database using Title"});
}
});

//delete a book with the help of a book id

const deleteBookDataById = async (bookId)=>{
try {
    const BookDataById = await bookModel.findByIdAndDelete(bookId);
    console.log(BookDataById);
    return BookDataById;
} catch (error) {
    console.log(error);
}
}

app.delete("/books/:bookId", async (req,res)=>{
try {
    const deletingBookDataById = await deleteBookDataById(req.params.bookId);
    if (!deletingBookDataById) {
        res.status(404).json({error:"Book Not Found to Delete."});
    } else {
        res.status(201).json({message:"Book Data Deleted Using Id.", deletingBookDataById});
    }
} catch (error) {
    res.status(500).json({error:"Failed to Delete book Data from the Database using Book Id."});
}
})

const PORT = process.env.PORT||3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});