const osprey = require('osprey');
const router = osprey.Router();

const data = require('./data.js');


router.get('/books', function (req, res) {
  res.json(data.books);
});

router.post('/books', function (req, res) {
  let book = req.body;
  if(data.bookById(book.bookId)){
    res.status(400).json({message: `Cannot create book. Book '${book.bookId}' already exists`});
  }else{
    data.books.push(book);
    res.status(201).json(book);
  }
});

router.post('/authors', function (req, res) {
  let author = req.body;
  if(data.authorById(author.authorId)){
    res.status(400).json({message: `Cannot create author. Author '${author.authorId}' already exists`});
  }else{
    data.authors.push(author);
    res.status(201).json(author);
  }
});

router.get('/books/{bookId}', function (req, res) {
  let bookId = req.params.bookId;
  let book = data.bookById(bookId);
  if(book){
    res.json(book);
  }else{
    res.status(404).json({message: `Not Found: Book "${bookId}"`});
  }
});

router.get('/authors', function (req, res) {
  res.json(data.authors);
});

router.get('/authors/{authorId}', function (req, res) {
  let authorId = req.params.authorId;
  let author = data.authorById(authorId);
  if(author){
    res.json(author);
  }else{
    res.status(404).json({message: `Not Found: Author "${authorId}"`});
  }

});

module.exports=router;
