const myLibrary = {};
const stats = {
    numBooks: 0,
    numBooksRead: 0,
    numAuthors: 0
}

const bookNotReadIcon = "M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z";
const bookReadIcon = "M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z";

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

function createSVG(node, dVal, svgClasses=[], pathAttrs=[]) {
    const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const iconPath = document.createElementNS(
        "http://www.w3.org/2000/svg", 
        "path"
    );
    iconSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    iconSvg.setAttribute('fill', 'currentColor');
    iconSvg.setAttribute('viewBox', '0 0 16 16');
    iconSvg.classList.add('post-icon');
    for(let i = 0; i < svgClasses.length; i++) {
        iconSvg.classList.add(svgClasses[i]);
    }

    for(let i = 0; i < pathAttrs.length; i++) {
        iconPath.setAttribute(pathAttrs[i][0], pathAttrs[i][1]);
    }
    iconPath.setAttribute("d", dVal);
    

    iconSvg.appendChild(iconPath);

    return node.appendChild(iconSvg);
}

function displayBooksBy(author, startIndex) {
    for (let i = startIndex; i < myLibrary[author].length; i++) {
        // create card
        const thisBook = myLibrary[author][i];
        const bookCard = document.createElement("div");
        bookCard.classList.add("card");

        // create svg icons
        const bookIcon = document.createElement("div");
        bookIcon.classList.add("book-icon");
        createSVG(bookIcon, "M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z");
        // bookIcon.setAttribute("d", "M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z");
  
        // create content
        const bookTitle = document.createElement("p");
        bookTitle.classList.add("book-title");
        bookTitle.textContent = thisBook.title;

        const bookInfoDiv = document.createElement("div");
        bookInfoDiv.classList.add("book-info");

        const bookAuthorDiv = document.createElement("div")
        bookAuthorDiv.classList.add("book-author-container")
        const authorIcon = document.createElement("div");
        authorIcon.classList.add("author-icon");
        createSVG(authorIcon, "M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z");
        const bookAuthor = document.createElement("p");
        bookAuthor.classList.add("book-author");
        bookAuthor.textContent = thisBook.author;
        bookAuthorDiv.appendChild(authorIcon);
        bookAuthorDiv.appendChild(bookAuthor);
  
        const bookPagesDiv = document.createElement("div")
        bookPagesDiv.classList.add("book-pages-container")
        const pagesIcon = document.createElement("div");
        pagesIcon.classList.add("pages-icon");
        createSVG(pagesIcon, "M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z");
        const bookPages = document.createElement("p");
        bookPages.classList.add("book-num-pages");
        bookPages.textContent = thisBook.numPages;
        bookPagesDiv.appendChild(pagesIcon);
        bookPagesDiv.appendChild(bookPages);

        bookInfoDiv.appendChild(bookAuthorDiv);
        bookInfoDiv.appendChild(bookPagesDiv);
  
        const bookRead = document.createElement("p");
        bookRead.classList.add("book-read");
        
        thisBook.haveRead === false ? createSVG(bookRead, bookNotReadIcon)
                                    : createSVG(bookRead, bookReadIcon);
  
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
        bookCard.appendChild(bookIcon);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookInfoDiv);
        bookCard.appendChild(bookRead);
        bookCard.appendChild(toggleReadBtn);
        bookCard.appendChild(removeBtn);
        
  
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
addBookToLibrary("The Hobb", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Tdfdkfnlsjdansfkjnfsdjdfkldsklsfdsdfjlksdfljkfsdlkjsd", "J.R.R. Tolkien", 295, false);
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
        return book.title === bookTitle.innerText;
    });
    const bookReadSVG = bookRead.querySelector("svg");
    bookRead.removeChild(bookReadSVG);

    book.haveRead = book.haveRead ? false : true;
    book.haveRead ? createSVG(bookRead, bookReadIcon, ["bi", "bi-bookmark-check-fill"], [["fill-rule", "evenodd"]]) : createSVG(bookRead, bookNotReadIcon);
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
