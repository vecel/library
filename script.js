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
    const container = document.createElement('div');
    container.classList += 'book-record';

    const recordContent = 
        `<div class="card-content">${book.title}</div>
        <div class="card-content">${book.author}</div>
        <div class="card-content">${book.pages}</div>
        <div class="is-read">is read?
        <span class="material-icons-outlined book-status ${book.isRead ? 'read' : 'not-read'}">book</span>
        </div>
        <button class="card-content delete-record">
        <span class="material-icons-outlined">close</span>
        Usuń
        </button>`;

    container.innerHTML = recordContent;

    booksContainer.appendChild(container);

    const isReadButton = container.querySelector('.book-status');
    isReadButton.addEventListener('click', () => {
        // get book by id
    });
}

// console.log(Book.prototype);
console.table(library);