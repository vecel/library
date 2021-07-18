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
const lettersFromGrave = new Book(1, 'Listy Zza Grobu', 'Remigiusz Mróz', 457, false);

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
    const item = document.createElement('div');
    item.classList += 'item';

    const itemContent = 
        `<div class="card-content title"><h2>${book.title}</h2></div>
        <div class="card-content">Author: ${book.author}</div>
        <div class="card-content">Pages: ${book.pages}</div>
        <div class="card-content is-read">Read: ${book.isRead ? 'YES' : 'NO'}</div>
        <div class="card-content rating">
        <span class="material-icons-outlined rating-star">grade</span>
        <span class="material-icons-outlined rating-star">grade</span>
        <span class="material-icons-outlined rating-star">grade</span>
        <span class="material-icons-outlined rating-star">grade</span>
        <span class="material-icons-outlined rating-star">grade</span>
        </div>`;

    item.innerHTML = itemContent;

    booksContainer.appendChild(item);

}

// console.log(Book.prototype);
console.table(library);