const myLibrary = [];

function Book(title, author, numPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
}

function addBookToLibrary(title, author, numPages, haveRead) {
    const newBook = new Book(title, author, numPages, haveRead);
    myLibrary.push(newBook);
}

const cardsContainer = document.querySelector(".cards");

function displayBooks(startIndex) {
    for(let i = startIndex; i < myLibrary.length; i++) {
        const thisBook = myLibrary[i];
        const bookCard = document.createElement("div");
        bookCard.classList.add("card");
        const bookCardContent = document.createTextNode(`${thisBook.title} by ${thisBook.author}\n${thisBook.numPages} pages\n${thisBook.haveRead ? "read" : "not yet read"}`);
        bookCard.appendChild(bookCardContent);
        cardsContainer.appendChild(bookCard);
    }
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
displayBooks(0);

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

const dialogTitleError = document.querySelector(".title-error");
const dialogTitleErrorMessage = document.createTextNode(`Must have a title!`);
const dialogAuthorError = document.querySelector(".author-error");
const dialogAuthorErrorMessage = document.createTextNode(`Must have an author!`);
const dialogNumPagesError = document.querySelector(".num-pages-error");
const dialogNumPagesErrorNoInput = document.createTextNode(`Must have number of pages!`);
const dialogNumPagesErrorNotInt = document.createTextNode(`Number of pages must be an integer!`);

showDialogButton.addEventListener("click", () => {
    addBookDialog.showModal();
})

addBookDialog.addEventListener("close", (e) => {
    addBookForm.reset();
    
    dialogTitleError.textContent = "";
    dialogAuthorError.textContent = "";
    dialogNumPagesError.textContent = "";
  });

cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addBookDialog.close();
});

function updateErrorMessagesHide() {
    if(dialogTitle.value !== "") {
        dialogTitleError.textContent = "";
    }
    if(dialogAuthor.value !== "") {
        dialogAuthorError.textContent = "";
    }
   if(dialogNumPages.value !== "" && Number.isInteger(Number(dialogNumPages.value))) {
        dialogNumPagesError.textContent = "";
    }
}

function updateErrorMessagesShow() {
    if(dialogTitle.value === "") {
        dialogTitleError.appendChild(dialogTitleErrorMessage);
    }
    if(dialogAuthor.value === "") {
        dialogAuthorError.appendChild(dialogAuthorErrorMessage);
    } 
    if(dialogNumPages.value === "") {
        dialogNumPagesError.appendChild(dialogNumPagesErrorNoInput);
    } else if(!Number.isInteger(Number(dialogNumPages.value))) {
        dialogNumPagesError.appendChild(dialogNumPagesErrorNotInt);
    }
}

// document.addEventListener("click", (e) => {
    
//     let clickInside = modal.contains(e.target);
//     if(!clickInside) {
//         // addBookDialog.close();
//     }
// });

dialogTitle.addEventListener("change", updateErrorMessagesHide);
dialogAuthor.addEventListener("change", updateErrorMessagesHide);
dialogNumPages.addEventListener("change", updateErrorMessagesHide);

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault(); // We don't want to submit this fake form
    if(dialogTitle.value !== "" && dialogAuthor.value !== "" && dialogNumPages.value !== "" 
        && Number.isInteger(Number(dialogNumPages.value))) {
        addBookToLibrary(dialogTitle.value, dialogAuthor.value, Number(dialogNumPages.value), dialogRead.checked);
        displayBooks(myLibrary.length-1);
        addBookDialog.close();
    } else {
        updateErrorMessagesShow();
    }
    
  });