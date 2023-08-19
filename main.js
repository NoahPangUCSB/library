const myLibrary = {};

function Book(title, author, numPages, haveRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.haveRead = haveRead;
}

function addBookToLibrary(title, author, numPages, haveRead) {
  const newBook = new Book(title, author, numPages, haveRead);
  if (author in myLibrary) {
    const bookFound = myLibrary[author].find((book) => book.title === title);
    if(bookFound !== undefined) {
        return false;
    }
    myLibrary[author].push(newBook);
  } else {
    myLibrary[author] = [newBook];
  }
  return true;
}

const cardsContainer = document.querySelector(".cards");

function displayBooksBy(author, startIndex) {
    for (let i = startIndex; i < myLibrary[author].length; i++) {
        // create card
        const thisBook = myLibrary[author][i];
        const bookCard = document.createElement("div");
        bookCard.classList.add("card");
  
        // create text content
        const bookTitle = document.createElement("span");
        bookTitle.classList.add("book-title");
        bookTitle.textContent = thisBook.title;
        
  
        const bookAuthor = document.createElement("span");
        bookAuthor.classList.add("book-author");
        bookAuthor.textContent = thisBook.author;
  
        const bookPages = document.createElement("span");
        bookPages.classList.add("book-num-pages");
        bookPages.textContent = thisBook.numPages;
  
        const bookRead = document.createElement("span");
        bookRead.classList.add("book-read");
        bookRead.textContent = thisBook.haveRead;
  
        // create remove button
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-card");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", removeCard);

        // create toggle read button
        const toggleReadBtn = document.createElement("button");
        toggleReadBtn.classList.add("toggle-read");
        toggleReadBtn.textContent = "Read";
        toggleReadBtn.addEventListener("click", toggleRead);
  
        // add content to card
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookRead);
        bookCard.appendChild(removeBtn);
        bookCard.appendChild(toggleReadBtn);
  
        // add card to container
        cardsContainer.appendChild(bookCard);
      }
}

function displayBooks(authorList, startIndex) {
  for (let i = 0; i < authorList.length; i++) {
    displayBooksBy(authorList[i], startIndex);
  }
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("The Hobb", "J.R.R. Tolkien", 295, false);
// addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
// addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
// addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
displayBooks(Object.keys(myLibrary), 0);

// Card actions

function removeCard(e) {
  const card = this.parentElement;
  const bookAuthor = card.querySelector(".book-author");
  const bookTitle = card.querySelector(".book-title");
  myLibrary[bookAuthor.innerText] = myLibrary[bookAuthor.innerText].filter((book) => {
    return book.title !== bookTitle.innerText;
  });

  card.remove();
}

function toggleRead(e) {
    const card = this.parentElement;
    const bookAuthor = card.querySelector(".book-author");
    const bookTitle = card.querySelector(".book-title");
    const bookRead = card.querySelector(".book-read");
    const book = myLibrary[bookAuthor.innerText].find((book) => {
        return book.title !== bookTitle.innerText;
    });
    book.read = book.read ? false : true;
    bookRead.innerText = book.read;
}



// Add book dialog

const showDialogButton = document.getElementById("show-dialog");
const addBookDialog = document.getElementById("add-book-dialog");
const confirmBtn = document.getElementById("confirm-btn");
const addBookForm = document.getElementById("add-book-form");
const cancelBtn = document.getElementById("cancel");
const modal = document.querySelector(".modal");

const dialogTitle = document.getElementById("title");
const dialogAuthor = document.getElementById("author");
const dialogNumPages = document.getElementById("num-pages");
const dialogRead = document.getElementById("read");

const dialogAddBookError = document.querySelector(".book-add-error");
const dialogAddBookErrorMessage = document.createTextNode(`Book already in library!`);
const dialogTitleError = document.querySelector(".title-error");
const dialogTitleErrorMessage = document.createTextNode(`Must have a title!`);
const dialogAuthorError = document.querySelector(".author-error");
const dialogAuthorErrorMessage =
  document.createTextNode(`Must have an author!`);
const dialogNumPagesError = document.querySelector(".num-pages-error");
const dialogNumPagesErrorNoInput = document.createTextNode(
  `Must have number of pages!`
);
const dialogNumPagesErrorNotInt = document.createTextNode(
  `Number of pages must be an integer!`
);

showDialogButton.addEventListener("click", () => {
  addBookDialog.showModal();
});

addBookDialog.addEventListener("close", (e) => {
  addBookForm.reset();

  dialogTitleError.textContent = "";
  dialogAuthorError.textContent = "";
  dialogNumPagesError.textContent = "";
  dialogAddBookError.textContent = "";
});

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookDialog.close();
});

function updateErrorMessagesHide() {
  if (dialogTitle.value !== "") {
    dialogTitleError.textContent = "";
  }
  if (dialogAuthor.value !== "") {
    dialogAuthorError.textContent = "";
  }
  if (
    dialogNumPages.value !== "" &&
    Number.isInteger(Number(dialogNumPages.value))
  ) {
    dialogNumPagesError.textContent = "";
  }
}

function updateErrorMessagesShow(bookInLibrary) {
    if(bookInLibrary) {
        dialogAddBookError.appendChild(dialogAddBookErrorMessage);
    }
  if (dialogTitle.value === "") {
    dialogTitleError.appendChild(dialogTitleErrorMessage);
  }
  if (dialogAuthor.value === "") {
    dialogAuthorError.appendChild(dialogAuthorErrorMessage);
  }
  if (dialogNumPages.value === "") {
    dialogNumPagesError.appendChild(dialogNumPagesErrorNoInput);
  } else if (!Number.isInteger(Number(dialogNumPages.value))) {
    dialogNumPagesError.appendChild(dialogNumPagesErrorNotInt);
  }
}

dialogTitle.addEventListener("change", updateErrorMessagesHide);
dialogAuthor.addEventListener("change", updateErrorMessagesHide);
dialogNumPages.addEventListener("change", updateErrorMessagesHide);

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  if (
    dialogTitle.value !== "" &&
    dialogAuthor.value !== "" &&
    dialogNumPages.value !== "" &&
    Number.isInteger(Number(dialogNumPages.value))
  ) {
    const addBookSuccess = addBookToLibrary(
      dialogTitle.value,
      dialogAuthor.value,
      Number(dialogNumPages.value),
      dialogRead.checked
    );
    if(addBookSuccess) {
        displayBooks([dialogAuthor.value], myLibrary[dialogAuthor.value].length - 1);
        addBookDialog.close();
    } else {
        updateErrorMessagesShow(true);
    }
  } else {
    updateErrorMessagesShow(false);
  }
});
