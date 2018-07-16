// Bonus this app now has local storage functionality 

// load local storage on page load
window.addEventListener('DOMContentLoaded', loadLocalStorage);

// book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// ui constructor
function UI() {};

// add to book list
UI.prototype.addToBookList = function(book) {
  
  // get book list
  const bookList = document.getElementById('book-list');
  // create table row
  const row = document.createElement('tr');
  // add content to table row
  row.innerHTML = `<td>${book.title}</td>
                   <td>${book.author}</td>
                   <td>${book.isbn}</td>
                   <td><a href="#" class="delete">X</a></td>
                  `;
  // append book to book list
  bookList.appendChild(row);
  
}

// show alert
UI.prototype.showAlert = function(msg, className) {
  
  // create alert div
  const div = document.createElement('div');
  // assign class to div
  div.className = `alert ${className}`;
  // create div text node
  div.appendChild(document.createTextNode(msg));
  // get alert parent element
  const container = document.querySelector('.container');
  // get form element
  const form = document.querySelector('#book-form');
  // insert alert before book form
  container.insertBefore(div, form);
  // timeout after three seconds
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
  
}

// clear fields 
UI.prototype.clearFields = function() {
  
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
  
}

// delete book
UI.prototype.deleteBook = function(target) {
  
  // delete IF x is clicked
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
  
}

// event listener to add book
document.getElementById('book-form').addEventListener('submit', function(e) {
  
  // get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  
  // intantiate book
  const book = new Book(title, author, isbn);
  // instantiate ui
  const ui = new UI();
  // validate form
  if(title === '' || author === '' || isbn === '') {
    // show alert
    ui.showAlert('Please fill out the form.', 'error');
  } else {
    // add book
    ui.addToBookList(book);
    // add to local storage
    addToStorage(book);
    // show success
    ui.showAlert('Book has been added to list.', 'success');
    // clear fields 
    ui.clearFields();
  }
  
  e.preventDefault();
  
});

// event to delete books
document.getElementById('book-list').addEventListener('click', function(e) {
  
  
  // instantiate ui
  let ui = new UI();
  // delete book
  ui.deleteBook(e.target);
  // delete from local storage
  removeFromStorage(e.target.parentElement.previousElementSibling);
  
});

// add to local storage
function addToStorage(el) {
  
  let list; // initiate list
  if(localStorage.getItem('list') === null) {
    list = [];
  } else {
    list = JSON.parse(localStorage.getItem('list'));
  }
  
  list.push(el);
  localStorage.setItem('list', JSON.stringify(list));
  
}

// remove from local storage
function removeFromStorage(el) {
  
  let list; // initiate list
  if(localStorage.getItem('list') === null) {
    list = [];
  } else {
    list = JSON.parse(localStorage.getItem('list'));
  }
  
  list.forEach(function(book, index){
    if(el.textContent === book.isbn) {
      list.splice(index, 1);
    }
  });
  
  // reset to local storage
  localStorage.setItem('list', JSON.stringify(list));
  
}

// load local storage
function loadLocalStorage() {
  
  // instantiate UI
  let ui = new UI();
  
  let list; // initiate list
  if(localStorage.getItem('list') === null) {
    list = [];
  } else {
    list = JSON.parse(localStorage.getItem('list'));
  }

  list.forEach(function(el) {
    
    ui.addToBookList(el);
    
  });
  
}
