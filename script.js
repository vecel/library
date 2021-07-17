const booksContainer = document.querySelector('.books-container');
const addBookButton = document.querySelector('.new-book');

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

addBookButton.addEventListener('click', addBook);

for (let book of library) displayBook(book);



function addBook() {
    /* show dialog window and ask for book properties */

    const bookInfo = prompt('Enter book title / author / number of pages / is book read (true or false)').split('/');

    const id = library.length;
    const title = bookInfo[0];
    const author = bookInfo[1];
    const pages = bookInfo[2].toString();
    const isRead = bookInfo[3] == 'true' ? true : false;

    const book = new Book(id, title, author, pages, isRead);
    library.push(book);

    displayBook(book);
}

function displayBook(book) {
    const container = document.createElement('div');
    container.classList += 'book-record';

    const idDiv = document.createElement('div');
    idDiv.textContent = book.id;

    const titleDiv = document.createElement('div');
    titleDiv.textContent = book.title;

    const authorDiv = document.createElement('div');
    authorDiv.textContent = book.author;

    const pagesDiv = document.createElement('div');
    pagesDiv.textContent = `${book.pages} pages`;

    const isReadDiv = document.createElement('div');
    isReadDiv.textContent = book.isRead;

    container.appendChild(idDiv);
    container.appendChild(titleDiv);
    container.appendChild(authorDiv);
    container.appendChild(pagesDiv);
    container.appendChild(isReadDiv);

    booksContainer.appendChild(container);
}

// console.log(Book.prototype);
console.table(library);