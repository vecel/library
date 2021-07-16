function Book (id, title, author, pages, isRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.info = function() {
    return `${this.id}, ${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? 'already read' : 'not read yet'}`;
}

const theHobbit = new Book(0, 'The Hobbit', 'J.R.R. Tolkien', 295, true);
const lettersFromGrave = new Book(1, 'Listy Zza Grobu', 'Remigiusz Mróz', 457, true);

let library = [theHobbit, lettersFromGrave];

function addBook() {
    const bookInfo = prompt('Enter book title / author / number of pages / is book read (true or false)').split('/');

    const id = library.length;
    const title = bookInfo[0];
    const author = bookInfo[1];
    const pages = bookInfo[2].toString();
    const isRead = bookInfo[3] == 'true' ? true : false;

    const book = new Book(id, title, author, pages, isRead);
    library.push(book);
}

// addBook();

// console.log(Book.prototype);
console.table(library);