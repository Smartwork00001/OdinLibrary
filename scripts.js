const myLibrary = [];
const bookDisplay = document.querySelector(".book-display");
const addBook = document.querySelector("#add-book");
const form = document.querySelector("#form");
const okButtonText = document.querySelector("#okButtonText");
const okButtonDiv = document.querySelector(".okButtonDiv");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const noPagesInput = document.querySelector("#noPages");
const titleValidationMessage = document.querySelector(".title-validation-message");
const authorValidationMessage = document.querySelector(".author-validation-message");
const noPagesValidationMessage = document.querySelector(".noPages-validation-message");

function Book(title, author, noPages, read) {
  this.title = title;
  this.author = author;
  this.noPages = noPages;
  this.read = read;
}

Book.prototype.changeRead = function () {
  if (this.read === "Has been read") {
    this.read = "Not read yet";
  } else {
    this.read = "Has been read";
  }
};

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.noPages} pages, ${this.read}`;
};

function convertTitleCase(text) {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.substring(1, word.length))
    .join(" ");
}

function displayBooks() {
  bookDisplay.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i += 1) {
    const book = document.createElement("div");
    book.classList.add("book");
    book.setAttribute("id", `${i}`);
    const title = document.createElement("div");
    const author = document.createElement("div");
    const noPages = document.createElement("div");
    const read = document.createElement("div");
    const removeBookBtn = document.createElement("button");
    const changeReadStatus = document.createElement("button");
    title.classList.add("title");
    title.textContent = myLibrary[i].title.toUpperCase();
    author.textContent = `by ${convertTitleCase(myLibrary[i].author)}`;
    noPages.textContent = `${myLibrary[i].noPages} pages`;
    read.textContent = myLibrary[i].read;
    removeBookBtn.setAttribute("id", "removeBook");
    removeBookBtn.textContent = "Remove";
    changeReadStatus.setAttribute("id", "changeReadStatus");
    changeReadStatus.textContent = "Change read status";
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(noPages);
    book.appendChild(read);
    book.appendChild(removeBookBtn);
    book.appendChild(changeReadStatus);
    bookDisplay.appendChild(book);
  }
}

function removeMessage() {
  okButtonDiv.style.display = "none";
}

function displayMessage(message) {
  okButtonText.textContent = message;
  okButtonDiv.style.display = "flex";
}

function addBooksToLibrary(title, author, noPages, read) {
  myLibrary.push(new Book(title, author, noPages, read));
}

function addBookToLibrary(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const title = formData.get("title");
  const author = formData.get("author");
  const noPages = formData.get("noPages");
  const read = formData.get("read");
  const validateBoolean = author.match(/^[A-Za-z]+$/);
  if (!!validateBoolean === true) {
    myLibrary.push(new Book(title, author, noPages, read));
    displayMessage(`Book ${title} created!`);
    displayBooks();
  } else {
    displayMessage("Author name can only consist of alphabets!");
  }
  form.reset();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function bookDisplayEvent(event) {
  const child = event.target.closest(".book");
  if (child) {
    const id = event.target.getAttribute("id");
    const index = child.getAttribute("id") * 1;
    if (id === "changeReadStatus") {
      myLibrary[index].changeRead();
      displayBooks();
    } else if (id === "removeBook") {
      displayMessage(`Book ${myLibrary[index].title} has been deleted`);
      removeBook(index);
    }
  }
}

const validateTitle = function(){
  if(titleInput.checkValidity()){
    titleValidationMessage.textContent = '';
  }else{
    titleValidationMessage.textContent = titleInput.validationMessage;
  }
}

const validateAuthor = function(){
  if(authorInput.checkValidity()){
    authorValidationMessage.textContent = '';
  }else{
    authorValidationMessage.textContent = authorInput.validationMessage;
  }
}

const validateNoPages = function(){
  if(noPagesInput.checkValidity()){
    noPagesValidationMessage.textContent = '';
  }else{
    noPagesValidationMessage.textContent = noPagesInput.validationMessage;
  }
}

addBooksToLibrary("teibok", "teibok", 234, "Has been read");
addBooksToLibrary("teibok1", "teibok", 234, "Has been read");
addBooksToLibrary("teibok2", "teibok", 234, "Has been read");
addBooksToLibrary("teibok3", "teibok", 234, "Has been read");
displayBooks();

addBook.addEventListener("click", addBookToLibrary);
okButtonDiv.addEventListener("click", removeMessage);
bookDisplay.addEventListener("click", bookDisplayEvent);
titleInput.addEventListener("input",validateTitle);
authorInput.addEventListener("input",validateAuthor);
noPagesInput.addEventListener("input",validateNoPages);