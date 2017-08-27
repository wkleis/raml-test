const authors = [
  {
    authorId: "938146d4-8b24-11e7-bb31-be2e44b06b34",
    name: "Herman Hesse",
    born : "1877-07-02"
  },{
    authorId: "2ee25476-8b28-11e7-bb31-be2e44b06b34",
    name: "John Irving",
    born : "1942-03-02"
  }
];

const books = [{
  bookId: "683880b4-8b24-11e7-bb31-be2e44b06b34",
  title: "Steppenwolf",
  authorId: "938146d4-8b24-11e7-bb31-be2e44b06b34",
  bookType: "hardcover"
},{
  bookId: "33f53000-8b28-11e7-bb31-be2e44b06b34",
  title: "The Cider House Rules",
  authorId: "2ee25476-8b28-11e7-bb31-be2e44b06b34",
  bookType: "hardcover"
}];

function bookById(id){
  return books.find(book=>book.bookId===id);
}

function authorById(id){
  let author =  authors.find(author=>
    author.authorId===id
  );
  return author;
}

module.exports={
  books,
  authors,
  bookById,
  authorById,
};
