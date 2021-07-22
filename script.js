const booksContainer = document.querySelector('.books-container');
const addBookButton = document.querySelector('.new-book');
const bookDetailsDialog = document.querySelector('#book-information');
const bookDetails = {
    title: bookDetailsDialog.querySelector('#title-input'),
    author: bookDetailsDialog.querySelector('#author-input'),
    pages: bookDetailsDialog.querySelector('#pages-input'),
    status: bookDetailsDialog.querySelector('#status-input'),
    rating: bookDetailsDialog.querySelector('#rating-input')
}
const ratingStars = bookDetails.rating.children;
const bookDetailsDeleteButton = document.querySelector('.delete-button');
const bookDetailsSaveButton = document.querySelector('.save-button');

function Book (id, title, author, pages, isRead, rating, insertionDate, readDate) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.rating = rating;
    this.insertionDate = insertionDate;
}

Book.prototype.info = function() {
    return `${this.id}, ${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? 'already read' : 'not read yet'}`;
}

const NUMBER_OF_STARS = 5;

const theHobbit = new Book(0, 'The Hobbit', 'J.R.R. Tolkien', 295, true, 3);
const lettersFromGrave = new Book(1, 'Listy Zza Grobu', 'Remigiusz Mróz', 457, false, 5);

let editBook = false;
let currentBookIndex = -1;
let temporaryRating = -1;
let library = [theHobbit, lettersFromGrave];

addBookButton.addEventListener('click', addBook);

for (let i = 0; i < ratingStars.length; ++i) {
    ratingStars[i].addEventListener('mouseover', () => {
        for (let k = 0; k <= i; ++k) ratingStars[k].classList.add('material-icons');
        for (let k = i + 1; k < NUMBER_OF_STARS; ++k) ratingStars[k].classList.remove('material-icons');
    })

    ratingStars[i].addEventListener('mouseout', () => {
        for (let k = 0; k <= i; ++k) ratingStars[k].classList.remove('material-icons');
        updateRating();
    })

    ratingStars[i].addEventListener('click', () => {
        temporaryRating = i + 1;
        updateRating();
    })
}

bookDetailsDeleteButton.addEventListener('click', () => {
    if (editBook) {
        deleteCard(currentBookIndex);        
    }
    bookDetailsDialog.style.display = 'none';
})

bookDetailsSaveButton.addEventListener('click', () => {
    if (editBook) {
        library[currentBookIndex].title =  bookDetails.title.value;
        library[currentBookIndex].author = bookDetails.author.value;
        library[currentBookIndex].pages = bookDetails.pages.value;
        library[currentBookIndex].isRead = bookDetails.status.checked;
        library[currentBookIndex].rating = temporaryRating;
        setCardItemContent(library[currentBookIndex]);
    }
    if (!editBook) {
        const newBook = new Book(library.length, bookDetails.title.value, bookDetails.author.value, bookDetails.pages.value, bookDetails.status.checked, temporaryRating);
        library.push(newBook);
        displayBook(newBook);
    }    
    bookDetailsDialog.style.display = 'none';
})

for (let book of library) displayBook(book);





function addBook() {
    editBook = false;
    showBookDetailsDialog();
    setBookDetailsContent();
}

function displayBook(book) {
    const item = document.createElement('div');
    item.classList += 'item';

    const itemContent = cardContent(book); 

    item.innerHTML = itemContent;
    
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        const itemId = Array.from(parent.childNodes).indexOf(item);
        const book = library[itemId - 1];

        currentBookIndex = itemId - 1;
        editBook = true;

        showBookDetailsDialog();
        setBookDetailsContent(book);

        console.log(itemId);
        console.log(book);
        
    })

    booksContainer.appendChild(item);
}

function showBookDetailsDialog() {
    bookDetailsDialog.style.display = 'flex';
}

function setCardItemContent(book) {
    const bookDiv = booksContainer.children[book.id];
    bookDiv.innerHTML = cardContent(book);
}

function deleteCard(cardIndex) {
    booksContainer.children[cardIndex].remove();
    for (let i = cardIndex + 1; i < library.length; ++i) {
        library[i].id--;
    }
    library.splice(cardIndex, 1);
}

function setBookDetailsContent(book) {
    bookDetails.title.value = book === undefined ? '' : book.title;
    bookDetails.author.value = book === undefined ? '' : book.author;
    bookDetails.pages.value = book === undefined ? '' : book.pages;
    bookDetails.status.checked = book === undefined ? false : book.isRead;

    temporaryRating = book === undefined ? 0 : book.rating;
    updateRating();
}

function updateRating() {
    for (let i = 0; i < temporaryRating; ++i) ratingStars[i].classList.add('material-icons');
    for (let i = temporaryRating; i < NUMBER_OF_STARS; ++i) ratingStars[i].classList.remove('material-icons');
}

function cardContent(book) {
    return `<div class="card-content title"><h2>${book.title}</h2></div>
    <div class="card-content">Author: ${book.author}</div>
    <div class="card-content">Pages: ${book.pages}</div>
    <div class="card-content is-read">Read: ${book.isRead ? 'YES' : 'NO'}</div>
    <div class="card-content rating flex-end">
    <span class="material-icons rating-star">grade</span>
    <span class="${book.rating > 1 ? 'material-icons' : 'material-icons-outlined'} rating-star">grade</span>
    <span class="${book.rating > 2 ? 'material-icons' : 'material-icons-outlined'} rating-star">grade</span>
    <span class="${book.rating > 3 ? 'material-icons' : 'material-icons-outlined'} rating-star">grade</span>
    <span class="${book.rating > 4 ? 'material-icons' : 'material-icons-outlined'} rating-star">grade</span>
    </div>`
}