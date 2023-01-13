const Store = {
  getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  },

  addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  },

  removeBook(author) {
    const books = Store.getBooks();
    let index = 0;
    books.filter((book) => {
      if (book.author !== author) { index = +1; }
      return books;
    });
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
  },
};
const UI = {
  displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  },

  addBookToList(book) {
    const list = document.querySelector('#bookli');

    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td><a href="#" class="btn btn-sm btn-danger delete">Remove</a></td>
    `;
    list.appendChild(row);
  },

  deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  },

  clearField() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  },
};

document.addEventListener('DOMContentLoaded', UI.displayBooks);
const Form = document.querySelector('#bookform');
Form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  const book = {
    author,
    title,
  };

  UI.addBookToList(book);

  Store.add(book);

  UI.clearField();
});

document.querySelector('#bookli').addEventListener('click', (e) => {
  Store.removeBook(e.target.parentElement.previousElementSibling.innerHTML);
  UI.deleteBook(e.target);
});