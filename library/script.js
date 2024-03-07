// Array for stored books
const myLibrary = [];

// Select the add button
let addBook = document.querySelector("#add");

// Showing the dialog box on button click
addBook.addEventListener("click", function() {
    dialog.showModal();
});

// Selecting the dialog box that appears on clicking the button to add books
const dialog = document.querySelector("dialog");

// Selecting the form inside the dialog box
const form = document.getElementById("book-form");
// Function for when the form is submitted to add a book
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Storing the values entered in the fields in variables
  const bookTitle = document.getElementById("book-title").value;
  const authorName = document.getElementById("author-name").value;
  const pageNumber = document.getElementById("page-number").value;
  const readStatus = document.querySelector(
    'input[name = "read-status"]:checked'
  ).value;

  //Resetting the form and closing the dialog box when the form is submitted
  form.reset();
  dialog.close();

  // Making a book card by calling the constructor function
  const bookName = new Book(bookTitle, authorName, pageNumber, readStatus);

  //Storing the created book card into the array
  myLibrary.push(bookName);

  //When the form is submitted, the displayBook function is called to display the book card.
  displayBook(bookName);
});

//Selecting the close button 'X' on the dialog box
const closeButton = document.getElementById("close");
//Function to close the dialog box using the close 'X' button
closeButton.addEventListener("click", function (event) {
  event.preventDefault();
  dialog.close();
  form.reset();
});

//Constructor function to create the "Book" objects
function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.info = function () {
    return (
      this.title +
      " by " +
      this.author +
      ", " +
      this.pages +
      ", " +
      this.readStatus
    );
  };
}

//Function to display books
function displayBook(bookName) {
  // Selecting the body area to place book cards
  const body = document.body;
  const libraryBody = document.getElementById("library-body");

  // Making a book card to store details of one book
  const bookContainer = document.createElement("div");

  // Book title
  const title = document.createElement("h3");
  title.innerHTML = bookName.title;
  bookContainer.append(title);

  // Book author
  const author = document.createElement("p");
  author.textContent = "Author: ";
  author.append(bookName.author);
  bookContainer.append(author);

  // Book pages
  const pages = document.createElement("p");
  pages.textContent = "Pages: ";
  pages.append(bookName.pages);
  bookContainer.append(pages);

  // Selecting the button to change the Read or Not read status
  const changeStatus = document.createElement("button");
  bookContainer.append(changeStatus);

  // Adding "Read" or "Not read" styling class to button depending on the option selected in the dialog form
  if (bookName.readStatus === "Read") {
    changeStatus.classList.add("read-book");
  } else if (bookName.readStatus === "Not read") {
    changeStatus.classList.add("notread-book");
  }
  changeStatus.innerHTML = bookName.readStatus;

  // Calling the toggleStatus() function from the Book prototype to change the readStatus property on individual Book objects
  changeStatus.addEventListener("click", function () {
    bookName.toggleStatus(changeStatus);
  });

  // Making the remove button to remove books from the library
  const removeButton = document.createElement("button");
  removeButton.innerHTML = "Remove book";
  removeButton.classList.add("remove-book");
  bookContainer.append(removeButton);
  // Function for the remove button to remove books from the array
  removeButton.addEventListener("click", function () {
    myLibrary.splice(myLibrary.indexOf(bookName), 1);
    libraryBody.removeChild(bookContainer);
  });

  // Adding class for styling of each book card
  bookContainer.classList.add("book-container");

  // Appending dynamically created book cards and library body to the main body
  libraryBody.append(bookContainer);
  body.append(libraryBody);
}

// toggleStatus() function on the Book prototype that changes the read status of individual books
Book.prototype.toggleStatus = function (buttonValue) {
  if (buttonValue.innerHTML === "Read") {
    buttonValue.innerHTML = "Not read";
    buttonValue.classList.toggle("notread-book", true); // Add class
    buttonValue.classList.toggle("read-book", false); // Remove class
    this.readStatus = "Not read";
  } else if (buttonValue.innerHTML === "Not read") {
    buttonValue.innerHTML = "Read";
    buttonValue.classList.toggle("notread-book", false); // Remove class
    buttonValue.classList.toggle("read-book", true); // Add class
    this.readStatus = "Read";
  }
};

