const list = document.querySelector('#list');
const addnew = document.querySelector('#addnew');
const contact = document.querySelector('#contact');
const li = document.querySelector('#top');
const add = document.querySelector('#bookform');
const contac = document.querySelector('#contac');
const time = document.querySelector('#time');

class Book {
  constructor(title, author, id = Math.floor(Math.random() * 1000)) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  static displayBooks() {
    const books = Book.getBooks();
    books.forEach((book) => Book.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#bookli');

    const row = document.createElement('tr');

    row.innerHTML = `
    <td>"${book.title}"  by  ${book.author}</td>
    <td class="d-none">${book.author}</td>
    <td><a href="#" class="btn btn-sm btn-danger delete float-end">Remove</a></td>
    `;
    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearField() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }

  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Book.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(author) {
    const books = Book.getBooks();
    let index = 0;
    books.filter((book) => {
      if (book.author !== author) { index = +1; }
      return books;
    });
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
  }
}
function nav(first, second, third) {
  first.style.display = 'block';
  second.style.display = 'none';
  third.style.display = 'none';
}
document.addEventListener('DOMContentLoaded', Book.displayBooks);
const Form = document.querySelector('#bookform');
Form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  const book = new Book(title, author);
  Book.addBookToList(book);
  Book.addBook(book);
  Book.clearField();
});
list.addEventListener('click', () => {
  nav(li, add, contact);
});

addnew.addEventListener('click', () => {
  nav(add, li, contact);
});

contac.addEventListener('click', () => {
  nav(contact, add, li);
});
function date(timing) {
  const dee = new Date();
  let hours = dee.getHours();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  const mont = [
    'january', 'feburary', 'march',
    'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  const display = `${mont[dee.getMonth()]}
  ${dee.getDate()}th ${dee.getFullYear()}, ${hours}:${dee.getMinutes()}${ampm}`;
  timing.innerText = display;
}
document.querySelector('#bookli').addEventListener('click', (e) => {
  Book.removeBook(e.target.parentElement.previousElementSibling.innerHTML);
  Book.deleteBook(e.target);
});
date(time);
